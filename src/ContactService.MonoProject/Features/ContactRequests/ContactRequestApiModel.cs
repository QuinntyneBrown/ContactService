using ContactService.Data.Model;

namespace ContactService.Features.ContactRequests
{
    public class ContactRequestApiModel
    {        
        public int Id { get; set; }

        public int? TenantId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Description { get; set; }

        public static TModel FromContactRequest<TModel>(ContactRequest contactRequest) where
            TModel : ContactRequestApiModel, new()
        {
            var model = new TModel();

            model.Id = contactRequest.Id;

            model.TenantId = contactRequest.TenantId;

            model.Name = contactRequest.Name;

            model.Email = contactRequest.Email;

            model.Description = contactRequest.Description;

            return model;
        }

        public static ContactRequestApiModel FromContactRequest(ContactRequest contactRequest)
            => FromContactRequest<ContactRequestApiModel>(contactRequest);

    }
}
