const Employee = require('../models/employeer');
const Notifications = require('../models/notificationModel');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    const notification = await Notifications({
      title: 'Seeing Employees',
      time: new Date().toLocaleTimeString(),
      discription: 'User are Seeing Employees Data.',
      mark: false,  
      today: new Date().toLocaleDateString(),
      type: "Document"
    });
    await notification.save();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

// Add new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, companyName, phone, address } = req.body;
    const employee = new Employee({
      name,
      companyName,
      phone,
      address
    });
    await employee.save();
    const notification = await Notifications({
      title: 'New Employees are Added',
      time: new Date().toLocaleTimeString(),
      discription: 'New Employees has been added.',
      mark: false,  
      today: new Date().toLocaleDateString(),
      type: "Document"
    });
    await notification.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(400).json({ message: 'Error adding employee', error: error.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, companyName, phone, address } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, companyName, phone, address },
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const notification = await Notifications({
      title: 'Employees Updated',
      time: new Date().toLocaleTimeString(),
      discription: 'Employees Data are Updated',
      mark: false,  
      today: new Date().toLocaleDateString(),
      type: "Document"
    });
    await notification.save();
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: 'Error updating employee', error: error.message });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const notification = await Notifications({
      title: 'Employees Deleted',
      time: new Date().toLocaleTimeString(),
      discription: 'Employees Data has been Deleted.',
      mark: false,  
      today: new Date().toLocaleDateString(),
      type: "Document"
    });
    await notification.save();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting employee', error: error.message });
  }
};

// Open position endpoint (modified to remove position reference)
exports.openPosition = async (req, res) => {
  try {
    const employees = await Employee.find();
    
    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: 'No employees found' });
    }

    const employeeCount = employees.length;

    res.status(200).json({
      message: 'Employees retrieved successfully',
      count: employeeCount,
      employees: employees
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching employees', 
      error: error.message 
    });
  }
};