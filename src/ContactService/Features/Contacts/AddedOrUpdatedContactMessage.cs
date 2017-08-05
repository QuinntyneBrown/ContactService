using ContactService.Features.Core;

namespace ContactService.Features.Contacts
{
    public class AddedOrUpdatedContactMessage : BaseEventBusMessage
    {        
        public override string Type { get; set; } = ContactsEventBusMessages.AddedOrUpdatedContactMessage;        
    }
}