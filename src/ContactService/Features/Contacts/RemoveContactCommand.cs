using MediatR;
using ContactService.Data;
using ContactService.Data.Model;
using ContactService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;
using ContactService.Events;
using Microsoft.AspNet.SignalR;

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
            public RemoveContactHandler(ContactServiceContext context, ICache cache, IEventHubProvider eventHubProvider)
            {
                _context = context;
                _cache = cache;
                _hubContext = eventHubProvider.Get();
            }

            public async Task<Response> Handle(Request request)
            {
                var entity = await _context.Contacts.SingleAsync(x=>x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);

                entity.IsDeleted = true;

                await _context.SaveChangesAsync();

                _cache.Remove($"[Contacts] Get { request.TenantUniqueId}");

                _hubContext.Clients.All(new EntityDeletedEvent(request,entity));

                return new Response();
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
            private readonly IHubContext _hubContext;
        }
    }
}
