using System.Configuration;

namespace ContactService.Features.Core
{    
    public interface ICoreConfiguration
    {
        string EventQueueConnectionString { get; set; }
        string EventQueueName { get; set; }
    }

    public class CoreConfiguration: ConfigurationSection, ICoreConfiguration
    {

        [ConfigurationProperty("eventQueueConnectionString")]
        public string EventQueueConnectionString
        {
            get { return (string)this["eventQueueConnectionString"]; }
            set { this["eventQueueConnectionString"] = value; }
        }

        [ConfigurationProperty("eventQueueName")]
        public string EventQueueName
        {
            get { return (string)this["eventQueueName"]; }
            set { this["eventQueueName"] = value; }
        }

        public static ICoreConfiguration Config
        {
            get { return ConfigurationManager.GetSection("coreConfiguration") as ICoreConfiguration; }
        }
    }
}
