using ContactService.Data;
using ContactService.Features.Core;
using MediatR;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ContactService.Features.Users
{
    public class GetUserByIdQuery
    {
        public class Request : IRequest<Response> { 
            public int Id { get; set; }
			public int? TenantId { get; set; }
        }

        public class Response
        {
            public UserApiModel User { get; set; } 
        }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(ContactServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<Response> Handle(Request request)
            {                
                return new Response()
                {
                    User = UserApiModel.FromUser(await _context.Users.SingleAsync(x=>x.Id == request.Id && x.TenantId == request.TenantId))
                };
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
        }
    }
}