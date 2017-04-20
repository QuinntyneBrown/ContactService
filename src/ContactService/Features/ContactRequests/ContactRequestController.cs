using MediatR;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ContactService.Features.Core;
using static ContactService.Features.ContactRequests.AddOrUpdateContactRequestCommand;
using static ContactService.Features.ContactRequests.GetContactRequestsQuery;
using static ContactService.Features.ContactRequests.GetContactRequestByIdQuery;
using static ContactService.Features.ContactRequests.RemoveContactRequestCommand;

namespace ContactService.Features.ContactRequests
{
    [Authorize]
    [RoutePrefix("api/contactRequest")]
    public class ContactRequestController : ApiController
    {
        public ContactRequestController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateContactRequestResponse))]
        public async Task<IHttpActionResult> Add(AddOrUpdateContactRequestRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateContactRequestResponse))]
        public async Task<IHttpActionResult> Update(AddOrUpdateContactRequestRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetContactRequestsResponse))]
        public async Task<IHttpActionResult> Get()
        {
            var request = new GetContactRequestsRequest();
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetContactRequestByIdResponse))]
        public async Task<IHttpActionResult> GetById([FromUri]GetContactRequestByIdRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveContactRequestResponse))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveContactRequestRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        protected readonly IMediator _mediator;
    }
}
