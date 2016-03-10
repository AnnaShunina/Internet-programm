using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace _1lab.Controllers
{
    public class HomeController : Controller
    {
        string f = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data", "data.txt");
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About(string t)
        {
            //ViewBag.Text1 = "Helloy!";
            ViewBag.Message = "Запись в файл";
            var f = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data","data.txt");
            System.IO.File.AppendAllText(f, t + Environment.NewLine);
            
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Чтение из файла";
            ViewBag.myText = System.IO.File.ReadAllLines(f);
            return View();
        }
    }
}