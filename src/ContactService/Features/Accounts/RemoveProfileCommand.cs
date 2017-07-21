using MediatR;
using ContactService.Data;
using ContactService.Features.Core;
using System;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ContactService.Features.Accounts
{
    public class RemoveProfileCommand
    {
        public class Request : IRequest<Response>
        {
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; } 
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
                var profile = await _context.Profiles.SingleAsync(x=>x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                profile.IsDeleted = true;
                await _context.SaveChangesAsync();
                return new Response();
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
