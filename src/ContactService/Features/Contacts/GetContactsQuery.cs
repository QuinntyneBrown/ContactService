using MediatR;
using ContactService.Data;
using ContactService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace ContactService.Features.Contacts
{
    public class GetContactsQuery
    {
        public class Request : BaseRequest, IRequest<Response> { }

        public class Response
        {
            public ICollection<ContactApiModel> Contacts { get; set; } = new HashSet<ContactApiModel>();
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
                var contacts = await _cache.FromCacheOrServiceAsync<List<Data.Model.Contact>>(() => _context.Contacts
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId)
                    .ToListAsync(), $"[Contacts] Get {request.TenantUniqueId}");

                return new Response()
                {
                    Contacts = contacts.Select(x => ContactApiModel.FromContact(x)).ToList()
                };
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
