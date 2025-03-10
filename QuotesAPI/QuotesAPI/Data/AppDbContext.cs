using Microsoft.EntityFrameworkCore;
using QuotesAPI.Models;

namespace QuotesAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Quote> Quotes { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data
            modelBuilder.Entity<Quote>().HasData(
                new Quote
                {
                    no = 1,
                    quoteType = "Auto",
                    description = "This is auto insurance",
                    sales = "John",
                    dueDate = new DateTime(2010, 1, 1),
                    premium = 240.00M
                },
                new Quote
                {
                    no = 2,
                    quoteType = "Auto",
                    description = "This is auto insurance",
                    sales = "John",
                    dueDate = new DateTime(2010, 1, 1),
                    premium = 240.00M
                },
                new Quote
                {
                    no = 3,
                    quoteType = "Auto",
                    description = "This is auto insurance",
                    sales = "Mary",
                    dueDate = new DateTime(2011, 1, 1),
                    premium = 300.00M
                },
                new Quote
                {
                    no = 4,
                    quoteType = "House",
                    description = "This is house insurance",
                    sales = "John",
                    dueDate = new DateTime(2013, 1, 1),
                    premium = 116.00M
                }
            );
        }
    }
}