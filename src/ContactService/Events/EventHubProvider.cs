using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContactService.Events
{
    public interface IEventHubProvider
    {
        IHubContext Get();
    }

    public class EventHubProvider : IEventHubProvider
    {
        public IHubContext Get()
        {
            return GlobalHost.ConnectionManager.GetHubContext<EventHub>();
        }
    }
}