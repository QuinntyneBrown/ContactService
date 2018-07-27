using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ContactService.API.Features.Contacts
{
    [ApiController]
    [Route("api/contacts")]
    public class ContactsController
    {
        private readonly IMediator _mediator;

        public ContactsController(IMediator mediator) => _mediator = mediator;

        [HttpPost]
        public async Task<ActionResult<CreateContactCommand.Response>> Create(CreateContactCommand.Request request)
            => await _mediator.Send(request);

        [HttpPut]
        public async Task<ActionResult<UpdateContactCommand.Response>> Update([FromBody]UpdateContactCommand.Request request)
            => await _mediator.Send(request);
        
        [HttpDelete("{contactId}")]
        public async Task Remove([FromRoute]RemoveContactCommand.Request request)
            => await _mediator.Send(request);            

        [HttpGet("{contactId}")]
        public async Task<ActionResult<GetContactByIdQuery.Response>> GetById([FromRoute]GetContactByIdQuery.Request request)
            => await _mediator.Send(request);

        [HttpGet]
        public async Task<ActionResult<GetContactsQuery.Response>> Get()
            => await _mediator.Send(new GetContactsQuery.Request());
    }
}
