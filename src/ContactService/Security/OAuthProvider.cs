using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using MediatR;

namespace ContactService.Security
{
    public class OAuthProvider : OAuthAuthorizationServerProvider
    {
        public OAuthProvider(Lazy<IAuthConfiguration> lazyAuthConfiguration, IMediator mediator)
        {
            _lazyAuthConfiguration = lazyAuthConfiguration;
            _mediator = mediator;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity(_authConfiguration.AuthType);
            var username = context.OwinContext.Get<string>($"{_authConfiguration.AuthType}:username");
            var tenantUniqueId = new Guid(context.Request.Headers.Get("Tenant"));

            var response = await _mediator.Send(new GetClaimsForUserQuery.Request() { Username = username, TenantUniqueId = tenantUniqueId });

            foreach (var claim in response.Claims)
            {
                identity.AddClaim(claim);
            }
            context.Validated(identity);
        }

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            try
            {
                var username = context.Parameters["username"];
                var password = context.Parameters["password"];
                var tenantUniqueId = new Guid(context.Request.Headers.Get("Tenant"));

                var response = await _mediator.Send(new AuthenticateCommand.Request() { Username = username, Password = password, TenantUniqueId = tenantUniqueId });

                if (response.IsAuthenticated)
                {
                    context.OwinContext.Set($"{_authConfiguration.AuthType}:username", username);
                    context.Validated();
                }
                else
                {
                    context.SetError("Invalid credentials");
                    context.Rejected();
                }
            }
            catch (Exception exception)
            {
                context.SetError(exception.Message);
                context.Rejected();
            }            
        }

        public override async Task TokenEndpointResponse(OAuthTokenEndpointResponseContext context)
        {            
            await _mediator.Send(new AddSessionCommand.Request() {
                TenantUniqueId = new Guid(context.Request.Headers.Get("Tenant")),
                StartedOn = context.Properties.IssuedUtc,
                ExpiresOn = context.Properties.ExpiresUtc
            });

            await base.TokenEndpointResponse(context);
        }

        protected IMediator _mediator { get; set; }
        protected IAuthConfiguration _authConfiguration { get { return _lazyAuthConfiguration.Value; } }
        protected Lazy<IAuthConfiguration> _lazyAuthConfiguration;
    }
}
