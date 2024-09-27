import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; 

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};

export const registerUser = async (name, email, password, role) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/register`,
      {
        name: name,
        email: email,
        password: password,
        role: role,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};

export const getCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/courses`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting courses", error);
    throw error;
  }
};

export const createCourse = async (
  title,
  description,
  assignedTeacher,
  duration
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/courses`,
      {
        title: title,
        description: description,
        assignedTeacher: assignedTeacher,
        duration: duration,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating course", error);
    throw error;
  }
};

export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/courses/${courseId}`,
      courseData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating course", error);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/courses/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting course", error);
    throw error;
  }
};
