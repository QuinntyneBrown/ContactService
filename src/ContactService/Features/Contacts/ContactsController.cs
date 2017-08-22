using ContactService.Features.Core;
using MediatR;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace ContactService.Features.Contacts
{
    [System.Web.Http.Authorize]
    [RoutePrefix("api/contacts")]
    public class ContactsController : BaseApiController
    {
        public ContactsController(IMediator mediator)
            :base(mediator) { }

        [Route("add")]
        [HttpPost]
        [AllowAnonymous]
        [ResponseType(typeof(AddOrUpdateContactCommand.Response))]
        public async Task<IHttpActionResult> Add(AddOrUpdateContactCommand.Request request) => Ok(await Send(request));
        
        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateContactCommand.Response))]
        public async Task<IHttpActionResult> Update(AddOrUpdateContactCommand.Request request)
        {
            return Ok(await Send(request));
        }
        
        [Route("get")]
        [HttpGet]
        [ResponseType(typeof(GetContactsQuery.Response))]
        public async Task<IHttpActionResult> Get()
        {

            return Ok(await Send(new GetContactsQuery.Request()));
        }

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetContactByIdQuery.Response))]
        public async Task<IHttpActionResult> GetById([FromUri]GetContactByIdQuery.Request request)
        {
            return Ok(await Send(request));
        }

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveContactCommand.Response))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveContactCommand.Request request)
        {
            return Ok(await Send(request));
        }
    }
}