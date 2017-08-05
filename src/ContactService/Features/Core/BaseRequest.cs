using System;

namespace ContactService.Features.Core
{
    public class BaseRequest 
    {
        public Guid TenantUniqueId { get; set; }
    }
}