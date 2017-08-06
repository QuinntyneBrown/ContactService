using Owin;
using System.Web.Http;
using Microsoft.Owin;
using Unity.WebApi;
using Microsoft.Practices.Unity;
using ContactService.Features.Core;
using Microsoft.ServiceBus.Messaging;

using static Newtonsoft.Json.JsonConvert;
using Newtonsoft.Json.Linq;
using System;
using Newtonsoft.Json;

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
                
                var client = SubscriptionClient.CreateFromConnectionString(CoreConfiguration.Config.EventQueueConnectionString, CoreConfiguration.Config.TopicName, "contact-service");

                client.OnMessage(message =>
                {
                    try
                    {
                        var messageBody = ((BrokeredMessage)message).GetBody<string>();
                        var messageBodyObject = DeserializeObject<JObject>(messageBody, new JsonSerializerSettings
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Serialize,
                            PreserveReferencesHandling = PreserveReferencesHandling.Objects,
                            TypeNameHandling = TypeNameHandling.All
                        });
                        contactsEventBusMessageHandler.Handle(messageBodyObject);
                    }
                    catch (Exception e)
                    {

                    }
                });
            });
        }
    }
}