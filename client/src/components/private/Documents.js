import React, { Component } from "react";
import Upload from "./Upload";
import { Button, Modal, ModalBody, ModalFooter, Alert } from "reactstrap";
import axios from "axios";

export class Documents extends Component {
  // console.log(this.props);
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      selectedFiles: null,
      modal: false,
      visible: false,
      message: "",
      color: "",
      documents: {},
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  singleFileChangedHandler = event => {
    // console.log(event.target.files);
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  singleFileUploadHandler = () => {
    const data = new FormData();
    // If file selected
    if (this.state.selectedFile) {
      data.append(
        "profileImage",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      axios
        .post("/api/uploads/home-file-upload", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then(response => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                this.onShowAlert("Max size: 2MB", "danger");
              } else {
                console.log(response.data);
                // If not the given file type
                this.onShowAlert(response.data.error, "danger");
              }
            } else {
              let fileName = response.data;

              let docDetail = {
                home: this.props.userId,
                fileName: this.state.selectedFile.name,
                fileUrl: fileName.location,
              };
              this.onShowAlert("Document Uploaded Successfully", "success");

              axios.post("/api/documents", { docDetail }).then(res => {
                // console.log("Heres's the Data", res.data);
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
          // If another error
          this.onShowAlert(error, "danger");
        });
    } else {
      // if file not selected throw error
      this.onShowAlert("Please upload file", "danger");
    }
  };

  onShowAlert = (message, color) => {
    this.setState({ visible: true, message, color }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false, modal: false });
        window.location.reload();
      }, 2000);
    });
  };

  componentDidMount() {
    axios
      .get("/api/documents")
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            documents: res.data,
          });
          console.log(res.data);
        } else {
          console.log("You need to add a document/photo");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteDocument = id => {
    axios
      .delete(`/api/documents/${id}`)
      .then(
        window.setTimeout(() => {
          window.location.reload();
        }, 1000)
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="bg bg-documents pt-3">
        <div className="container">
          <div className="card mt-2" />
          <div className="card-header mb-4 bg-secondary text-white">
            <h3 className="text-center mt-4 ">
              <i className="fas fa-file-pdf" /> &nbsp; Document List
            </h3>
          </div>
          <div className="card-body">
            <div className="text-right">
              <button className="btn btn-info mb-5" onClick={this.toggle}>
                <i className="fa fa-plus-circle" aria-hidden="true" />
                &nbsp; Add Document
              </button>
            </div>
            {/* beginning of images */}
            {this.state.documents.length ? (
              <div className="row">
                {this.state.documents.map(document => (
                  <div key={document._id} className="col-4">
                    <div className="card mt-3">
                      <div className="card-header">
                        {document.fileName}{" "}
                        <button
                          className="btn btn-outline-danger float-right"
                          id={document._id}
                          onClick={() => this.deleteDocument(document._id)}
                        >
                          <i className="far fa-trash-alt" />
                        </button>
                      </div>
                      <div key={document._id} className="card-body">
                        <a
                          href={document.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={document.fileUrl}
                            alt={document.fileName}
                            style={{ width: "100%" }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="jumbotron">
                <h4 className="text-center mt-5">
                  No Documents have been added. Please click the "Add Document
                  Button"
                </h4>
              </div>
            )}
            {/* end of images */}
          </div>
        </div>
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalBody>
              <Alert color={this.state.color} isOpen={this.state.visible}>
                {this.state.message}
              </Alert>
              <Upload
                onShowAlert={this.onShowAlert}
                singleFileChangedHandler={this.singleFileChangedHandler}
                singleFileUploadHandler={this.singleFileUploadHandler}
              />
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-info"
                onClick={this.singleFileUploadHandler}
              >
                Upload!
              </button>
              <Button color="danger" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Documents;
