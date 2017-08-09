using System;
using System.Data.Entity;
using ContactService.Data.Model;
using MediatR;
using ContactService.Data;
using System.Threading.Tasks;

namespace ContactService.Security
{
    public class AuthenticateCommand
    {
        public class Request : IRequest<Response>
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public Guid TenantUniqueId { get; set; }
        }

        public class Response
        {
            public bool IsAuthenticated { get; set; }
        }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(IContactServiceContext context, IEncryptionService encryptionService)
            {
                _encryptionService = encryptionService;
                _context = context;
            }

            public bool ValidateUser(User user, string transformedPassword)
            {
                if (user == null || transformedPassword == null)
                    return false;

                return user.Password == transformedPassword;
            }

            public async Task<Response> Handle(Request message)
            {
                var user = await _context.Users
                    .Include(x=>x.Tenant)
                    .SingleOrDefaultAsync(x => x.Username.ToLower() == message.Username.ToLower()
                && x.Tenant.UniqueId == message.TenantUniqueId);

                return new Response()
                {
                    IsAuthenticated = ValidateUser(user, _encryptionService.TransformPassword(message.Password))
                };
            }


            protected readonly IContactServiceContext _context;
            private IEncryptionService _encryptionService { get; set; }
        }

    }

}
