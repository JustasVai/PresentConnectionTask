using API.Data.Dtos.Restaurants;
using API.Data.Entities;
using API.Helpers;
using Microsoft.EntityFrameworkCore;
namespace API.Data.Repositories
{
    public interface IRestaurantsRepository
    {
        Task<Restaurant?> GetRestaurantAsync(int restaurantId);
        Task<IReadOnlyList<Restaurant>> GetAllRestaurantsAsync();
        Task<PagedList<Restaurant>> GetAllRestaurantsAsync(RestaurantFilterParameters restaurantFilterParameters,RestaurantSearchParameters restaurantSearchParameters);
        Task CreateRestaurantAsync(Restaurant restaurant);
    }

    public class RestaurantsRepository : IRestaurantsRepository
    {
        private readonly RestaurantDbContext _restaurantDbContext;

        public RestaurantsRepository(RestaurantDbContext restaurantDbContext)
        {
            _restaurantDbContext = restaurantDbContext;
        }

        public async Task<Restaurant?> GetRestaurantAsync(int restaurantId)
        {
            return await _restaurantDbContext.Restaurants.FirstOrDefaultAsync(o => o.Id == restaurantId);
        }

        public async Task<IReadOnlyList<Restaurant>> GetAllRestaurantsAsync()
        {
            return await _restaurantDbContext.Restaurants.ToListAsync();
        }
        
        public async Task<PagedList<Restaurant>> GetAllRestaurantsAsync(RestaurantFilterParameters restaurantFilterParameters,RestaurantSearchParameters restaurantSearchParameters)
        {
            var queryable = _restaurantDbContext.Restaurants.AsQueryable();
            
            if (!string.IsNullOrEmpty(restaurantFilterParameters.Name))
            {
                queryable = queryable.Where(x => x.Name.Contains(restaurantFilterParameters.Name));
            }
            if (!string.IsNullOrEmpty(restaurantFilterParameters.Description))
            {
                queryable = queryable.Where(x => x.Description.Contains(restaurantFilterParameters.Description));
            }
            if (!string.IsNullOrEmpty(restaurantFilterParameters.PhoneNumber))
            {
                queryable = queryable.Where(x => x.PhoneNumber.Contains(restaurantFilterParameters.PhoneNumber));
            }

            return await PagedList<Restaurant>.CreateAsync(queryable, restaurantSearchParameters.PageNumber,
                restaurantSearchParameters.PageSize);
        }

        public async Task CreateRestaurantAsync(Restaurant restaurant)
        {
            _restaurantDbContext.Restaurants.Add(restaurant);
            await _restaurantDbContext.SaveChangesAsync();
        }
    }
}
