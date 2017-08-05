using ContactService.Data;
using ContactService.Features.Core;
using MediatR;
using Microsoft.AspNet.SignalR;
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
            public Handler(ContactServiceContext context, IQueueClient queueClient)
            {
                _context = context;
                _queueClient = queueClient;
            }

            public async Task<Response> Handle(Request request)
            {



                var entity = await _context.Contacts.SingleAsync(x => x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);

                entity.IsDeleted = true;

                await _context.SaveChangesAsync();

                _queueClient.Send(new RemovedContactMessage()
                {
                    Payload = new
                    {
                        Id = request.Id,
                        CorrelationId = request.CorrelationId,
                    },
                    TenantUniqueId = request.TenantUniqueId
                });

                return new Response();
            }

            private readonly ContactServiceContext _context;            
            private readonly IQueueClient _queueClient;
        }
    }
}
