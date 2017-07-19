using MediatR;
using ContactService.Data;
using ContactService.Data.Model;
using ContactService.Features.Core;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace ContactService.Features.Users
{
    public class AddOrUpdateUserCommand
    {
        public class Request : IRequest<AddOrUpdateUserResponse>
        {
            public UserApiModel User { get; set; }
			public int? TenantId { get; set; }
        }

        public class AddOrUpdateUserResponse { }

        public class AddOrUpdateUserHandler : IAsyncRequestHandler<Request, AddOrUpdateUserResponse>
        {
            public AddOrUpdateUserHandler(ContactServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<AddOrUpdateUserResponse> Handle(Request request)
            {
                var entity = await _context.Users
                    .SingleOrDefaultAsync(x => x.Id == request.User.Id && x.TenantId == request.TenantId);
                if (entity == null) _context.Users.Add(entity = new User());
                entity.Name = request.User.Name;
				entity.TenantId = request.TenantId;

                await _context.SaveChangesAsync();

                return new AddOrUpdateUserResponse();
            }

            private readonly ContactServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
