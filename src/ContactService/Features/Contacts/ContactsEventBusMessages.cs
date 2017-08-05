namespace ContactService.Features.Contacts
{
    public class ContactsEventBusMessages
    {
        public static string AddedOrUpdatedContactMessage = "[Contacts] ContactAddedOrUpdated";
        public static string RemovedContactMessage = "[Contacts] ContactRemoved";
    }
}