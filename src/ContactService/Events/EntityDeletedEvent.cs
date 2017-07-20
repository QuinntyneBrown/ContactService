using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContactService.Events
{
    public class EntityDeletedEvent {
        public EntityDeletedEvent(dynamic request, dynamic entity)
        {
            Request = request;
            Entity = entity;
        }

        public string Type { get; set; } = Constants.ENTITY_DELETED;

        public dynamic Request { get; set; }

        public dynamic Entity { get; set; }
    }
}