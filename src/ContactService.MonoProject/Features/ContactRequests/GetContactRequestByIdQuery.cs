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
    public class GetContactRequestByIdQuery
    {
        public class GetContactRequestByIdRequest : IRequest<GetContactRequestByIdResponse> { 
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; }
        }

        public class GetContactRequestByIdResponse
        {
            public ContactRequestApiModel ContactRequest { get; set; } 
        }

        public class GetContactRequestByIdHandler : IAsyncRequestHandler<GetContactRequestByIdRequest, GetContactRequestByIdResponse>
        {
            public GetContactRequestByIdHandler(ContactServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<GetContactRequestByIdResponse> Handle(GetContactRequestByIdRequest request)
            {                
                return new GetContactRequestByIdResponse()
                {
                    ContactRequest = ContactRequestApiModel.FromContactRequest(await _context.ContactRequests
                    .Include(x => x.Tenant)				
					.SingleAsync(x=>x.Id == request.Id &&  x.Tenant.UniqueId == request.TenantUniqueId))
                };
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
