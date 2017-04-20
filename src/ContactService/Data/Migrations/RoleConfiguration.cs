using System.Data.Entity.Migrations;
using ContactService.Data;
using ContactService.Data.Model;
using ContactService.Features.Users;

namespace ContactService.Migrations
{
    public class RoleConfiguration
    {
        public static void Seed(ContactServiceContext context) {

            context.Roles.AddOrUpdate(x => x.Name, new Role()
            {
                Name = Roles.SYSTEM
            });

            context.Roles.AddOrUpdate(x => x.Name, new Role()
            {
                Name = Roles.ACCOUNT_HOLDER
            });

            context.Roles.AddOrUpdate(x => x.Name, new Role()
            {
                Name = Roles.DEVELOPMENT
            });

            context.SaveChanges();
        }
    }
}
