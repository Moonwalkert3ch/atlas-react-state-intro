import { useState, useEffect } from 'react';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState('');


  useEffect(() => {
    fetch('/api/courses.json')
      .then((response) => response.json())
      .then ((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses data:', error));
  }, []);

  // filter the courses by search input field entry
  const filteredCourses = courses.filter((course) => 
    course.courseNumber.toLowerCase().includes(searchInput.toLowerCase()) ||
    course.courseName.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
      <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
       type="text"
       placeholder="Search"
       value={searchInput}
       onChange={(e) => setSearchInput(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
              <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>  
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
