using ContactService.Data;
using ContactService.Features.Core;
using MediatR;
using System;
using System.Data.Entity;
using System.Threading.Tasks;

namespace ContactService.Features.Contacts
{
    public class RemoveContactCommand
    {
        public class Request : BaseRequest, IRequest<Response>
        {
            public int Id { get; set; }            
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
                    
                    _bus.Publish(new RemovedContactMessage(request.Id,request.CorrelationId,request.TenantUniqueId));

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
