using System;
using System.Collections.Generic;
using ContactService.Data.Helpers;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using static ContactService.Constants;

namespace ContactService.Model
{
    [SoftDelete("IsDeleted")]
    public class Session: ILoggable
    {
        public int Id { get; set; }
        
		[ForeignKey("Tenant")]
        public int? TenantId { get; set; }
        
        public string AccessToken { get; set; }

        public DateTimeOffset? StartedOn { get; set; }
        
        public DateTimeOffset? ExpiresOn { get; set; } 

		public DateTime CreatedOn { get; set; }
        
		public DateTime LastModifiedOn { get; set; }
        
		public string CreatedBy { get; set; }
        
		public string LastModifiedBy { get; set; }
        
		public bool IsDeleted { get; set; }

        public virtual Tenant Tenant { get; set; }
    }
}
