using System;

namespace ContactService.Features.Core
{
    public interface IQueueClient
    {
        void OnMessage(Action<dynamic> callback);
        void Send(dynamic message);
    }
}