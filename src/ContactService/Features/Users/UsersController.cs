using ContactService.Features.Core;
using ContactService.Security;
using MediatR;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;


namespace ContactService.Features.Users
{
    [Authorize]
    [RoutePrefix("api/users")]
    public class UsersController : BaseApiController
    {
        public UsersController(IMediator mediator, IUserManager userManager)
            :base(mediator)
        {
            _userManager = userManager;
        }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateUserCommand.Response))]
        public async Task<IHttpActionResult> Add(AddOrUpdateUserCommand.Request request)
        {
            return Ok(await Send(request));
        }

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateUserCommand.Response))]
        public async Task<IHttpActionResult> Update(AddOrUpdateUserCommand.Request request)
        {
            return Ok(await Send(request));
        }
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetUsersQuery.Response))]
        public async Task<IHttpActionResult> Get([FromUri]GetUsersQuery.Request request)
        {
            return Ok(await Send(request));
        }

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetUserByIdQuery.Response))]
        public async Task<IHttpActionResult> GetById([FromUri]GetUserByIdQuery.Request request)
        {
            return Ok(await Send(request));
        }

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveUserCommand.Response))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveUserCommand.Request request)
        {
            return Ok(await Send(request));
        }

        [Route("current")]
        [HttpGet]
        [AllowAnonymous]
        [ResponseType(typeof(GetUserByUsernameQuery.Response))]
        public async Task<IHttpActionResult> Current()
        {            
            if (!User.Identity.IsAuthenticated)
                return Ok();
            
            return Ok(await Send(new GetUserByUsernameQuery.Request()
            {
                Username = User.Identity.Name
            }));
        }
        
        private readonly IUserManager _userManager;
    }
}
