using System.Data.Entity.Migrations;
using ContactService.Data;
using ContactService.Data.Model;
using System;

namespace ContactService.Migrations
{
    public class TenantConfiguration
    {
        public static void Seed(ContactServiceContext context) {

            context.Tenants.AddOrUpdate(x => x.Name, new Tenant()
            {
                Name = "Default",
                UniqueId = new Guid("50848e1d-f3ec-486a-b25c-7f6cf1ef7c93")
            });

            context.Tenants.AddOrUpdate(x => x.Name, new Tenant()
            {
                Name = "RTFG",
                UniqueId = new Guid("489902a0-a39d-4556-94b4-544d33d5ff5b")
            });

            context.SaveChanges();
        }
    }
}
