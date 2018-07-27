using ContactService.Core.Models;
using System;

namespace ContactService.API.Features.Contacts
{
    public class ContactDto
    {        
        public Guid ContactId { get; set; }
        public string Firstname { get; set; }

        public static ContactDto FromContact(Contact contact)
            => new ContactDto
            {
                ContactId = contact.ContactId,
                Firstname = contact.Firstname
            };
    }
}
