import { useState } from "react";
const Course = () => {
  const [course, setCourse] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    sortBy: "",
    sortOrder: "asc",
    search: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target.value;
    setCourse({ ...Course, [name]: value });
  };

  const handleImageChange = (e) => {
    setCourse({ ...Course, image: e.target.files[0] });
  };

  const handleFilterChange = (e)=>{
const {name, value} = e.target.value();
setFilters({...filters , [name]:value})
  }
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
    } catch (error) {
      console.error("Error:", error.message);
    }
  };


  return (
    <>
      <div className="mb-6">
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Add Course</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <textarea
            name="description"
            placeholder="Description"
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

        <div className="mt-6">
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
        </div>
      </div>
    </>
  );
};

export default Course;
