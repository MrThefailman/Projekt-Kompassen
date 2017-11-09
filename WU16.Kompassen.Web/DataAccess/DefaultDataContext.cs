using System.Data.Entity;
using WU16.Kompassen.Web.Models;

namespace WU16.Kompassen.Web.DataAccess
{
    public class DefaultDataContext : DbContext
    {
        public DefaultDataContext() : base("Kompassen") { }
        public DbSet<Student> Students { get; set; }

        public DbSet<Course> Courses { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}