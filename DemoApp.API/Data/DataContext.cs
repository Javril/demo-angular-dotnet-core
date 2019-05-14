using Microsoft.EntityFrameworkCore;
using DemoApp.API.Models;

namespace DemoApp.API.Data
{
    public class DataContext : DbContext
    {
       public  DataContext(DbContextOptions<DataContext> options) : base (options) {}

       public DbSet<Value> Values { get; set; }
    }
}