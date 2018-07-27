namespace ContactService.Core.DomainEvents
{
    public class ContactNameChanged: DomainEvent
    {
        public ContactNameChanged(string name) => Name = name;
        public string Name { get; set; }
    }
}
