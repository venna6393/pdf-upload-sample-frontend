import React, { useEffect, useState } from "react";
import axios from "axios";
import FileViewer from "./FileViewer";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/pdfs");
        setFiles(response.data);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };

    fetchFiles();
  }, []);

  const handleFileClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/pdfs/${id}`);
      setSelectedFile(response.data);
    } catch (err) {
      console.error("Error fetching file:", err);
    }
  };

  return (
    <div>
      <h1>PDF List</h1>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <button onClick={() => handleFileClick(file.id)}>
              {file.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedFile && <FileViewer file={selectedFile} />}
    </div>
  );
};

export default FileList;
