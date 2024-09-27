import Student from "../models/studentModel.js";

export const submitAssignment = async (req, res) => {
  const { studentId } = req.params; 
  const { title, description } = req.body; 

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const newAssignment = { title, description };
    student.assignments.push(newAssignment); 
    await student.save(); 

    res.status(201).json(newAssignment); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
