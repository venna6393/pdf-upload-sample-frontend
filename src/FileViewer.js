import React from "react";

const FileViewer = ({ file }) => {
  const fileURL = `data:application/pdf;base64,${file.data}`;

  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = file.name; // Set the download attribute to the file name
    link.click(); // Simulate a click to trigger the download
  };

  return (
    <div>
      <h2>{file.name}</h2>
      <embed src={fileURL} type="application/pdf" width="100%" height="600px" />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default FileViewer;
