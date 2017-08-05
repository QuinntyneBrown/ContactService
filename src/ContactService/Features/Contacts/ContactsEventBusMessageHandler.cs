﻿using ContactService.Features.Core;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json.Linq;
using System;

namespace ContactService.Features.Contacts
{
    public interface IContactsEventBusMessageHandler: IEventBusMessageHandler { }

    public class ContactsEventBusMessageHandler: IContactsEventBusMessageHandler
    {
        public ContactsEventBusMessageHandler(ICacheProvider cacheProvider)
        {
            _cache = cacheProvider.GetCache();
        }

        public void Handle(JObject message)
        {
            try
            {
                if ($"{message["Type"]}" == ContactsEventBusMessages.AddedOrUpdatedContactMessage)
                {
                    _cache.Remove($"[Contacts] Get {message["TenantUniqueId"]}");
                }

                if ($"{message["Type"]}" == ContactsEventBusMessages.RemovedContactMessage)
                {
                    _cache.Remove($"[Contacts] Get {message["TenantUniqueId"]}");
                }

                GlobalHost.ConnectionManager.GetHubContext<EventHub>().Clients.All.events(message);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private readonly ICache _cache;
    }
}