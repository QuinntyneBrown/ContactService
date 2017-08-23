using ContactService.Model;

namespace ContactService.Features.Contacts
{
    public class ContactApiModel
    {        
        public int Id { get; set; }
        public int? TenantId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string PhoneNumber { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }

        public static TModel FromContact<TModel>(Contact contact) where
            TModel : ContactApiModel, new()
        {
            var model = new TModel();
            model.Id = contact.Id;
            model.TenantId = contact.TenantId;
            model.Name = contact.Name;
            model.Email = contact.Email;
            model.Firstname = contact.Firstname;
            model.Lastname = contact.Lastname;
            model.PhoneNumber = contact.PhoneNumber;
            model.StreetAddress = contact.StreetAddress;
            model.City = contact.City;
            return model;
        }

        public static ContactApiModel FromContact(Contact contact)
            => FromContact<ContactApiModel>(contact);
    }
}
