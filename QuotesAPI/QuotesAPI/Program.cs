using Microsoft.EntityFrameworkCore;
using QuotesAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder => builder
            .WithOrigins(
                "http://localhost:4200",     // HTTP
                "https://localhost:4200"      // HTTPS
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("Content-Disposition")
            .SetIsOriginAllowed((host) => true)); // More permissive for development
});

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Add database context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Quotes API",
        Version = "v1",
        Description = "An API to manage insurance quotes"
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Quotes API v1");
    c.RoutePrefix = "";
});

// Important: UseCors must come before UseHttpsRedirection
app.UseCors("AllowAngularApp");

// Comment this out temporarily for testing
// app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

app.Run();