namespace API.Data.Dtos.Restaurants
{
    public record RestaurantDto(int Id, string Name, string Description, string PhoneNumber, double Rating, DateTime CreationDate);
    public record CreateRestaurantDto(string Name, string Description, string PhoneNumber, double Rating);

}
