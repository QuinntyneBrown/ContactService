using ContactService.Features.Core;
using ContactService.Security;
using MediatR;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;


namespace ContactService.Features.Users
{
    [Authorize]
    [RoutePrefix("api/users")]
    public class UsersController : BaseApiController
    {
        public UsersController(IMediator mediator, HttpClient httpClient)
            :base(mediator) {
            _httpClient = httpClient;
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

        [Route("token")]
        [AllowAnonymous]
        [HttpPost]
        public async Task<HttpResponseMessage> GetToken([FromBody]JObject request)
        {
            var formData = new List<KeyValuePair<string, string>>();

            formData.Add(new KeyValuePair<string, string>("grant_type", $"{request["grant_type"]}"));
            formData.Add(new KeyValuePair<string, string>("username", $"{request["username"]}"));
            formData.Add(new KeyValuePair<string, string>("password", $"{request["password"]}"));

            var httpRequestMessage = new HttpRequestMessage()
            {
                RequestUri = new Uri("http://identity.quinntynebrown.com/api/user/token"),
                Method = HttpMethod.Post,
                Content = new FormUrlEncodedContent(formData)
            };
            
            httpRequestMessage.Headers.Add("Tenant", Request.Headers.GetValues("Tenant").ToList()[0]);

            return await _httpClient.SendAsync(httpRequestMessage);
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

        private HttpClient _httpClient;
    }
}
