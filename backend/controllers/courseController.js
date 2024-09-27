import Course from "../models/CourseModel.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("assignedTeacher", "name");
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "assignedTeacher",
      "name"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCourse = async (req, res) => {
  const { title, description, assignedTeacher, duration } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      assignedTeacher,
      duration,
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCourse = async (req, res) => {
  const { title, description, assignedTeacher, duration } = req.body;

  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, assignedTeacher, duration },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
