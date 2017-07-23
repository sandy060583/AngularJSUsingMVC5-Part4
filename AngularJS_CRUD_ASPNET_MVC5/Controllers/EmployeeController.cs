using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularJS_CRUD_ASPNET_MVC5.Models;

namespace AngularJS_CRUD_ASPNET_MVC5.Controllers
{
    public class EmployeeController : Controller
    {
        // GET Employee/GetEmployee
        [HttpGet]
        public JsonResult GetEmployee()
        {
            using (LearningDBEntities db = new LearningDBEntities())
            {
                List<Employee> empList = db.Employees.ToList();
                return Json(empList, JsonRequestBehavior.AllowGet);
            }

        }

        //POST Employee/AddEmployee  
        [HttpPost]
        public JsonResult Insert(Employee employee)
        {
            if (employee != null)
            {
                using (LearningDBEntities db = new LearningDBEntities())
                {
                    db.Employees.Add(employee);
                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
            else
            {
                return Json(new { success = false });
            }
        }


        //POST Employee/Update     
        [HttpPost]
        public JsonResult Update(Employee updatedEmployee)
        {
            using (LearningDBEntities db = new LearningDBEntities())
            {
                Employee existingEmployee = db.Employees.Find(updatedEmployee.EmpID);
                if (existingEmployee == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    existingEmployee.EmpName = updatedEmployee.EmpName;
                    existingEmployee.DeptName = updatedEmployee.DeptName;
                    existingEmployee.Email = updatedEmployee.Email;
                    existingEmployee.Designation = updatedEmployee.Designation;
                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
        }

        //POST Employee/Delete/1
        [HttpPost]
        public JsonResult Delete(int id)
        {
            using (LearningDBEntities db = new LearningDBEntities())
            {
                Employee employee = db.Employees.Find(id);
                if (employee == null)
                {
                    return Json(new { success = false });
                }
                db.Employees.Remove(employee);
                db.SaveChanges();
                return Json(new { success = true });
            }

        }
    }
}