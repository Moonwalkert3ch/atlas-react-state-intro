import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import { createContext, useState } from "react";


export const AppContext = createContext();

export default function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // handles enrolled courses
const enrollCourse = (course) => {
  setEnrolledCourses((prevCourses) => {
    if (!prevCourses.some((c) => c.courseNumber === course.courseNumber)) {
      return [...prevCourses, course];
    }
    return prevCourses;
  });
};

// handle dropping courses
const dropCourse = (courseNumber) => {
  setEnrolledCourses((prevCourses) => 
    prevCourses.filter((course) => course.courseNumber !== courseNumber)
);
};

  return (
    <AppContext.Provider value={{ enrolledCourses, enrollCourse, dropCourse }}>
    <div>
      <Header />
      <SchoolCatalog />
      <ClassSchedule />
    </div>
    </AppContext.Provider>
  );
}
