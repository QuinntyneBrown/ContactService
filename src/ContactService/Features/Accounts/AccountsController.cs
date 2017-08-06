using ContactService.Features.Core;
using MediatR;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace ContactService.Features.Accounts
{
    [Authorize]
    [RoutePrefix("api/accounts")]
    public class AccountsController : BaseApiController
    {
        public AccountsController(IMediator mediator)
            :base(mediator) { }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateAccountCommand.Response))]
        public async Task<IHttpActionResult> Add(AddOrUpdateAccountCommand.Request request)
        {            
            return Ok(await Send(request));
        }

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateAccountCommand.Response))]
        public async Task<IHttpActionResult> Update(AddOrUpdateAccountCommand.Request request)
        {            
            return Ok(await Send(request));
        }

        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetAccountsQuery.Response))]
        public async Task<IHttpActionResult> Get()
        {            
            return Ok(await Send(new GetAccountsQuery.Request()));
        }

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetAccountByIdQuery.Response))]
        public async Task<IHttpActionResult> GetById([FromUri]GetAccountByIdQuery.Request request)
        {
            return Ok(await Send(request));
        }

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveAccountCommand.Response))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveAccountCommand.Request request)
        {
            
            return Ok(await Send(request));
        }

        private readonly IMediator _mediator;
    }
}
