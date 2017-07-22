using System;

namespace ContactService.Events
{
    public class EntityAddedOrUpdatedEvent
    {
        public EntityAddedOrUpdatedEvent(Guid correlationId, dynamic entity)
        {
            Payload = new {
                CorrelationId = correlationId,
                Entity = entity
            };
        }

        public string Type { get; set; } = Constants.ENTITY_ADDED_OR_UPDATED;

        public dynamic Payload { get; set; }
    }
}