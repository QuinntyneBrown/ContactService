using MediatR;
using ContactService.Data;
using ContactService.Data.Model;
using ContactService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace ContactService.Features.Contacts
{
    public class RemoveContactCommand
    {
        public class Request : IRequest<Response>
        {
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; } 
        }

        public class Response { }

        public class RemoveContactHandler : IAsyncRequestHandler<Request, Response>
        {
            public RemoveContactHandler(ContactServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<Response> Handle(Request request)
            {
                var contact = await _context.Contacts.SingleAsync(x=>x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                contact.IsDeleted = true;
                await _context.SaveChangesAsync();
                return new Response();
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
