using MediatR;
using ContactService.Data;
using ContactService.Data.Model;
using ContactService.Features.Core;
using System;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ContactService.Features.Accounts
{
    public class AddOrUpdateAccountCommand
    {
        public class Request : IRequest<Response>
        {
            public AccountApiModel Account { get; set; }
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
                var entity = await _context.Accounts
                    .Include(x => x.Tenant)
                    .SingleOrDefaultAsync(x => x.Id == request.Account.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                
                if (entity == null) {
                    var tenant = await _context.Tenants.SingleAsync(x => x.UniqueId == request.TenantUniqueId);
                    _context.Accounts.Add(entity = new Account() { TenantId = tenant.Id });
                }

                entity.Firstname = request.Account.Firstname;

                entity.Lastname = request.Account.Lastname;

                entity.Email = request.Account.Email;

                await _context.SaveChangesAsync();

                return new Response();
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
