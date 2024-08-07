import { useState, useEffect } from "react";

const Course = () => {
  const [course, setCourse] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    sortBy: "",
    sortOrder: "asc",
    search: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const res = await fetch(`http://localhost:4000/courses/getcourse?${queryParams}`);
        const data = await res.json(); // Correctly parse the response
        setCourses(data); // Set the fetched courses directly to the state
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const handleImageChange = (e) => {
    setCourse((prevCourse) => ({ ...prevCourse, image: e.target.files[0] }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in course) {
      formData.append(key, course[key]);
    }
    try {
      const res = await fetch("http://localhost:4000/courses/createcourse", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to create course");
      }
      const result = await res.json();
      console.log("Result", result);
      // Optionally, you can refresh the course list after adding a new course
      setCourse({
        title: "",
        price: "",
        category: "",
        description: "",
        image: null,
      });
      setFilters({ ...filters, search: "" }); // Reset search filters
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex w-full">
      {/* Sidebar for Filters */}
      <aside className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border p-2 mb-2 w-full"
        />
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="border p-2 mb-2 w-full"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
        <select
          name="sortOrder"
          value={filters.sortOrder}
          onChange={handleFilterChange}
          className="border p-2 mb-2 w-full"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={filters.search}
          onChange={handleFilterChange}
          className="border p-2 mb-4 w-full"
        />
      </aside>

      {/* Main Content Area */}
      <main className="w-3/4 p-4">
        {/* Create Course Section */}
        <section className="mb-6">
          <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Add Course</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={course.title}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={course.price}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={course.category}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={course.description}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="border p-2 mb-4 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Add Course
            </button>
          </form>
        </section>

        {/* Courses List */}
        <section>
  <h2 className="text-xl font-semibold mb-4">Courses</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {courses.length > 0 ? (
      courses.map((course, index) => (
        <div key={index} className="flex flex-col items-center border-2 p-2">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <p>{course.description}</p>
          {course.image && (
            <img 
              src={course.image.url} 
              alt={course.title} 
              className="w-full h-auto" 
            />
          )}
          <p>Category: {course.category}</p>
          <p className="text-red-500">Price: ${course.price}</p>
        </div>
      ))
    ) : (
      <p>No courses found.</p>
    )}
  </div>
</section>

      </main>
    </div>
  );
};

export default Course;
