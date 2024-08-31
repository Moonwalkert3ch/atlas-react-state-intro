import { useState, useEffect } from 'react';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');



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

  // sorting courses by colum and ascend and descend onclinck
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortColumn) {
      const firstValue = a[sortColumn];
      const secondValue = b[sortColumn];

      if (typeof firstValue === 'string') {
        // sort strings
        return sortDirection === 'asc'
          ? firstValue.localeCompare(secondValue)
          : secondValue.localeCompare(firstValue);
      } else {
        // sort numbers
        return sortDirection === 'asc' ? firstValue - secondValue : secondValue - firstValue;
      }
    }
    return 0; // makes sure no sorting if not clicked on column
  });

  // column header click handler
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

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
            <th onClick={() =>handleSort('trimester')}>Trimester</th>
            <th onClick={() =>handleSort('courseNumber')}>Course Number</th>
            <th onClick={() =>handleSort('courseName')}>Courses Name</th>
            <th onClick={() =>handleSort('semesterCredits')}>Semester Credits</th>
            <th onClick={() =>handleSort('totalClockHours')}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {sortedCourses.map((course, index) => (
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
