using MediatR;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ContactService.Features.Core;
using static ContactService.Features.Accounts.AddOrUpdateAccountCommand;
using static ContactService.Features.Accounts.GetAccountsQuery;
using static ContactService.Features.Accounts.GetAccountByIdQuery;
using static ContactService.Features.Accounts.RemoveAccountCommand;

namespace ContactService.Features.Accounts
{
    [Authorize]
    [RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateAccountResponse))]
        public async Task<IHttpActionResult> Add(AddOrUpdateAccountRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateAccountResponse))]
        public async Task<IHttpActionResult> Update(AddOrUpdateAccountRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetAccountsResponse))]
        public async Task<IHttpActionResult> Get()
        {
            var request = new GetAccountsRequest();
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetAccountByIdResponse))]
        public async Task<IHttpActionResult> GetById([FromUri]GetAccountByIdRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveAccountResponse))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveAccountRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        protected readonly IMediator _mediator;
    }
}
