import React, { useState } from "react";
import axios from "axios";
import Message from "./Message";

export default function AddDocument() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  // const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    // console.log(e);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a proplem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card mt-2" />
        <div className="card-header mb-4 bg-secondary text-white">
          <h3 className="text-center mt-4 ">
            <i className="fas fa-file-pdf" /> &nbsp; Add Document
          </h3>
        </div>
        <div className="card-body">
          <div className="text-right">
            <a className="btn btn-info" href="/Documents/">
              Document List
            </a>
          </div>
          <div className="card-body mt-2">
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="docUpload">Upload Document</label>
                <div className="custom-file mt-2">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="docUpload"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {fileName}
                  </label>
                </div>
              </div>
              <input
                type="submit"
                value="Upload"
                className="btn btn-block btn-success mt-3"
              />
            </form>
          </div>
        </div>
        {uploadedFile ? (
          <div>
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              style={{ width: "100%" }}
              src={uploadedFile.filePath}
              alt={uploadedFile.fileName}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
