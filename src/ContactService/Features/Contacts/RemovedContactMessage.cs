﻿using ContactService.Features.Core;
using System;

namespace ContactService.Features.Incidents
{
    public class RemovedContactMessage : IEventBusMessage
    {
        public dynamic Payload { get; set; }

        public string Type { get; set; } = ContactsEventBusMessages.RemovedContactMessage;

        public Guid TenantUniqueId { get; set; }
    }
}