using API.Data;
using API.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<RestaurantDbContext>();
builder.Services.AddTransient<IRestaurantsRepository, RestaurantsRepository>();
var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();