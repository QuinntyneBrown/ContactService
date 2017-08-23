using System.Data.Entity.Migrations;
using ContactService.Data;
using ContactService.Model;
using System;

namespace ContactService.Migrations
{
    public class TenantConfiguration
    {
        public static void Seed(ContactServiceContext context) {

            context.Tenants.AddOrUpdate(x => x.Name, new Tenant()
            {
                Name = "Default",
                UniqueId = new Guid("489902a0-a39d-4556-94b4-544d33d5ff5b")
            });

            context.SaveChanges();
        }
    }
}
