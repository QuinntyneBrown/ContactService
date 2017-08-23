using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;


namespace ContactService.Features.Users
{
    [Authorize]
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        public UsersController(HttpClient httpClient) { 
            _httpClient = httpClient;
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
                RequestUri = new Uri("http://identity.quinntynebrown.com/api/users/token"),
                Method = HttpMethod.Post,
                Content = new FormUrlEncodedContent(formData)
            };
            
            httpRequestMessage.Headers.Add("Tenant", Request.Headers.GetValues("Tenant").ToList()[0]);

            return await _httpClient.SendAsync(httpRequestMessage);
        }

        
        [Route("current")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Current()
        {            
            if (!User.Identity.IsAuthenticated)
                return Ok();
            
            return Ok(new {
                Username = User.Identity.Name
            });
        }

        private HttpClient _httpClient;
    }
}
