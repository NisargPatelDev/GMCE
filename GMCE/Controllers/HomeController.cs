using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GMCE.Models;

namespace GMCE.Controllers
{
    public class HomeController : Controller
    {
        private readonly GMCEEntities _context = null;
        public HomeController()
        {
            _context = new GMCEEntities();
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult StudentList()
        {
            return View();
        }
        public JsonResult RegisterStudent(Student_Matser std)
        {
            var msg = "";
            var stdid = _context.Student_Matser.FirstOrDefault(x => x.STD_ID == std.STD_ID);
            if (stdid == null)
            {
                msg = "1";
                _context.Student_Matser.Add(std);
                _context.SaveChanges();
                return Json(msg, JsonRequestBehavior.AllowGet);
            }
            else
            {
                msg = "0";
                return Json(msg, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult GetStdId()
        {
            var maxid = _context.Student_Matser.OrderByDescending(x => x.ID).FirstOrDefault().STD_ID;
            return Json(maxid, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStudentList(string minDate, string maxDate)
        {

            if (minDate != "" && maxDate != "")
            {
                var StartDate = Convert.ToDateTime(minDate);
                var EndDate = Convert.ToDateTime(maxDate);
                var result = _context.Student_Matser.Where(entry => entry.Registration_date >= StartDate && entry.Registration_date <= EndDate).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else {
                var lst = _context.Student_Matser.ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }                          
           
        }

        public JsonResult ChangeStudentStatus(int id,string status)
        {
            var data = _context.Student_Matser.FirstOrDefault(x => x.ID == id);
            if (data != null)
            {
                data.Status = status;
                _context.SaveChanges();
            }
            return Json(JsonRequestBehavior.AllowGet);
        }

        

    }
}