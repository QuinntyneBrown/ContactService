using ContactService.Data;
using ContactService.Features.Core;
using MediatR;
using Microsoft.AspNet.SignalR;
using Microsoft.ServiceBus.Messaging;
using System;
using System.Data.Entity;
using System.Threading.Tasks;

namespace ContactService.Features.Contacts
{
    public class RemoveContactCommand
    {
        public class Request : IRequest<Response>
        {
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; } 
            public Guid CorrelationId { get; set; }
        }

        public class Response { }

        public class Handler : IAsyncRequestHandler<Request, Response>
        {
            public Handler(ContactServiceContext context, IEventBus bus)
            {
                _context = context;
                _bus = bus;
            }

            public async Task<Response> Handle(Request request)
            {
                try
                {
                    var entity = await _context.Contacts.SingleAsync(x => x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);

                    entity.IsDeleted = true;

                    await _context.SaveChangesAsync();

                    var client = TopicClient.CreateFromConnectionString(CoreConfiguration.Config.EventQueueConnectionString, CoreConfiguration.Config.TopicName);
                    
                    _bus.Publish(new AddedOrUpdatedContactMessage()
                    {
                        Payload = new
                        {
                            Id = request.Id,
                            CorrelationId = request.CorrelationId,
                        },
                        TenantUniqueId = request.TenantUniqueId
                    });

                }
                catch (Exception exception) {
                    throw exception;
                }
                return new Response();
            }

            private readonly ContactServiceContext _context;
            private readonly IEventBus _bus;       
        }
    }
}
