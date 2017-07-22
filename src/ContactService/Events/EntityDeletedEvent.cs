﻿using System;

namespace ContactService.Events
{
    public class EntityDeletedEvent {
        public EntityDeletedEvent(Guid correlationId, dynamic entity)
        {
            Payload = new
            {
                CorrelationId = correlationId,
                Entity = entity
            };
        }

        public string Type { get; set; } = Constants.ENTITY_DELETED;

        public dynamic Payload { get; set; }        
    }
}