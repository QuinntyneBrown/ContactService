using ContactService.Features.Core;
using MediatR;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace ContactService.Features.Contacts
{
    [System.Web.Http.Authorize]
    [RoutePrefix("api/contacts")]
    public class ContactController : BaseApiController
    {
        public ContactController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateContactCommand.Response))]
        public async Task<IHttpActionResult> Add(AddOrUpdateContactCommand.Request request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            await _mediator.Send(request);
            return Ok();
        }

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateContactCommand.Response))]
        public async Task<IHttpActionResult> Update(AddOrUpdateContactCommand.Request request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetContactsQuery.Response))]
        public async Task<IHttpActionResult> Get()
        {
            var request = new GetContactsQuery.Request();
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetContactByIdQuery.Response))]
        public async Task<IHttpActionResult> GetById([FromUri]GetContactByIdQuery.Request request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveContactCommand.Response))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveContactCommand.Request request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        private readonly IMediator _mediator;
    }
}