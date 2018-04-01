using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Spiral.Models
{
    public class SpiralUser
    {
        public int ID { set; get; }
        public string Email { set; get; }
        public string Passwrd { set; get; }
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string PhotoPath { set; get; }
        public int RoleOfUser  { set; get; }//можно будет заменить на enum
    }
}