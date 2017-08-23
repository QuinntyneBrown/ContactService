using ContactService.Model;
using ContactService.Features.Core;
using System;

namespace ContactService.Features.Contacts
{
    public class AddedOrUpdatedContactMessage : BaseEventBusMessage
    {
        public AddedOrUpdatedContactMessage(Contact contact, Guid correlationId, Guid tenantId)
        {
            Payload = new { Entity = contact, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = ContactsEventBusMessages.AddedOrUpdatedContactMessage;        
    }
}