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

        public ActionResult Receipt()
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

        public JsonResult EditStudent(int id, Student_Matser std)
        {
            var isDataExsist = _context.Student_Matser.FirstOrDefault(x => x.ID == id);
            if (isDataExsist != null)
            {
                isDataExsist.Registration_date = std.Registration_date;
                isDataExsist.Start_date = std.Start_date;
                isDataExsist.STD_ID = std.STD_ID;
                isDataExsist.Student_name = std.Student_name;
                isDataExsist.Cource = std.Cource;
                isDataExsist.Student_mobile = std.Student_mobile;
                isDataExsist.Parents_mobile = std.Parents_mobile;
                isDataExsist.Total_fees = std.Total_fees;
                isDataExsist.Fees_Payment = std.Fees_Payment;
                isDataExsist.DOB = std.DOB;
                isDataExsist.Age = std.Age;
                isDataExsist.Gender = std.Gender;
                _context.SaveChanges();
            }
            return Json(JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStdId()
        {
            var maxid = _context.Student_Matser.OrderByDescending(x => x.ID).FirstOrDefault().STD_ID;
            return Json(maxid, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStudentList(string minDate, string maxDate, string stdType)
        {

            if (minDate != "" && maxDate != "")
            {
                var StartDate = Convert.ToDateTime(minDate);
                var EndDate = Convert.ToDateTime(maxDate);
                var result = _context.Student_Matser.Where(x => x.Status == stdType).Where(entry => entry.Registration_date >= StartDate && entry.Registration_date <= EndDate).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var lst = _context.Student_Matser.Where(x => x.Status == stdType).ToList();

                return Json(lst, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult ChangeStudentStatus(int id, string status)
        {
            var data = _context.Student_Matser.FirstOrDefault(x => x.ID == id);
            if (data != null)
            {
                data.Status = status;
                _context.SaveChanges();
            }
            return Json(JsonRequestBehavior.AllowGet);
        }

        public JsonResult MoveStudent(int id, string moveTo)
        {

            var data = _context.Student_Matser.FirstOrDefault(x => x.ID == id);
            if (data != null)
            {
                data.Status = moveTo;
                _context.SaveChanges();
            }
            return Json(JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStudentById(int id)
        {
            return Json(_context.Student_Matser.FirstOrDefault(x => x.ID == id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult IsStudentIdAlreadyExsist(string id)
        {
            var Id = _context.Student_Matser.FirstOrDefault(x => x.STD_ID == id);
            var msg = 1;
            if (Id != null)
            {
                msg = 0;
            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStudentBySTDID(string id)
        {
            var Data = _context.Student_Matser.FirstOrDefault(x => x.STD_ID == id);
            if (Data == null)
            {
                return Json("null", JsonRequestBehavior.AllowGet);
            }
            return Json(Data, JsonRequestBehavior.AllowGet);

        }

        public JsonResult AddReciept(Receipt_Master Rec)
        {
            var isReceiptExist = _context.Receipt_Master.FirstOrDefault(x => x.Receipt_No == Rec.Receipt_No);
            var msg = 0;
            if (isReceiptExist == null)
            {
                msg = 1;
                _context.Receipt_Master.Add(Rec);               
                var DuesFee = _context.Student_Matser.FirstOrDefault(x => x.STD_ID == Rec.STDID);
                if (DuesFee != null)
                {
                    var Due = Convert.ToInt32(DuesFee.Due_fees) - Convert.ToInt32(Rec.PaidFess);
                    DuesFee.Due_fees = Due.ToString();                     
                }
                _context.SaveChanges();
            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllReceipt()
        {
            var Data = _context.GetAllReceipt().ToList();
            return Json(new { data = Data}, JsonRequestBehavior.AllowGet);
        }

    }
}