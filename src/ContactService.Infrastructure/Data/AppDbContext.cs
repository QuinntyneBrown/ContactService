using System.Threading;
using System.Threading.Tasks;
using ContactService.Core.Interfaces;
using ContactService.Core.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ContactService.Infrastructure.Data
{
    public class AppDbContext : DbContext, IAppDbContext
    {
        public AppDbContext(DbContextOptions options)
            :base(options) { }

        public DbSet<StoredEvent> StoredEvents { get; set; }
    }
}
