using API.Data.Dtos.Restaurants;
using API.Data.Entities;
using API.Helpers;
using Microsoft.EntityFrameworkCore;
namespace API.Data.Repositories
{
    public interface IRestaurantsRepository
    {
        Task<Restaurant?> GetAsync(int restaurantId);
        Task<IReadOnlyList<Restaurant>> GetAllAsync();
        Task<PagedList<Restaurant>> GetAllAsync(RestaurantSearchParameters restaurantSearchParameters);
        Task CreateAsync(Restaurant restaurant);
    }

    public class RestaurantsRepository : IRestaurantsRepository
    {
        private readonly RestaurantDbContext _restaurantDbContext;

        public RestaurantsRepository(RestaurantDbContext restaurantDbContext)
        {
            _restaurantDbContext = restaurantDbContext;
        }

        public async Task<Restaurant?> GetAsync(int restaurantId)
        {
            return await _restaurantDbContext.Restaurants.FirstOrDefaultAsync(o => o.Id == restaurantId);
        }

        public async Task<IReadOnlyList<Restaurant>> GetAllAsync()
        {
            return await _restaurantDbContext.Restaurants.ToListAsync();
        }
        
        public async Task<PagedList<Restaurant>> GetAllAsync(RestaurantSearchParameters restaurantSearchParameters)
        {
            var queryable = _restaurantDbContext.Restaurants.AsQueryable().OrderBy(o => o.CreationDate);

            return await PagedList<Restaurant>.CreateAsync(queryable, restaurantSearchParameters.PageNumber,
                restaurantSearchParameters.PageSize);
        }

        public async Task CreateAsync(Restaurant restaurant)
        {
            _restaurantDbContext.Restaurants.Add(restaurant);
            await _restaurantDbContext.SaveChangesAsync();
        }
    }
}
