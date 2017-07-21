using ContactService.Data;
using ContactService.Features.Core;
using MediatR;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ContactService.Features.Users
{
    public class RemoveUserCommand
    {
        public class Request : IRequest<Response>
        {
            public int Id { get; set; }
            public int? TenantId { get; set; }
        }

        public class Response { }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(ContactServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<Response> Handle(Request request)
            {
                var user = await _context.Users.SingleAsync(x=>x.Id == request.Id && x.TenantId == request.TenantId);
                user.IsDeleted = true;
                await _context.SaveChangesAsync();
                return new Response();
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
