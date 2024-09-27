import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../api/courseApi";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    assignedTeacher: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);

  const loadCourses = async () => {
    try {
      const courseList = await fetchCourses();
      setCourses(courseList);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddCourse = async () => {
    try {
      const addedCourse = await addCourse(newCourse);
      setCourses([...courses, addedCourse]);
      resetForm();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const updatedData = await updateCourse(currentCourseId, newCourse);
      setCourses(
        courses.map((course) =>
          course._id === currentCourseId ? updatedData : course
        )
      );
      resetForm();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id);
      setCourses(courses.filter((course) => course._id !== id)); // Remove deleted course from state
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const resetForm = () => {
    setNewCourse({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      assignedTeacher: "",
    });
    setIsModalOpen(false);
    setEditMode(false);
    setCurrentCourseId(null);
  };

  const openEditModal = (course) => {
    setNewCourse(course);
    setIsModalOpen(true);
    setEditMode(true);
    setCurrentCourseId(course._id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Management</h2>
      <button
        onClick={() => {
          resetForm();
          setIsModalOpen(true);
        }}
        className="bg-blue-500 text-white p-2 mb-4"
      >
        Add Course
      </button>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border">Title</th>
            <th className="border">Description</th>
            <th className="border">Start Date</th>
            <th className="border">End Date</th>
            <th className="border">Assigned Teacher</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td className="border">{course.title}</td>
              <td className="border">{course.description}</td>
              <td className="border">{course.startDate}</td>
              <td className="border">{course.endDate}</td>
              <td className="border">{course.assignedTeacher}</td>
              <td className="border">
                <button
                  onClick={() => openEditModal(course)}
                  className="bg-yellow-500 text-white p-1 mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing Course */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={resetForm}
        contentLabel={editMode ? "Edit Course" : "Add Course"}
        ariaHideApp={false}
        className="max-w-lg mx-auto my-8 p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {editMode ? "Edit Course" : "Add New Course"}
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Course Description"
            value={newCourse.description}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            name="startDate"
            value={newCourse.startDate}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            name="endDate"
            value={newCourse.endDate}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="assignedTeacher"
            placeholder="Assigned Teacher"
            value={newCourse.assignedTeacher}
            onChange={handleInputChange}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={editMode ? handleUpdateCourse : handleAddCourse}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              {editMode ? "Update Course" : "Add Course"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CourseManagement;
