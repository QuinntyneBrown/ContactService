using MediatR;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace ContactService.Features.Core
{
    public class BaseApiController : ApiController
    {
        public BaseApiController(IMediator mediator)
        {
            _mediator = mediator;
        }

        protected Guid TenantUniqueId
        {
            get
            {
                return new Guid(Request.Headers.GetValues("Tenant").Single());
            }
        }

        public Task<TResponse> Send<TResponse>(IRequest<TResponse> request)
        {
            (request as BaseRequest).TenantUniqueId = TenantUniqueId;
            return _mediator.Send(request);
        }

        private IMediator _mediator;
    }
}
