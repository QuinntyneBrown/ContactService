using MediatR;
using ContactService.Data;
using ContactService.Data.Model;
using ContactService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace ContactService.Features.ContactRequests
{
    public class RemoveContactRequestCommand
    {
        public class RemoveContactRequestRequest : IRequest<RemoveContactRequestResponse>
        {
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; } 
        }

        public class RemoveContactRequestResponse { }

        public class RemoveContactRequestHandler : IAsyncRequestHandler<RemoveContactRequestRequest, RemoveContactRequestResponse>
        {
            public RemoveContactRequestHandler(ContactServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<RemoveContactRequestResponse> Handle(RemoveContactRequestRequest request)
            {
                var contactRequest = await _context.ContactRequests.SingleAsync(x=>x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                contactRequest.IsDeleted = true;
                await _context.SaveChangesAsync();
                return new RemoveContactRequestResponse();
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
