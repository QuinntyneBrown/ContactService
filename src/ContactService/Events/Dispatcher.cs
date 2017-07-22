using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace ContactService.Events
{
    public interface IDispatcher {
        void Dispatch<T>(dynamic action) where T : IHub;
    }

    public class Dispatcher : IDispatcher
    {
        public void Dispatch<T>(dynamic action) where T : IHub
        {
            GlobalHost.ConnectionManager.GetHubContext<T>()
                .Clients.All.dispatch(action);
        }
    }
}