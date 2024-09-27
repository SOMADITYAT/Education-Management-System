import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./components/AdminDashboard";
// import TeacherDashboard from "./components/TeacherDashboard";
// import StudentDashboard from "./components/StudentDashboard";
// import CoursesPage from "./pages/CoursesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/teacher/dashboard" element={<TeacherDashboard />} /> */}
        {/* <Route path="/student/dashboard" element={<StudentDashboard />} /> */}
        {/* <Route path="/courses" element={<CoursesPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
