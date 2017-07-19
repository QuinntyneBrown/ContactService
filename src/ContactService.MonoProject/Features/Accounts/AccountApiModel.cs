using ContactService.Data.Model;
using System.Collections.Generic;
using System.Linq;

namespace ContactService.Features.Accounts
{
    public class AccountApiModel
    {        
        public int Id { get; set; }

        public int? TenantId { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Email { get; set; }

        public ICollection<ProfileApiModel> Profiles { get; set; } = new HashSet<ProfileApiModel>();

        public static TModel FromAccount<TModel>(Account account) where
            TModel : AccountApiModel, new()
        {
            var model = new TModel();

            model.Id = account.Id;

            model.TenantId = account.TenantId;

            model.Firstname = account.Firstname;

            model.Lastname = account.Lastname;

            model.Email = account.Email;

            model.Profiles = account.Profiles.Select(x => ProfileApiModel.FromProfile(x)).ToList();

            return model;
        }

        public static AccountApiModel FromAccount(Account account)
            => FromAccount<AccountApiModel>(account);

    }
}
