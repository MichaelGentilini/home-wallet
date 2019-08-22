import React from "react";
import axios from "axios";
import { Alert } from "reactstrap";
import placeholder from "../../images/headshot-placeholder.jpg";

export default class Vendors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vendors: {},
      visible: false,
    };
  }
  componentDidMount() {
    axios
      .get("/api/vendors")
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            vendors: res.data,
          });
        } else {
          console.log("No Vendors Found");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteVendor = id => {
    axios
      .delete(`/api/vendors/${id}`)
      .then(this.onShowAlert())
      .then((window.location = "/Vendors/"))
      .catch(err => console.log(err));
  };

  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 4000);
    });
  };

  render() {
    return (
      <div className="bg bg-vendors pt-3">
        <div className="container">
          <div className="card mt-2" />
          <div className="card-header mb-4 bg-secondary text-white">
            <h3 className="text-center mt-4 ">
              <i className="far fa-address-card" />
              &nbsp; Vendor List
            </h3>
          </div>
          <div className="card-body">
            <div className="text-right">
              <a className="btn btn-info" href="/AddVendor/">
                <i className="fa fa-plus-circle" aria-hidden="true" />
                &nbsp; Add Vendor
              </a>
            </div>
            <br />
            <Alert className="alert-danger mt-2" isOpen={this.state.visible}>
              Vendor deleted!
            </Alert>
            {/* Vendor Card Starts Here */}
            {this.state.vendors.length ? (
              <div className="card mt-2 p-5">
                {this.state.vendors.map(vendor => (
                  <div key={vendor._id}>
                    <div
                      className="card mx-auto mt-2"
                      style={{ width: "80%", border: "solid lightGrey" }}
                    >
                      <div className="card-header text-center">
                        <h3>
                          {vendor.vendorName}{" "}
                          <button
                            className="btn btn-outline-secondary float-right"
                            id={vendor._id}
                            onClick={() => this.deleteVendor(vendor._id)}
                          >
                            <i className="fas fa-trash-alt" />
                          </button>
                        </h3>
                      </div>
                      <div className="container">
                        <div className="row mt-3 mb-3">
                          <div className="col-7">
                            <p>
                              <strong>Company: </strong>{" "}
                              <span>{vendor.vendorCompany}</span>
                            </p>
                            <p>
                              <strong>Phone:</strong>{" "}
                              <span>{vendor.vendorPhone}</span>
                            </p>
                            <p>
                              <strong>Email:</strong>{" "}
                              <span>{vendor.vendorEmail}</span>
                            </p>
                            <p>
                              {" "}
                              <strong>Notes:</strong>{" "}
                              <span>{vendor.vendorNotes}</span>
                            </p>
                            <p>
                              {" "}
                              <strong>Category: </strong>{" "}
                              <span>{vendor.vendorCategory}</span>{" "}
                            </p>
                          </div>
                          <div className="col-5">
                            <img
                              src={placeholder}
                              style={{ width: "200px", height: "200px" }}
                              alt="ImgPlaceholder"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}{" "}
              </div>
            ) : (
              <div className="jumbotron">
                <h4 className="text-center mt-5">
                  No Vendors have been added. Please click the "Add Vendor
                  Button"
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
