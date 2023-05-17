const employeeRouter = require('express').Router();
const fs = require('fs');
const fileUpload = require("./fileUpload");
require('dotenv').config();
const empFile = process.env.EMP_FILE;

//get all
employeeRouter.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(empFile));
    res.json(data);
})

//get by empid
employeeRouter.get('/:emp_id', (req, res) => {
    const empId = req.params.emp_id;
    const data = JSON.parse(fs.readFileSync(empFile));
    const getEmployee = data.find((emp) => emp.emp_id === empId);
    if (getEmployee) {
        res.json(getEmployee);
    } else {
        res.status(404).json({ error: "Employeee not Found..!!!" })
    }
})

//create emplyee details
employeeRouter.post('/', fileUpload.singleUpload, async (req, res) => {
    console.log('bcejebcjbhbhcbdhcbh------');
    const { emp_id, emp_name, emp_email, emp_department, emp_joining_date } = req.body;
    const emp_profile = req.file.originalname;
    console.log(emp_profile);
    const data = JSON.parse(fs.readFileSync(empFile));
    const newEmpDetails = {
        emp_id,
        emp_name,
        emp_email,
        emp_profile,
        emp_department,
        emp_joining_date
    }
    console.log(newEmpDetails);
    data.push(newEmpDetails);
    fs.writeFileSync(empFile, JSON.stringify(data, null, 2));
    res.json({ message: "New Employee added Successfully...!!", data: newEmpDetails });
})

//update (PUT)
employeeRouter.put('/:emp_id', fileUpload.singleUpload, (req, res) => {
    const empId = req.params.emp_id;
    const { emp_name, emp_email, emp_department, emp_joining_date } = req.body;
    const updateEmp = { emp_name, emp_email, emp_department, emp_joining_date };
    const emp_profile = req.file.originalname;
    const data = JSON.parse(fs.readFileSync(empFile));
    const findEmployeeIndex = data.findIndex((emp) => emp.emp_id === empId);
    if (findEmployeeIndex === -1) {
        res.status(404).json({ message: "Employee not Found..!!" })
    } else {
        data[findEmployeeIndex] = { ...data[findEmployeeIndex], emp_name, emp_email, emp_department, emp_profile, emp_joining_date };
        fs.writeFileSync(empFile, JSON.stringify(data, null, 2))
        res.json(data[findEmployeeIndex]);
    }
})


//delete
employeeRouter.delete('/:emp_id', (req, res) => {
    const empId = req.params.emp_id;
    const data = JSON.parse(fs.readFileSync(empFile));
    const findEmployee = data.find((emp) => emp.emp_id === empId);
    if (findEmployee !== -1) {
        data.splice(findEmployee, 1);
        fs.writeFileSync(empFile, JSON.stringify(data, null, 2));
        res.json({ message: "Emplyee details Deleted successfully!!!" })
    } else {
        res.status(404).json({ error: "Emplyee Not Found !!!!" })
    }
})

module.exports = employeeRouter;