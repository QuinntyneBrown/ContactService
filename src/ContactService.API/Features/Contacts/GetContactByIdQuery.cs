using ContactService.Core.Interfaces;
using ContactService.Core.Models;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ContactService.API.Features.Contacts
{
    public class GetContactByIdQuery
    {
        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(request => request.ContactId).NotEqual(default(Guid));
            }
        }

        public class Request : IRequest<Response> {
            public Guid ContactId { get; set; }
        }

        public class Response
        {
            public ContactDto Contact { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IEventStore _eventStore;
            
			public Handler(IEventStore eventStore) => _eventStore = eventStore;

            public Task<Response> Handle(Request request, CancellationToken cancellationToken)
			     => Task.FromResult(new Response()
                {
                    Contact = ContactDto.FromContact(_eventStore.Query<Contact>(request.ContactId))
                });
        }
    }
}
