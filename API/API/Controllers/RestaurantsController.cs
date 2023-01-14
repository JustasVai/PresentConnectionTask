using System.Text.Json;
using API.Data;
using API.Data.Dtos.Restaurants;
using API.Data.Entities;
using API.Data.Repositories;
using Microsoft.AspNetCore.Mvc;



namespace API.Controllers
{ 
    /*
  
    /api/v1/restaurants GET List 200
    /api/v1/restaurants/{id} GET One 200
    /api/v1/restaurants POST Create 201
 
    */
    
    [ApiController]
    [Route("api/v1/restaurants")]
    public class RestaurantsController : ControllerBase
    {
        private readonly IRestaurantsRepository _restaurantsRepository;
        
        public RestaurantsController(IRestaurantsRepository restaurantsRepository)
        {
            _restaurantsRepository = restaurantsRepository;
        }
        
        // api/v1/restaurants GET List 200
        //[HttpGet]
        public async Task<IEnumerable<RestaurantDto>>GetRestaurants()
        {
           var restaurants = await _restaurantsRepository.GetAllRestaurantsAsync();
           return restaurants.Select(o => new RestaurantDto(o.Id,o.Name,o.Description,o.PhoneNumber,o.Rating,o.CreationDate));
        }
        
        
        // api/v1/restaurants?pageNumber=1&pageSize=5 GET List 200
        [HttpGet(Name = "GetRestaurants")]
        public async Task<IEnumerable<RestaurantDto>>GetRestaurantsPaging([FromQuery] RestaurantSearchParameters searchParameters)
        {
            var restaurants = await _restaurantsRepository.GetAllRestaurantsAsync(searchParameters);
            var previousPageLink = restaurants.HasPrevious
                ? CreateRestaurantsResourceUri(searchParameters,
                    ResourceUriType.PreviousPage)
                : null;
            var nextPageLink = restaurants.HasNext
                ? CreateRestaurantsResourceUri(searchParameters,
                    ResourceUriType.NextPage)
                : null;
            var paginationMetaData = new
            {
                totalCount = restaurants.TotalCount,
                pageSize = restaurants.PageSize,
                currentPage = restaurants.CurrentPage,
                totalPages = restaurants.TotalPages,
                previousPageLink,
                nextPageLink 
            };
            
            Response.Headers.Add("Pagination",JsonSerializer.Serialize(paginationMetaData));
            
            
            return restaurants.Select(o => new RestaurantDto(o.Id,o.Name,o.Description,o.PhoneNumber,o.Rating,o.CreationDate));
        }

        // api/v1/restaurants/{id} GET One 200
        [HttpGet]
        [Route("{restaurantId}")]
        public async Task<ActionResult<RestaurantDto>> GetRestaurant(int restaurantId)
        {
            var restaurant = await _restaurantsRepository.GetRestaurantAsync(restaurantId);
            if (restaurant == null)
            {
                return NotFound();
            }
            return new RestaurantDto(restaurant.Id,restaurant.Name,restaurant.Description,restaurant.PhoneNumber,restaurant.Rating,restaurant.CreationDate);
        }

        // api/v1/restaurants POST Create 201
        [HttpPost]  
        public async Task<ActionResult<RestaurantDto>>Create(CreateRestaurantDto restaurantDto)
        {
            var restaurant = new Restaurant{Name = restaurantDto.Name,Description = restaurantDto.Description,PhoneNumber = restaurantDto.PhoneNumber,Rating = restaurantDto.Rating,CreationDate = DateTime.UtcNow};
            await _restaurantsRepository.CreateRestaurantAsync(restaurant);
            return Created("", new RestaurantDto(restaurant.Id,restaurant.Name,restaurant.Description,restaurant.PhoneNumber,restaurant.Rating,restaurant.CreationDate));
            /*return CreatedAtAction("GetRestaurant", new { restaurantId = restaurant.Id },new RestaurantDto(restaurant.Name,restaurant.Description,restaurant.PhoneNumber,restaurant.Rating,restaurant.CreationDate));*/
        }

        private string? CreateRestaurantsResourceUri(
            RestaurantSearchParameters restaurantSearchParameters,
            ResourceUriType type)
        {
            return type switch
            {
                ResourceUriType.PreviousPage => Url.Link("GetRestaurants",
                    new
                    {
                        pageNumber = restaurantSearchParameters.PageNumber - 1,
                        pageSize = restaurantSearchParameters.PageSize
                    }),
                ResourceUriType.NextPage => Url.Link("GetRestaurants",
                    new
                    {
                        pageNumber = restaurantSearchParameters.PageNumber + 1,
                        pageSize = restaurantSearchParameters.PageSize
                    }),
                _ => Url.Link("GetRestaurants",
                    new
                    {
                        pageNumber = restaurantSearchParameters.PageNumber,
                        pageSize = restaurantSearchParameters.PageSize
                    })
            };
        }
    }
}
