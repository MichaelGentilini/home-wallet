import React, { Component } from "react";
import axios from "axios";
import { Alert } from "reactstrap";
// import Upload from "./Upload";

export default class AddVendor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vendorName: "",
      vendorCompany: "",
      vendorPhone: "",
      vendorEmail: "",
      vendorCategory: "Plumber",
      hasCategory: false,
      vendorNotes: "",
      visible: false,
    };
  }
  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    // Clear all inputs
    this.setState({
      vendorName: "",
      vendorCompany: "",
      vendorPhone: "",
      vendorEmail: "",
      vendorCategory: "",
      vendorNotes: "",
    });

    // destructure this.state
    const {
      vendorName,
      vendorCompany,
      vendorPhone,
      vendorEmail,
      vendorCategory,
      vendorNotes,
    } = this.state;

    // create newVendor object
    let newVendor = {
      home: this.props.userId,
      vendorName,
      vendorCompany,
      vendorPhone,
      vendorEmail,
      vendorCategory,
      vendorNotes,
    };

    axios
      .post("/api/vendors", { newVendor })
      .then(console.log("vendor added"))
      .then(this.onShowAlert())
      .catch(function(error) {
        if (error) {
          console.log(error);
        }
      });
  };

  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 2000);
    });
  };
  // todo For future use in order to allow for adding categories
  // handleNewCategory = event => {
  //   event.preventDefault();
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value,
  //   });
  //   console.log(this.state.vendorCategory);
  //   console.log(this.state.vendorCategory === " Other");
  //   if (this.state.vendorCategory === " Other") {
  //     alert("new category needed");
  //     this.setState({
  //       hasCategory: true,
  //     });
  //   }
  // };

  render() {
    // console.log(this.props);
    return (
      <div className="bg bg-vendor pt-3">
        <div className="container ">
          <div className="card mt-2 " />
          <div className="card-header mb-4 bg-secondary text-white">
            <h3 className="text-center mt-4 ">
              <i className="far fa-address-card" />
              &nbsp; Add Vendor
            </h3>
          </div>
          <div className="card-body">
            <div className="text-right">
              <a className="btn btn-info" href="/Vendors/">
                Go to Vendor List
              </a>
            </div>
            <div className="card-body mt-2 ">
              <form className="bg-light p-5 ">
                <div className="form-group">
                  <label>Vendor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="vendorNameInput"
                    value={this.state.vendorName}
                    name="vendorName"
                    onChange={this.handleInputChange}
                    placeholder="Stanley Steamer"
                  />
                </div>

                <div className="form-group">
                  <label>Vendor Company</label>
                  <input
                    type="text"
                    className="form-control"
                    id="vendorCompanyInput"
                    value={this.state.vendorCompany}
                    name="vendorCompany"
                    onChange={this.handleInputChange}
                    placeholder="Achme Company"
                  />
                </div>
                <div className="form-group">
                  <label>Vendor Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="vendorPhoneInput"
                    value={this.state.vendorPhone}
                    name="vendorPhone"
                    onChange={this.handleInputChange}
                    placeholder="555-555-5555"
                  />
                </div>
                <div className="form-group">
                  <label>Vendor Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="vendorEmailInput"
                    value={this.state.vendorEmail}
                    name="vendorEmail"
                    onChange={this.handleInputChange}
                    placeholder="email@gmail.com"
                  />
                </div>
                <div className="form-group">
                  <label>Vendor Category</label>
                  <select
                    className="form-control"
                    id="vendorCategory"
                    value={this.state.vendorCategory}
                    name="vendorCategory"
                    onChange={this.handleInputChange}
                    // default="Plumber"
                  >
                    <option>Plumber</option>
                    <option>Carpet Cleaner</option>
                    <option>House Cleaner </option>
                    <option>Electrician</option>
                    <option>Roofer</option>
                    <option>Real Estate Agent</option>
                    <option>Appraiser</option>
                    <option>Handyman</option>
                    <option>Lawn Care</option>
                    <option>Exterminator</option>
                    <option>Other </option>
                  </select>
                </div>
                {this.state.hasCategory ? (
                  <div className="form-group">
                    <label>Add Category</label>
                    <input
                      className="form-control"
                      id="addCategory"
                      value={this.state.vendorCategory}
                      name="vendorCategory"
                      onChange={this.handleInputChange}
                      placeholder="Arborist"
                    />
                  </div>
                ) : (
                  <p />
                )}

                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    className="form-control"
                    id="vendorNotes"
                    value={this.state.vendorNotes}
                    name="vendorNotes"
                    onChange={this.handleInputChange}
                    rows="3"
                    placeholder="Mary has used this company for years and loves them"
                  />
                </div>
                {/* <Upload /> */}
                {/* <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                />
                <label className="custom-file-label" for="customFile">
                  May not make the final Cut!
                </label>
              </div> */}

                {/*Create Vendor in DB */}
                <button
                  onClick={this.handleFormSubmit}
                  className="btn btn-block btn-info mt-5"
                >
                  Add Vendor
                </button>
              </form>
              <Alert className="alert-success mt-2" isOpen={this.state.visible}>
                Vendor Added!
              </Alert>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
