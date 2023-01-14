using API.Data;
using API.Data.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").AllowAnyHeader()
                .AllowAnyMethod().WithExposedHeaders("Pagination");
        });
});
builder.Services.AddControllers();
builder.Services.AddDbContext<RestaurantDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddTransient<IRestaurantsRepository, RestaurantsRepository>();
var app = builder.Build();

app.UseCors();
app.UseRouting();
app.MapControllers();

app.Run();
