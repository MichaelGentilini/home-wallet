import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import Profile from "./Profile.js";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false,
      modal: false,
      modal2: false,
    };
  }
  handleClick = () => {
    document.cookie = `key=;path=/`;
    this.props.unAuth();
  };

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggle2() {
    this.setState(prevState => ({
      modal2: !prevState.modal2,
    }));
  }

  componentDidMount() {
    if (!this.props.hasZillow) {
      this.setState({
        modal: true,
      });

      if (this.props.hasZillow && this.props.hasHomeProfile) {
        this.setState({
          modal: false,
        });
      }
    }

    if (this.props.hasZillow && !this.props.hasHomeProfile) {
      this.setState({
        modal2: true,
      });
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="container">
            <a className="navbar-brand " href="/">
              <h1>
                My Home Wallet <i className="fas fa-wallet" />
              </h1>
            </a>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>Options</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <a className="dropdown-item" href="/">
                    <i className="fas fa-home" /> Main
                  </a>
                </DropdownItem>

                <DropdownItem>
                  {" "}
                  <a className="dropdown-item" href="/">
                    <i className="far fa-calendar-alt" /> Calendar
                  </a>
                </DropdownItem>
                <DropdownItem>
                  <a className="dropdown-item" href="/Documents/">
                    <i className="fas fa-file-pdf" /> Documents
                  </a>
                </DropdownItem>
                <DropdownItem>
                  <a className="dropdown-item" href="/Repairs/">
                    <i className="fas fa-tools" /> Repairs
                  </a>
                </DropdownItem>
                <DropdownItem>
                  <a className="dropdown-item" href="/Vendors/">
                    <i className="far fa-address-card" /> Vendors
                  </a>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <button onClick={this.handleClick}>Logout</button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </nav>
        <div className="container text-center bg-light text-success">
          <h1>Welcome {this.props.userName}</h1>
        </div>
        {this.props.hasZillow ? (
          <p>Profile Data</p>
        ) : (
          <div>
            <div className="container">
              <Modal
                isOpen={!this.props.modal}
                toggle={this.props.toggle2}
                className={this.props.className}
              >
                <ModalHeader className="ml-auto">
                  <Button color="danger" onClick={this.props.toggle2}>
                    x
                  </Button>
                </ModalHeader>
                <ModalBody>
                  <Profile
                    hasHomeProfile={this.state.hasHomeProfile}
                    streetAddress={this.props.streetAddress}
                    zipCode={this.props.zipCode}
                    handleZillowCall={this.props.handleZillowCall}
                    zillowData={this.props.zillowData}
                    handleInputChange={this.props.handleInputChange}
                  />
                </ModalBody>
                <ModalFooter>
                  {/* <Button color="success" onClick={this.toggle2}>
                    Set Profile
                  </Button>{" "} */}
                </ModalFooter>
              </Modal>
            </div>
          </div>
        )}

        <div>
          <div className="container">
            <Modal
              isOpen={this.props.modal2}
              toggle={this.props.toggle2}
              className={this.props.className}
            >
              <ModalHeader className="ml-auto">
                {/* <Button color="danger" onClick={this.toggle2}>
                  x
                </Button> */}
              </ModalHeader>
              <ModalBody>
                <div className="container">
                  <div className="card">
                    <div className="card-header mb-4 bg-secondary text-white">
                      <h3 className="text-center mt-4 ">
                        <i className="fas fa-home" />
                        &nbsp; Tell us about {this.props.streetAddress}
                      </h3>
                    </div>
                    <div className="card-body">
                      <h4 className="text-center">Data from Zillow</h4>
                      <p>
                        Year Built: {this.props.zillowData.yearbuilt}
                        <br />
                        Beds: {this.props.zillowData.bedrooms}
                        <br />
                        Baths: {this.props.zillowData.bathrooms}
                        <br />
                        Square Footage: {this.props.zillowData.gla} <br />
                        Lot Size: {this.props.zillowData.lotSize} sf
                        <br />
                        Tax Assessment for {this.props.zillowData.taxYear}: $
                        {this.props.zillowData.taxAssessment}
                        <br />
                        Zestimate Range: ${this.props.zillowData.zestimateLow} -
                        {this.props.zillowData.zestimateHigh}
                        <br />
                        Zestimate: ${this.props.zillowData.zestimate}
                        <br />
                        <a
                          href={this.props.zillowData.zillowLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Link to Zillow Listing
                        </a>
                      </p>

                      <form>
                        {/* <div className="form-group">
                          <div className="row">
                            <div className="col-4">
                              <label for="isVendor">
                                Check if you have a pool?{" "}
                              </label>
                            </div>
                            <div className="col-8">
                              <input
                                value={this.props.hasPool}
                                id="hasPool"
                                type="checkbox"
                                name="hasPool"
                                checked={this.props.hasPool}
                                onChange={this.handleCheck}
                              />
                            </div>
                            <div className="col-4">
                              <label for="hasFence">
                                Check if you have a fence?{" "}
                              </label>
                            </div>
                            <div className="col-8">
                              <input
                                value={this.props.hasFence}
                                id="hasFence"
                                type="checkbox"
                                name="hasFence"
                                checked={this.props.hasFence}
                                onChange={this.handleCheck}
                              />
                            </div>
                          </div>
                        </div> */}
                        <div className="form-group">
                          <label />
                          Parking
                          <select
                            className="form-control"
                            id="parking"
                            value={this.props.parking}
                            name="parking"
                            onChange={this.props.handleInputChange}
                          >
                            <option>1 Car Garage </option>
                            <option>2 Car Garage </option>
                            <option>3+ Car Garage </option>
                            <option>Carport</option>
                            <option>No Garage</option>
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="card-header">
                    <a
                      className="text-center"
                      href="https://www.zillow.com/zestimate/"
                    >
                      What's a Zestimate?
                    </a>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="row">
                  <div className="col-12">
                    <button
                      className=" btn btn-block btn-success"
                      onClick={this.props.handleSaveProfile}
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
