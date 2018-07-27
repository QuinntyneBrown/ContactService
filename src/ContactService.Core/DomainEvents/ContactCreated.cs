using System;

namespace ContactService.Core.DomainEvents
{
    public class ContactCreated: DomainEvent
    {
        public ContactCreated(string firstname, Guid contactId)
        {
            ContactId = contactId;
            Firstname = firstname;
        }            
        public Guid ContactId { get; set; }

        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
    }
}
