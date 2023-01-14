using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
namespace API.Data
{
    public class RestaurantDbContext : DbContext
    {
        public DbSet<Restaurant> Restaurants { get; set; }

        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                "Server=db;Database=master;User=sa; Password =Justas1234567!;");
        }*/
        public RestaurantDbContext(DbContextOptions<RestaurantDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
