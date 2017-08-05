using Microsoft.ServiceBus.Messaging;
using Newtonsoft.Json;
using System;

namespace ContactService.Features.Core
{
    public class EventsQueueClient: IQueueClient
    {
        public EventsQueueClient()
        {
            var connectionString = CoreConfiguration.Config.EventQueueConnectionString;
            var queueName = CoreConfiguration.Config.EventQueueName;
            _queueClient = QueueClient.CreateFromConnectionString(connectionString, queueName);
        }
        
        public void OnMessage(Action<dynamic> callback) => _queueClient.OnMessage(callback);

        public void Send(dynamic message)
            => _queueClient.Send(new BrokeredMessage(JsonConvert.SerializeObject(message)));

        public void OnMessageCallback(dynamic message) {

        }
        private readonly QueueClient _queueClient;
    }
}