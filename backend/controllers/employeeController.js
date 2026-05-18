const Employee = require('../models/Employee');

exports.addEmployee = async (req, res) => {
  try {
    const { name, email, department, skills, performanceScore, experience } = req.body;

    if (performanceScore === undefined) {
       return res.status(400).json({ message: 'Validation error: Missing performance score' });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Error message: Duplicate email' });
    }

    const employee = new Employee({
      name, email, department, skills, performanceScore, experience
    });

    await employee.save();
    res.status(201).json({ message: 'Employee stored successfully', employee });
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.searchEmployee = async (req, res) => {
  try {
    const { department } = req.query;
    let query = {};
    if (department) {
      // Case insensitive search
      query.department = { $regex: new RegExp(department, 'i') };
    }
    const employees = await Employee.find(query);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
       return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
     const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
     if(!employee) return res.status(404).json({message: 'Employee not found'});
     res.json(employee);
  } catch (error) {
     res.status(500).json({ message: 'Server error', error: error.message });
  }
}
