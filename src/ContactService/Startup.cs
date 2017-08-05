using Owin;
using System.Web.Http;
using Microsoft.Owin;
using Unity.WebApi;
using Microsoft.Practices.Unity;
using ContactService.Features.Core;
using Microsoft.ServiceBus.Messaging;

using static Newtonsoft.Json.JsonConvert;
using Newtonsoft.Json.Linq;

[assembly: OwinStartup(typeof(ContactService.Startup))]

namespace ContactService
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            GlobalConfiguration.Configure(config =>
            {
                var container = UnityConfiguration.GetContainer();
                config.DependencyResolver = new UnityDependencyResolver(container);
                ApiConfiguration.Install(config, app);

                var contactsEventBusMessageHandler = container.Resolve<Features.Contacts.IContactsEventBusMessageHandler>();
                var queueClient = container.Resolve<IQueueClient>();

                queueClient.OnMessage((message) =>
                {
                    var messageBody = ((BrokeredMessage)message).GetBody<string>();
                    var messageBodyObject = DeserializeObject<JObject>(messageBody);
                    contactsEventBusMessageHandler.Handle(messageBodyObject);
                });
            });
        }
    }
}