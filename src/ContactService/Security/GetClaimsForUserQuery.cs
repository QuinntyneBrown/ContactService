using MediatR;
using ContactService.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;
using System.Security.Claims;
using System;

namespace ContactService.Security
{
    public class GetClaimsForUserQuery
    {
        public class Request : IRequest<Response>
        {
            public string Username { get; set; }
            public Guid TenantUniqueId { get; set; }
        }

        public class Response
        {
            public ICollection<Claim> Claims { get; set; }
        }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(IContactServiceContext context)
            {
                _context = context;
            }

            public async Task<Response> Handle(Request message)
            {

                var claims = new List<System.Security.Claims.Claim>();

                var user = await _context.Users
                    .Include(x => x.Roles)
                    .Include(x=>x.Tenant)
                    .SingleAsync(x => x.Username == message.Username && x.Tenant.UniqueId == message.TenantUniqueId);

                claims.Add(new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name", message.Username));

                foreach (var role in user.Roles.Select(x => x.Name))
                {
                    claims.Add(new Claim("http://schemas.microsoft.com/ws/2008/06/identity/claims/role", role));
                }

                return new Response()
                {
                    Claims = claims
                };
            }

            private readonly IContactServiceContext _context;            
        }
    }
}
