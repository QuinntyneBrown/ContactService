using ContactService.Core.Interfaces;
using ContactService.Core.Models;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ContactService.API.Features.Contacts
{
    public class GetContactsQuery
    {
        public class Request : IRequest<Response> { }

        public class Response
        {
            public IEnumerable<ContactDto> Contacts { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IEventStore _eventStore;

            public Handler(IEventStore eventStore) => _eventStore = eventStore;

            public Task<Response> Handle(Request request, CancellationToken cancellationToken)
                => Task.FromResult(new Response()
                {
                    Contacts = _eventStore.Query<Contact>().Select(x => ContactDto.FromContact(x)).ToList()
                });
        }
    }
}
