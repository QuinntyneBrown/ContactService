using Newtonsoft.Json.Linq;

namespace ContactService.Features.Core
{
    public interface IEventBusMessageHandler
    {
        void Handle(JObject message);
    }
}