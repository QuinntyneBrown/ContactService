using MediatR;
using ContactService.Data;
using ContactService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace ContactService.Features.Accounts
{
    public class GetAccountsQuery
    {
        public class Request : IRequest<Response> { 
            public Guid TenantUniqueId { get; set; }       
        }

        public class Response
        {
            public ICollection<AccountApiModel> Accounts { get; set; } = new HashSet<AccountApiModel>();
        }

        public class GetAccountsHandler : IAsyncRequestHandler<Request, Response>
        {
            public GetAccountsHandler(ContactServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<Response> Handle(Request request)
            {
                var accounts = await _context.Accounts
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId )
                    .ToListAsync();

                return new Response()
                {
                    Accounts = accounts.Select(x => AccountApiModel.FromAccount(x)).ToList()
                };
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
