using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContactService.Events
{
    public class EntityAddedOrUpdatedEvent
    {
        public EntityAddedOrUpdatedEvent(dynamic request, dynamic entity)
        {
            Request = request;
            Entity = entity;
        }

        public string Type { get; set; } = Constants.ENTITY_ADDED_OR_UPDATED;

        public dynamic Request { get; set; }

        public dynamic Entity { get; set; }
    }
}