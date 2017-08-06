using MediatR;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ContactService.Features.Core;

namespace ContactService.Features.Accounts
{
    [Authorize]
    [RoutePrefix("api/profiles")]
    public class ProfilesController : BaseApiController
    {
        public ProfilesController(IMediator mediator)
            :base(mediator) { }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateProfileCommand.Response))]
        public async Task<IHttpActionResult> Add(AddOrUpdateProfileCommand.Request request)
        {
            return Ok(await Send(request));
        }

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateProfileCommand.Response))]
        public async Task<IHttpActionResult> Update(AddOrUpdateProfileCommand.Request request)
        {            
            return Ok(await Send(request));
        }
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetProfilesQuery.Response))]
        public async Task<IHttpActionResult> Get()
        {
            return Ok(await _mediator.Send(new GetProfilesQuery.Request()));
        }

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetProfileByIdQuery.Response))]
        public async Task<IHttpActionResult> GetById([FromUri]GetProfileByIdQuery.Request request)
        {
            return Ok(await Send(request));
        }

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveProfileCommand.Response))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveProfileCommand.Request request)
        {
            return Ok(await Send(request));
        }

        private readonly IMediator _mediator;
    }
}
