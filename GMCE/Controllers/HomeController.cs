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

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(UserProfile objUser)
        {
            if (ModelState.IsValid)
            {
                using (GMCEEntities db = new GMCEEntities())
                {
                    var obj = db.UserProfiles.Where(a => a.UserName.Equals(objUser.UserName) && a.Password.Equals(objUser.Password)).FirstOrDefault();
                    if (obj != null)
                    {
                        Session["UserID"] = obj.UserId.ToString();
                        Session["UserName"] = obj.UserName.ToString();
                        return RedirectToAction("Index");
                    }
                }
            }
            return View(objUser);
        }
        public ActionResult Index()
        {
            if (Session["UserID"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }

        public ActionResult StudentList()
        {
            if (Session["UserID"] != null)
            {                
                    return View();                                                                 
            }
            else
            {
                return RedirectToAction("Login");
            }
        }

        public ActionResult Receipt()
        {
            if (Session["UserID"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }

        public ActionResult CollectionReport()
        {
            if (Session["UserID"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }

        public ActionResult OutstandingReport()
        {
            if (Session["UserID"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }

        public JsonResult AbandonSession()
        {
            Session.Abandon();
            return Json(JsonRequestBehavior.AllowGet);
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
                var Data = _context.Receipt_Master.FirstOrDefault(x => x.STDID == isDataExsist.STD_ID);
                if (Data != null)
                {
                    var Due = Convert.ToInt32(isDataExsist.Total_fees) - GetDueFees(isDataExsist.STD_ID);
                    isDataExsist.Due_fees = Due.ToString();
                }
                else {
                    if (std.Total_fees == "0")
                    {
                        isDataExsist.Due_fees = "0";
                    }
                    else {
                        isDataExsist.Due_fees = std.Total_fees;
                    }
                }
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
                return Json(new { data = result }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var lst = _context.Student_Matser.Where(x => x.Status == stdType).ToList();

                return Json(new { data = lst }, JsonRequestBehavior.AllowGet);
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

        public JsonResult GetAllReceiptForFE(string minDate, string maxDate)
        {
            if (minDate != "" && maxDate != null)
            {
                var StartDate = Convert.ToDateTime(minDate);
                var EndDate = Convert.ToDateTime(maxDate);
                var result = _context.GetAllReceipt().Where(entry => Convert.ToDateTime(entry.Date) >= StartDate && Convert.ToDateTime(entry.Date) <= EndDate).ToList();
                return Json(new { data = result }, JsonRequestBehavior.AllowGet);
            }
            var Data = _context.GetAllReceipt().ToList();
            return Json(new { data = Data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetReceiptById(int id)
        {
            var data = _context.GetAllReceipt().FirstOrDefault(x => x.ID == id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult IsReceiptNoAlreadyExsist(int no)
        {
            var Id = _context.Receipt_Master.FirstOrDefault(x => x.Receipt_No == no);
            var msg = 1;
            if (Id != null)
            {
                msg = 0;
            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EditReceipt(int id, Receipt_Master std)
        {
            var isDataExsist = _context.Receipt_Master.FirstOrDefault(x => x.ID == id);
            if (isDataExsist != null)
            {
                isDataExsist.Receipt_No = std.Receipt_No;
                isDataExsist.STDID = std.STDID;
                isDataExsist.Date = std.Date;
                isDataExsist.PaidFess = std.PaidFess;
                isDataExsist.FessInWords = std.FessInWords;
                isDataExsist.Payment_type = std.Payment_type;

                var Data = _context.Student_Matser.FirstOrDefault(x => x.STD_ID == isDataExsist.STDID);
                if (Data != null)
                {
                    var Due = Convert.ToInt32(Data.Total_fees) - GetDueFees(isDataExsist.STDID);
                    Data.Due_fees = Due.ToString();
                }
                _context.SaveChanges();
            }
            return Json(JsonRequestBehavior.AllowGet);
        }

        public int GetDueFees(String stdid)
        {
            var DuesFee = _context.Receipt_Master.Where(x => x.STDID == stdid).ToList();
            var Total = 0;
            if (DuesFee != null)
            {

                for (int i = 0; i < DuesFee.Count; i++)
                {
                    Total += Convert.ToInt32(DuesFee[i].PaidFess);
                }
            }
            return Total;
        }

        public JsonResult GetOutStandingReport(string minDate, string maxDate)
        {

            if (minDate != "" && maxDate != "")
            {
                var StartDate = Convert.ToDateTime(minDate);
                var EndDate = Convert.ToDateTime(maxDate);
                var result = _context.Student_Matser.Where(x => x.Status == "RUNNING").Where(x => x.Due_fees != "0").Where(entry => entry.Registration_date >= StartDate && entry.Registration_date <= EndDate).ToList();
                return Json(new { data = result }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var lst = _context.Student_Matser.Where(x => x.Due_fees != "0").Where(x => x.Status == "RUNNING").ToList();

                return Json(new { data = lst }, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult RemoveStudent(int id)
        {
            var data = _context.Student_Matser.FirstOrDefault(x => x.ID == id);
            _context.Student_Matser.Remove(data);
            _context.SaveChanges();
            return Json(JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveReceipt(int id)
        {
            var data = _context.Receipt_Master.FirstOrDefault(x => x.ID == id);
            var studentdata = _context.Student_Matser.FirstOrDefault(x => x.STD_ID == data.STDID);
            if (studentdata != null && data != null)
            {
                var duefee = Convert.ToInt32(studentdata.Due_fees) + Convert.ToInt32(data.PaidFess);
                studentdata.Due_fees = duefee.ToString();
            }
            _context.Receipt_Master.Remove(data);
            _context.SaveChanges();
            return Json(JsonRequestBehavior.AllowGet);
        }
    }
}