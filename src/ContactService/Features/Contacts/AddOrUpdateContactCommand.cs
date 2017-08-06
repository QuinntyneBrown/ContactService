using ContactService.Data;
using ContactService.Data.Model;
using ContactService.Features.Core;
using MediatR;
using System;
using System.Threading.Tasks;
using System.Data.Entity;
using Microsoft.ServiceBus.Messaging;

namespace ContactService.Features.Contacts
{
    public class AddOrUpdateContactCommand
    {
        public class Request : IRequest<Response>
        {
            public ContactApiModel Contact { get; set; }
            public Guid TenantUniqueId { get; set; }
            public Guid CorrelationId { get; set; }
        }

        public class Response { }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(ICache cache, ContactServiceContext context, IEventBus bus)
            {
                _context = context;
                _cache = cache;
                _bus = bus;
            }

            public async Task<Response> Handle(Request request)
            {
                var entity = await _context.Contacts
                    .Include(x => x.Tenant)
                    .SingleOrDefaultAsync(x => x.Id == request.Contact.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                
                if (entity == null) {
                    var tenant = await _cache.FromCacheOrServiceAsync(() => _context.Tenants.SingleAsync(x => x.UniqueId == request.TenantUniqueId),$"[Tenant] {request.TenantUniqueId}");
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
                
                _bus.Publish(new AddedOrUpdatedContactMessage(entity, request.CorrelationId, request.TenantUniqueId));
                
                return new Response();
            }

            private readonly ContactServiceContext _context;            
            private readonly ICache _cache;
            private readonly IEventBus _bus;
        }
    }
}