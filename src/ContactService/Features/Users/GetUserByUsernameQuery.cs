using ContactService.Data;
using ContactService.Features.Core;
using MediatR;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ContactService.Features.Users
{
    public class GetUserByUsernameQuery
    {
        public class Request : IRequest<Response>
        {
            public string Username { get; set; }
            public int? TenantId { get; set; }
        }

        public class Response
        {
            public UserApiModel User { get; set; }
        }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(IContactServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<Response> Handle(Request request)
            {
                return new Response()
                {
                    User = UserApiModel.FromUser(await _context.Users.SingleAsync(x=>x.Username == request.Username && x.TenantId == request.TenantId))
                };
            }

            private readonly IContactServiceContext _context;
            private readonly ICache _cache;
        }
    }
}