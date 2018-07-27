using ContactService.Core.Interfaces;
using ContactService.Core.Models;
using FluentValidation;
using MediatR;
using System;
using System.Threading.Tasks;
using System.Threading;

namespace ContactService.API.Features.Contacts
{
    public class RemoveContactCommand
    {
        public class Validator : AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(request => request.ContactId).NotEqual(default(Guid));
            }
        }

        public class Request : IRequest
        {
            public Guid ContactId { get; set; }
        }

        public class Handler : IRequestHandler<Request>
        {
            private readonly IEventStore _eventStore;
            
            public Handler(IEventStore eventStore) => _eventStore = eventStore;

            public Task Handle(Request request, CancellationToken cancellationToken)
            {
                var contact = _eventStore.Query<Contact>(request.ContactId);

                contact.Remove();
                
                _eventStore.Save(contact);

                return Task.CompletedTask;
            }
        }
    }
}
