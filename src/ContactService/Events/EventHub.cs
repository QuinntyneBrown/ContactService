using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace ContactService.Events
{
    [HubName("eventHub")]
    public class EventHub: Hub
    {
        public override Task OnConnected()
        {
            return base.OnConnected();
        }
    }
}