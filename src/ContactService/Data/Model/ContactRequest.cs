using System;
using System.Collections.Generic;
using ContactService.Data.Helpers;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContactService.Data.Model
{
    [SoftDelete("IsDeleted")]
    public class ContactRequest: ILoggable
    {
        public int Id { get; set; }
        
		[ForeignKey("Tenant")]
        public int? TenantId { get; set; }
        
		[Index("NameIndex", IsUnique = false)]
        [Column(TypeName = "VARCHAR")]        
		public string Name { get; set; }

        public string Email { get; set; }

        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }
        
		public DateTime LastModifiedOn { get; set; }
        
		public string CreatedBy { get; set; }
        
		public string LastModifiedBy { get; set; }
        
		public bool IsDeleted { get; set; }

        public virtual Tenant Tenant { get; set; }
    }
}
