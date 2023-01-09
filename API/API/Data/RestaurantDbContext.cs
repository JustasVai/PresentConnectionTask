using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
namespace API.Data
{
    public class RestaurantDbContext : DbContext
    {
        public DbSet<Restaurant> Restaurants { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data source = .; Initial Catalog = Restaurants; Trusted_Connection=SSPI;Encrypt=false;");
        }
    }
}
