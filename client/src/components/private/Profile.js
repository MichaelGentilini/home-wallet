import React, { Component } from "react";
import axios from "axios";

export default class Profile extends Component {
  state = {
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    hasPool: false,
    hasFence: false,
    hasProfile: false,
  };

  handleZillowCall = event => {
    event.preventDefault();
    const { zipCode, streetAddress } = this.state;
    if (zipCode && streetAddress) {
      console.log("got zip and street");

      axios.get(`/api/zillow/`).then(function(req, response) {
        console.log("something");
        console.log("anything");

        alert(req);
        alert(response);

        if (response) {
          alert("hit");
        }
        alert("no data");
      });
    } else {
      alert("Please enter the full address with zip code");
    }
  };

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

    // Alert that the profile has been created and set hasProfile to True
    alert(`Profile Created`);
    this.setState({
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      hasPool: false,
      hasFence: false,
      hasProfile: true,
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="card mt-2" />
          <div className="card-header mb-4 bg-secondary text-white">
            <h3 className="text-center mt-4 ">
              <i className="fas fa-home" />
              &nbsp; Your Home Profile
            </h3>
          </div>
          <div className="card-body">
            <div className="card-body mt-2">
              <form>
                <div className="form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="streetAddressInput"
                    value={this.state.streetAddress}
                    name="streetAddress"
                    onChange={this.handleInputChange}
                    placeholder="123 Main St"
                  />
                </div>
                {/* Street Address */}
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cityInput"
                    value={this.state.city}
                    name="city"
                    onChange={this.handleInputChange}
                    placeholder="Dallas"
                  />
                </div>
                {/* City */}
                <div className="form-group">
                  <label />
                  State
                  <select
                    className="form-control"
                    id="state"
                    value={this.state.state}
                    name="state"
                    onChange={this.handleInputChange}
                  >
                    <option>TX </option>
                    <option>OK </option>
                    <option>MI </option>
                  </select>
                </div>
                {/* State */}
                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="number"
                    className="form-control"
                    id="zipCodeInput"
                    value={this.state.zipCode}
                    name="zipCode"
                    onChange={this.handleInputChange}
                    placeholder="12345"
                  />
                </div>
                {/* Zip Code */}
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
                <div>
                  <a
                    className="btn btn-info btn-block"
                    onClick={this.handleZillowCall}
                    href="/profile/"
                  >
                    Check Zillow
                  </a>
                </div>

                {/* <div className="form-group">
                  <label for="vendorNotes">Notes</label>
                  <textarea
                    className="form-control"
                    id="vendorNotes"
                    value={this.state.vendorNotes}
                    name="vendorNotes"
                    onChange={this.handleInputChange}
                    rows="3"
                    placeholder="Mary has used this company for years and loves them"
                  />
                </div> */}
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
                <button
                  onClick={this.handleFormSubmit}
                  className="btn btn-block btn-success mt-5"
                >
                  Set Profile
                </button>
              </form>
            </div>
          </div>
          <div className="container">
            <div className="card">
              <div className="card-header pl-5 text-center">
                <h4>
                  Home Profile for {this.state.streetAddress}
                  {/* ,{this.state.city}
                  , {this.state.state} {this.state.zipCode} */}
                </h4>
                <div className="card">Results Go Here</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
