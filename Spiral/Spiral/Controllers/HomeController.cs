using Spiral.Models;
using System.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Security.Cryptography;
using System.Text;
using System.IO;

namespace Spiral.Controllers
{
    public class HomeController : Controller
    {
        static SpiralContext data = new SpiralContext();

        int IdAutoIncrement = 1;

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            return View();
        }


        [HttpPost]
        public ActionResult Auentification(string Email, string Password)//временный метода авторизации без валидации и прочего, позже заменить на встроенный
        {
            Password = PasswordToMD5(Password);
            SpiralUser OldUser = data.SpiralUsers.FirstOrDefault(x => x.Email == Email && x.Passwrd == Password);

            return Json(OldUser);
        }



        string PasswordToMD5(string Password)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(Password));

                StringBuilder sBuilder = new StringBuilder();
                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }
                return sBuilder.ToString();
            }
        }



        public ActionResult GetSpiralUser()
        {
            return Json(data.SpiralUsers, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult AddSpiralUser(SpiralUser user, HttpPostedFileBase img)//HttpPostedFileBase uploaded file from input file form
        {
            if (img != null)
            {
                string pathOfAvatars = @"C:\Users\user\Desktop\Spiral\Spiral\images\";
                img.SaveAs(pathOfAvatars + img.FileName);
                //user.PhotoPath = pathOfAvatars + img.FileName;
                user.PhotoPath = "/images/" + img.FileName;
            }
            else
                user.PhotoPath = "/images/Default.png";

            user.Passwrd = PasswordToMD5(user.Passwrd);
            IdAutoIncrement = data.SpiralUsers.Count() + 1;//autoincrement
            user.ID = IdAutoIncrement;
            data.SpiralUsers.Add(user);
            data.SaveChanges();
            return Json(user);
        }


        [HttpDelete]
        public ActionResult DeleteSpiralUser(int id)
        {
            SpiralUser user = data.SpiralUsers.FirstOrDefault(x => x.ID == id);
            if (user != null)
            {
                data.SpiralUsers.Remove(user);
                data.SaveChanges();
                return Json(user);
            }
            return HttpNotFound();
        }


        [HttpPost]
        public ActionResult EditSpiralUser(SpiralUser newUser, HttpPostedFileBase img)
        {
            SpiralUser OldUser = data.SpiralUsers.FirstOrDefault(x => x.ID == newUser.ID);
            if (OldUser != null)
            {
                if (img != null)
                {
                    string pathOfAvatars = @"C:\Users\user\Desktop\Spiral\Spiral\images\";
                    img.SaveAs(pathOfAvatars + img.FileName);
                    //user.PhotoPath = pathOfAvatars + img.FileName;
                    OldUser.PhotoPath = "/images/" + img.FileName;
                }
                else
                    OldUser.PhotoPath = "/images/Default.png";

                OldUser.FirstName = newUser.FirstName;
                OldUser.LastName = newUser.LastName;
                OldUser.Email = newUser.Email;
                if (OldUser.Passwrd != newUser.Passwrd)
                    OldUser.Passwrd = PasswordToMD5(newUser.Passwrd);
                OldUser.RoleOfUser = newUser.RoleOfUser;
                data.SaveChanges();
            }
            return Json(OldUser);

        }


        public ActionResult getCourses()
        {
            data.SaveChanges();
            return Json(data.Courses, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult addCourse(Course cours, HttpPostedFileBase[] files)
        {

            if (files != null)
            {
                string pathOfFiles = @"C:\Users\user\Desktop\Spiral\Spiral\files\";//+ cours.EditTitle + @"\";// @"C:\Users\VLAD\Desktop\Spiral\Spiral\files\"
               // Directory.CreateDirectory(pathOfFiles);
                for (int i = 0; i < files.Length; i++)
                    files[i].SaveAs(pathOfFiles + files[i].FileName);
                cours.pathToFiles = "/files/";// + cours.EditTitle + @"/";
            }



            IdAutoIncrement = data.Courses.Count() + 1;//autoincrement
            cours.ID = IdAutoIncrement;
            data.Courses.Add(cours);
            data.SaveChanges();
            return Json(cours);
        }

        [HttpPost]
        public ActionResult editCourse(Course newcours, HttpPostedFileBase[] files)
        {
            Course OldCourse = data.Courses.FirstOrDefault(x => x.ID == newcours.ID);
            if (OldCourse != null)
            {
                if (files != null)
                {
                    string pathOfFiles = @"C:\Users\user\Desktop\Spiral\Spiral\files\";//@"C:\Users\VLAD\Desktop\Spiral\Spiral\files\"  //+ OldCourse.EditTitle + @"\";
                    //Directory.CreateDirectory(pathOfFiles);
                    for (int i = 0; i < files.Length; i++)
                        files[i].SaveAs(pathOfFiles + files[i].FileName);
                    OldCourse.pathToFiles = "/files/"; //+ OldCourse.EditTitle + @"/";
                }

                OldCourse.SelectedType = newcours.SelectedType;
                OldCourse.isOutdoor = newcours.isOutdoor;
                OldCourse.isScience = newcours.isScience;
                OldCourse.isRelations = newcours.isRelations;
                OldCourse.isNewTheme = newcours.isNewTheme;
                OldCourse.isPublicTheme = newcours.isPublicTheme;
                OldCourse.EditTitle = newcours.EditTitle;
                OldCourse.EditSubtitle = newcours.EditSubtitle;
                OldCourse.WHO = newcours.WHO;
                OldCourse.WHY = newcours.WHY;
                OldCourse.WHAT = newcours.WHAT;
                OldCourse.PurposeGoal = newcours.PurposeGoal;
                OldCourse.LearningContent = newcours.LearningContent;
                OldCourse.Activities = newcours.Activities;
                OldCourse.LearningCourse = newcours.LearningCourse;
                OldCourse.LearningGoals = newcours.LearningGoals;
                OldCourse.pathToFiles = newcours.pathToFiles;
                data.SaveChanges();
            }
            return Json(OldCourse);

        }
        [HttpDelete]
        public ActionResult deleteCourse(int id)
        {
            Course course = data.Courses.FirstOrDefault(x => x.ID == id);
            if (course != null)
            {
                data.Courses.Remove(course);
                data.SaveChanges();
                return Json(course);
            }
            return HttpNotFound();
        }

        [HttpPost]
        public ActionResult editCourseType(int ID, int SelectedType)
        {
            Course OldCourse = data.Courses.FirstOrDefault(x => x.ID == ID);

            OldCourse.SelectedType = SelectedType;
            data.SaveChanges();

            return Json(OldCourse);
        }

        public ActionResult GetFiles()
        {
            string pathOfFiles = @"C:\Users\user\Desktop\Spiral\Spiral\files\";//+ "Edit Title" + @"\";//@"C:\Users\VLAD\Desktop\Spiral\Spiral\files\"  // OldCourse.EditTitle
            string[] filesName = Directory.GetFiles(pathOfFiles);
            //List<Uri> uri = new List<Uri>();
            for (int i = 0; i < filesName.Length; i++)
                filesName[i] =@"/files/" + Path.GetFileName(filesName[i]);//+ "Edit Title/" 
                //uri.Add(new Uri(filesName[i]));
            return Json(filesName, JsonRequestBehavior.AllowGet);
        }

        [HttpDelete]
        public ActionResult DeleteFile( string file)
        {
                if (file != null)
                {
                    string pathOfFiles = @"C:\Users\user\Desktop\Spiral\Spiral\files\";//@"C:\Users\VLAD\Desktop\Spiral\Spiral\files\"  //+ OldCourse.EditTitle + @"\";
                int start = file.LastIndexOf(@"/");                                                      //Directory.CreateDirectory(pathOfFiles);
                file = file.Substring(start+1, file.Length- start-1);
                        System.IO.File.Delete(pathOfFiles + file);
                }
            return Json(null);

        }

    }
}






//axios