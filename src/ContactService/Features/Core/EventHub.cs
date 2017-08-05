using Microsoft.AspNet.SignalR.Hubs;

namespace ContactService.Features.Core
{
    [HubName("eventHub")]
    public class EventHub: BaseHub { }
}