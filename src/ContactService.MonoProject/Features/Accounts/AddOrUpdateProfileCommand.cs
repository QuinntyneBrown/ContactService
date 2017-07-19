using MediatR;
using ContactService.Data;
using ContactService.Data.Model;
using ContactService.Features.Core;
using System;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ContactService.Features.Accounts
{
    public class AddOrUpdateProfileCommand
    {
        public class Request : IRequest<Response>
        {
            public ProfileApiModel Profile { get; set; }
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
                var entity = await _context.Profiles
                    .Include(x => x.Tenant)
                    .SingleOrDefaultAsync(x => x.Id == request.Profile.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                
                if (entity == null) {
                    var tenant = await _context.Tenants.SingleAsync(x => x.UniqueId == request.TenantUniqueId);
                    _context.Profiles.Add(entity = new Profile() { TenantId = tenant.Id });
                }

                entity.Name = request.Profile.Name;
                
                await _context.SaveChangesAsync();

                return new Response();
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
