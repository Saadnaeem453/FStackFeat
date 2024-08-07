import { useEffect, useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState([]);
  const [message, setMessage] = useState('');

  // Handle file input change
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  // Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/getImages');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const images = await res.json(); // Correctly parse the response
        setUploadedFile(images); // Set the fetched images
      } catch (error) {
        setMessage(`Error fetching images: ${error.message}`);
      }
    };
    fetchImages();
  }, []); // Run only once on component mount

  // Handle file upload
  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      setMessage('File Uploaded');
    } catch (err) {
      setMessage(`There was a problem with the server: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-inpu text-lg"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label text-lg" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4 text-md text-white bg-cyan-600 px-8  py-2 rounded-md"
        />
      </form>
      {message ? <p>{message}</p> : null}
      <h3 className="text-center text-3xl font-semibold p-6 ">Uploaded Images</h3>

      {uploadedFile.length > 0 && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
    {uploadedFile.map((url, index) => (
      <div key={index} className="flex justify-center items-center">
        <img
          className="w-full h-auto object-cover"
          src={url.url}
          alt={`Uploaded ${index}`}
        />
      </div>
    ))}
  </div>
)}
    </div>
  );
};

export default FileUpload;
