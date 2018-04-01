using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Spiral.Models
{
    public class SpiralContext: DbContext//   :DbContext
    {
        public SpiralContext() : base("SpiralContext")
        {
        }
        public DbSet<SpiralUser> SpiralUsers { get; set; }
        public DbSet<Course> Courses { get; set; }
    }
}