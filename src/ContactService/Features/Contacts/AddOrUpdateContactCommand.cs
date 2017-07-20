using MediatR;
using ContactService.Data;
using ContactService.Data.Model;
using ContactService.Features.Core;
using System;
using System.Threading.Tasks;
using System.Data.Entity;
using Microsoft.AspNet.SignalR;
using ContactService.Events;

namespace ContactService.Features.Contacts
{
    public class AddOrUpdateContactCommand
    {
        public class Request : IRequest<Response>
        {
            public ContactApiModel Contact { get; set; }
            public Guid TenantUniqueId { get; set; }
        }

        public class Response { }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(ContactServiceContext context, ICache cache, IEventHubProvider eventHubProvider)
            {
                _context = context;
                _cache = cache;
                _hubContext = eventHubProvider.Get();
            }

            public async Task<Response> Handle(Request request)
            {
                var entity = await _context.Contacts
                    .Include(x => x.Tenant)
                    .SingleOrDefaultAsync(x => x.Id == request.Contact.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                
                if (entity == null) {
                    var tenant = await _context.Tenants.SingleAsync(x => x.UniqueId == request.TenantUniqueId);
                    _context.Contacts.Add(entity = new Contact() { TenantId = tenant.Id });
                }

                entity.Name = request.Contact.Name;

                entity.Email = request.Contact.Email;

                entity.Firstname = request.Contact.Firstname;

                entity.Lastname = request.Contact.Lastname;

                entity.PhoneNumber = request.Contact.PhoneNumber;

                entity.City = request.Contact.City;

                entity.StreetAddress = request.Contact.StreetAddress;
                
                await _context.SaveChangesAsync();
                
                _hubContext.Clients.All.events(new EntityAddedOrUpdatedEvent(request,entity));

                _cache.Remove($"[Contacts] Get { request.TenantUniqueId}");

                return new Response();
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
            private readonly IHubContext _hubContext;
        }
    }
}
