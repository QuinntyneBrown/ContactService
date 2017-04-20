using MediatR;
using ContactService.Data;
using ContactService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace ContactService.Features.ContactRequests
{
    public class GetContactRequestsQuery
    {
        public class GetContactRequestsRequest : IRequest<GetContactRequestsResponse> { 
            public Guid TenantUniqueId { get; set; }       
        }

        public class GetContactRequestsResponse
        {
            public ICollection<ContactRequestApiModel> ContactRequests { get; set; } = new HashSet<ContactRequestApiModel>();
        }

        public class GetContactRequestsHandler : IAsyncRequestHandler<GetContactRequestsRequest, GetContactRequestsResponse>
        {
            public GetContactRequestsHandler(ContactServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<GetContactRequestsResponse> Handle(GetContactRequestsRequest request)
            {
                var contactRequests = await _context.ContactRequests
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId )
                    .ToListAsync();

                return new GetContactRequestsResponse()
                {
                    ContactRequests = contactRequests.Select(x => ContactRequestApiModel.FromContactRequest(x)).ToList()
                };
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
