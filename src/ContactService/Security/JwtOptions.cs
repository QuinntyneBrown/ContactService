using Microsoft.Owin.Security.Jwt;

namespace ContactService.Security
{
    public class JwtOptions : JwtBearerAuthenticationOptions
    {
        public JwtOptions(string audience, string issuer, string symetricKey)
        {
            AllowedAudiences = new[] { audience };
            IssuerSecurityTokenProviders = new[] 
            {
                new SymmetricKeyIssuerSecurityTokenProvider(issuer,symetricKey)
            };
        }
        
    }
}
