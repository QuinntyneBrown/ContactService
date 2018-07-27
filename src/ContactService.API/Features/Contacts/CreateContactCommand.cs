using ContactService.Core.Interfaces;
using ContactService.Core.Models;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using System.Threading;
using System;

namespace ContactService.API.Features.Contacts
{
    public class CreateContactCommand
    {
        public class Validator: AbstractValidator<Request> {
            public Validator()
            {
                RuleFor(request => request.Contact.ContactId).NotNull();
            }
        }

        public class Request : IRequest<Response> {
            public ContactDto Contact { get; set; }
        }

        public class Response
        {			
            public Guid ContactId { get; set; }
        }

        public class Handler : IRequestHandler<Request, Response>
        {
            private readonly IEventStore _eventStore;
            
			public Handler(IEventStore eventStore) => _eventStore = eventStore;

            public Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var contact = new Contact(request.Contact.Firstname);

                _eventStore.Save(contact);
                
                return Task.FromResult(new Response() { ContactId = contact.ContactId });
            }
        }
    }
}
