using ContactService.Features.Core;
using System;

namespace ContactService.Features.Contacts
{
    public class RemovedContactMessage : IEventBusMessage
    {
        public RemovedContactMessage(int contactId, Guid CorrelationId, Guid TenantId)
        {
            Payload = new
            {
                Id = contactId,
                CorrelationId = CorrelationId,
            };
            TenantUniqueId = TenantId;
        }

        public dynamic Payload { get; set; }
        public string Type { get; set; } = ContactsEventBusMessages.RemovedContactMessage;
        public Guid TenantUniqueId { get; set; }
    }
}