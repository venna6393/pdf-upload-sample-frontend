import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result.split(",")[1]; // Extract base64 string without the data prefix

      const data = {
        fileName: file.name,
        fileData: base64data,
      };

      try {
        const response = await axios.post(
          "http://localhost:3001/upload",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response);
        alert("File uploaded successfully");
      } catch (err) {
        console.error("Axios Error: ", err);
        alert("File upload failed");
      }
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;
