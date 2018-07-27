using ContactService.Core.Common;
using ContactService.Core.DomainEvents;
using System;

namespace ContactService.Core.Models
{
    public class Contact: AggregateRoot
    {
        public Contact(string name)
            => Apply(new ContactCreated(name,ContactId));

        public Guid ContactId { get; set; } = Guid.NewGuid();          
		public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; }

        protected override void EnsureValidState()
        {
            
        }

        protected override void When(DomainEvent @event)
        {
            switch (@event)
            {
                case ContactCreated contactCreated:
                    Firstname = contactCreated.Firstname;
					ContactId = contactCreated.ContactId;
                    break;

                case ContactNameChanged contactNameChanged:
                    Firstname = contactNameChanged.Name;
                    break;

                case ContactRemoved contactRemoved:
                    IsDeleted = true;
                    break;
            }
        }

        public void ChangeName(string name)
            => Apply(new ContactNameChanged(name));

        public void Remove()
            => Apply(new ContactRemoved());
    }
}
