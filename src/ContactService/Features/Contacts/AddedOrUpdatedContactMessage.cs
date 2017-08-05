using ContactService.Features.Core;

namespace ContactService.Features.Incidents
{
    public class AddedOrUpdatedContactMessage : BaseEventBusMessage
    {        
        public override string Type { get; set; } = ContactsEventBusMessages.AddedOrUpdatedContactMessage;        
    }
}