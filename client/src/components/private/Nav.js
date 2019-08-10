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
import Axios from "axios";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle.bind(this);
    this.toggleProfile = this.toggleProfile.bind(this);

    this.state = {
      dropdownOpen: false,
      profileOpen: false,
      modal: false,
      modal2: false,
      isHidden: true,
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

  toggleProfile() {
    this.setState(prevState => ({
      profileOpen: !prevState.profileOpen,
    }));
  }

  //   reloadwindow() {
  //     window.location = "/";
  //   }

  componentDidMount() {
    const { userId } = this.props;

    if (!this.props.hasZillow) {
      this.setState({
        modal: true,
      });

      if (this.props.hasHomeProfile) {
        this.setState({
          modal: false,
        });
      }

      this.setState({
        modal: true,
      });
    }

    if (this.props.hasZillow && !this.props.hasHomeProfile) {
      this.setState({
        modal2: true,
      });
    }
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  render() {
    const { userId, newHomeProfile } = this.props;
    console.log("newHomeProfile: ", newHomeProfile);

    let currentProfile = newHomeProfile;
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
                {/* <DropdownItem> */}
                <p className="text-center bg-dark text-white">
                  {" "}
                  Welcome {this.props.userName}
                </p>
                {/* </DropdownItem> */}
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
                <DropdownItem className="text-center">
                  <a href="/Login/" onClick={this.handleClick}>
                    <i className="fas fa-sign-out-alt" /> Logout
                  </a>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </nav>

        {this.props.hasZillow && this.props.hasHomeProfile ? (
          <div className="container mb-5">
            <div className="card">
              {currentProfile && Object.keys(currentProfile).length ? (
                <div>
                  <div className="row mt-2">
                    <h5 className="mx-auto">
                      <strong>
                        Profile for {currentProfile.streetAddress} <span />
                      </strong>
                    </h5>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <p>
                        <strong>Lot Size:</strong>
                        <span> {currentProfile.lotSize}</span> sf
                        <br />
                        <strong>
                          Tax Assessment for {currentProfile.taxYear}:
                        </strong>
                        <span>${currentProfile.taxAssessment}</span>
                        <br />
                        <strong>Zestimate:</strong> ${currentProfile.zestimate}
                        <br />
                      </p>
                    </div>
                    <div className="col-4">
                      <p>
                        <strong>Square Footage:</strong> {currentProfile.gla}{" "}
                        <br />
                        <strong>Beds:</strong> {currentProfile.bedrooms}
                        <br />
                        <strong>Baths:</strong> {currentProfile.bathrooms}
                        <br />
                        <strong>Year Built: </strong> {currentProfile.yearBuilt}
                        <br />
                      </p>
                    </div>

                    <div className="col-4">
                      <strong>Parking: </strong> {currentProfile.parking}
                      <br />
                      <strong>Pool: </strong>{" "}
                      {currentProfile.hasPool ? " Yes" : "No"}
                      <br />
                      <strong>Fence: </strong>{" "}
                      {currentProfile.hasFence ? " Yes" : "No"} <br />
                    </div>
                  </div>
                  <div className="row">
                    <a
                      href="/"
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={this.props.handleDeleteProfile}
                    >
                      <i className="fas fa-trash-alt" /> Delete Profile
                    </a>
                  </div>
                </div>
              ) : (
                <div className="container text-center">
                  <button
                    className="btn btn-block bg-white"
                    onClick={this.reloadwindow}
                  >
                    View Profile
                  </button>
                </div>
              )}
            </div>
            {/* </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </div>
        ) : (
          <div>
            <div className="container">
              <Modal
                isOpen={this.props.modal}
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
              <ModalHeader className="ml-auto" />
              <ModalBody>
                <div className="container">
                  <div className="card">
                    <div className="card-header mb-4 bg-secondary text-white">
                      <h3 className="text-center mt-2 ">
                        <i className="fas fa-home" />
                        &nbsp; Tell us about {this.props.streetAddress}
                      </h3>
                    </div>
                    <div className="card-body">
                      <h4 className="text-center">
                        Data from{" "}
                        <a
                          href={this.props.zillowData.zillowLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Zillow
                        </a>
                      </h4>
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
                      </p>

                      <form>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-4">
                              <label for="isVendor">
                                Check if you have a pool?{" "}
                              </label>
                            </div>
                            <div className="col-8">
                              <input
                                value={this.props.hasPool}
                                type="checkbox"
                                name="hasPool"
                                checked={this.props.hasPool}
                                onChange={this.props.handlePoolCheck}
                              />
                            </div>
                            <div className="col-4">
                              <label for="hasFence">
                                Check if you have a fence?
                              </label>
                            </div>
                            <div className="col-8">
                              <input
                                value={this.props.hasFence}
                                type="checkbox"
                                name="hasFence"
                                checked={this.props.hasFence}
                                onChange={this.props.handleFenceCheck}
                              />
                            </div>
                          </div>
                        </div>
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
                            <option>No Garage</option>
                            <option>1 Car Garage </option>
                            <option>2 Car Garage </option>
                            <option>3+ Car Garage </option>
                            <option>Carport</option>
                          </select>
                        </div>
                      </form>
                    </div>
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

// import React from "react";
// import {
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Button,
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHeader,
// } from "reactstrap";

// import Profile from "./Profile.js";
// import Axios from "axios";

// export default class Nav extends React.Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.toggle2 = this.toggle.bind(this);
//     // this.toggleProfile = this.toggleProfile.bind(this);

//     this.state = {
//       dropdownOpen: false,
//       profileOpen: false,
//       modal: false,
//       modal2: false,
//       homeProfile: {},
//       isHidden: true,
//     };
//   }
//   handleClick = () => {
//     document.cookie = `key=;path=/`;
//     this.props.unAuth();
//   };

//   toggle() {
//     this.setState(prevState => ({
//       dropdownOpen: !prevState.dropdownOpen,
//     }));
//   }

//   toggle2() {
//     this.setState(prevState => ({
//       modal2: !prevState.modal2,
//     }));
//   }

//   toggleProfile() {
//     this.setState(prevState => ({
//       profileOpen: !prevState.profileOpen,
//     }));
//   }

//   reloadwindow() {
//     window.location = "/";
//   }

//   checkForHomeProfile() {
//     if (this.props.newHomeProfile.length) {
//       console.log("got props");
//     }
//     console.log("no newHomeProfile");
//   }

//   componentDidMount() {
//     this.checkForHomeProfile();

//     const { userId } = this.props;
//     Axios.get(`/api/home/${userId}`)
//       .then(response => {
//         this.setState({
//           homeProfile: response.data,
//         });
//       })
//       .catch(function(error) {
//         console.log(error);
//       });

//     if (!this.props.hasZillow) {
//       this.setState({
//         modal: true,
//       });

//       if (this.props.hasZillow && this.props.hasHomeProfile) {
//         this.setState({
//           modal: false,
//         });
//       }
//       this.setState({
//         modal: true,
//       });
//     }

//     if (this.props.hasZillow && !this.props.hasHomeProfile) {
//       this.setState({
//         modal2: true,
//       });
//     }
//   }

//   toggleHidden() {
//     this.setState({
//       isHidden: !this.state.isHidden,
//     });
//   }

//   render() {
//     let currentProfile = this.state.homeProfile[0];
//     return (
//       <div>
//         <nav className="navbar navbar-expand-lg navbar-light ">
//           <div className="container">
//             <a className="navbar-brand " href="/">
//               <h1>
//                 My Home Wallet <i className="fas fa-wallet" />
//               </h1>
//             </a>
//             <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//               <DropdownToggle caret>Options</DropdownToggle>
//               <DropdownMenu>
//                 {/* <DropdownItem> */}
//                 <p className="text-center bg-dark text-white">
//                   {" "}
//                   Welcome {this.props.userName}
//                 </p>
//                 {/* </DropdownItem> */}
//                 <DropdownItem>
//                   <a className="dropdown-item" href="/">
//                     <i className="fas fa-home" /> Main
//                   </a>
//                 </DropdownItem>

//                 <DropdownItem>
//                   {" "}
//                   <a className="dropdown-item" href="/">
//                     <i className="far fa-calendar-alt" /> Calendar
//                   </a>
//                 </DropdownItem>
//                 <DropdownItem>
//                   <a className="dropdown-item" href="/Documents/">
//                     <i className="fas fa-file-pdf" /> Documents
//                   </a>
//                 </DropdownItem>
//                 <DropdownItem>
//                   <a className="dropdown-item" href="/Repairs/">
//                     <i className="fas fa-tools" /> Repairs
//                   </a>
//                 </DropdownItem>
//                 <DropdownItem>
//                   <a className="dropdown-item" href="/Vendors/">
//                     <i className="far fa-address-card" /> Vendors
//                   </a>
//                 </DropdownItem>
//                 <DropdownItem divider />
//                 <DropdownItem className="text-center">
//                   <a href="/Login/" onClick={this.handleClick}>
//                     <i className="fas fa-sign-out-alt" /> Logout
//                   </a>
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         </nav>

//         {this.props.hasZillow && this.props.hasHomeProfile ? (
//           <div className="container mb-5">
//             {/* <Dropdown
//               isOpen={this.state.profileOpen}
//               toggle={this.toggleProfile}
//             >
//               <DropdownToggle className="btn btn-light btn-block">
//                 Profile
//               </DropdownToggle>
//               <DropdownMenu>
//                 <DropdownItem> */}
//             <div className="card">
//               {currentProfile ? (
//                 <div>
//                   <div className="row mt-2">
//                     <h5 className="mx-auto">
//                       <strong>
//                         Profile for {currentProfile.streetAddress} <span />
//                       </strong>
//                     </h5>
//                   </div>
//                   <div className="row">
//                     <div className="col-4">
//                       <p>
//                         <strong>Lot Size:</strong>
//                         <span> {currentProfile.lotSize}</span> sf
//                         <br />
//                         <strong>
//                           Tax Assessment for {currentProfile.taxYear}:
//                         </strong>
//                         <span>${currentProfile.taxAssessment}</span>
//                         <br />
//                         <strong>Zestimate:</strong> ${currentProfile.zestimate}
//                         <br />
//                       </p>
//                     </div>
//                     <div className="col-4">
//                       <p>
//                         <strong>Square Footage:</strong> {currentProfile.gla}{" "}
//                         <br />
//                         <strong>Beds:</strong> {currentProfile.bedrooms}
//                         <br />
//                         <strong>Baths:</strong> {currentProfile.bathrooms}
//                         <br />
//                         <strong>Year Built: </strong> {currentProfile.yearBuilt}
//                         <br />
//                       </p>
//                     </div>

//                     <div className="col-4">
//                       <strong>Parking: </strong> {currentProfile.parking}
//                       <br />
//                       <strong>Pool: </strong>{" "}
//                       {currentProfile.hasPool ? " Yes" : "No"}
//                       <br />
//                       <strong>Fence: </strong>{" "}
//                       {currentProfile.hasFence ? " Yes" : "No"} <br />
//                     </div>
//                   </div>
//                   <div className="row">
//                     <a
//                       href="/"
//                       className="btn btn-sm btn-danger ml-auto"
//                       onClick={this.props.handleDeleteProfile}
//                     >
//                       <i className="fas fa-trash-alt" /> Delete Profile
//                     </a>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="container text-center">
//                   <button
//                     className="btn btn-block bg-white"
//                     onClick={this.reloadwindow}
//                   >
//                     View Profile
//                   </button>
//                 </div>
//               )}
//             </div>
//             {/* </DropdownItem>
//               </DropdownMenu>
//             </Dropdown> */}
//           </div>
//         ) : (
//           <div>
//             <div className="container">
//               <Modal
//                 isOpen={this.props.modal}
//                 toggle={this.props.toggle2}
//                 className={this.props.className}
//               >
//                 <ModalHeader className="ml-auto">
//                   <Button color="danger" onClick={this.props.toggle2}>
//                     x
//                   </Button>
//                 </ModalHeader>
//                 <ModalBody>
//                   <Profile
//                     hasHomeProfile={this.state.hasHomeProfile}
//                     streetAddress={this.props.streetAddress}
//                     zipCode={this.props.zipCode}
//                     handleZillowCall={this.props.handleZillowCall}
//                     zillowData={this.props.zillowData}
//                     handleInputChange={this.props.handleInputChange}
//                   />
//                 </ModalBody>
//               </Modal>
//             </div>
//           </div>
//         )}

//         <div>
//           <div className="container">
//             <Modal
//               isOpen={this.props.modal2}
//               toggle={this.props.toggle2}
//               className={this.props.className}
//             >
//               <ModalHeader className="ml-auto" />
//               <ModalBody>
//                 <div className="container">
//                   <div className="card">
//                     <div className="card-header mb-4 bg-secondary text-white">
//                       <h3 className="text-center mt-2 ">
//                         <i className="fas fa-home" />
//                         &nbsp; Tell us about {this.props.streetAddress}
//                       </h3>
//                     </div>
//                     <div className="card-body">
//                       <h4 className="text-center">
//                         Data from{" "}
//                         <a
//                           href={this.props.zillowData.zillowLink}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           Zillow
//                         </a>
//                       </h4>
//                       <p>
//                         Year Built: {this.props.zillowData.yearbuilt}
//                         <br />
//                         Beds: {this.props.zillowData.bedrooms}
//                         <br />
//                         Baths: {this.props.zillowData.bathrooms}
//                         <br />
//                         Square Footage: {this.props.zillowData.gla} <br />
//                         Lot Size: {this.props.zillowData.lotSize} sf
//                         <br />
//                         Tax Assessment for {this.props.zillowData.taxYear}: $
//                         {this.props.zillowData.taxAssessment}
//                         <br />
//                         Zestimate Range: ${this.props.zillowData.zestimateLow} -
//                         {this.props.zillowData.zestimateHigh}
//                         <br />
//                         Zestimate: ${this.props.zillowData.zestimate}
//                       </p>

//                       <form>
//                         <div className="form-group">
//                           <div className="row">
//                             <div className="col-4">
//                               <label for="isVendor">
//                                 Check if you have a pool?{" "}
//                               </label>
//                             </div>
//                             <div className="col-8">
//                               <input
//                                 value={this.props.hasPool}
//                                 type="checkbox"
//                                 name="hasPool"
//                                 checked={this.props.hasPool}
//                                 onChange={this.props.handlePoolCheck}
//                               />
//                             </div>
//                             <div className="col-4">
//                               <label for="hasFence">
//                                 Check if you have a fence?
//                               </label>
//                             </div>
//                             <div className="col-8">
//                               <input
//                                 value={this.props.hasFence}
//                                 type="checkbox"
//                                 name="hasFence"
//                                 checked={this.props.hasFence}
//                                 onChange={this.props.handleFenceCheck}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="form-group">
//                           <label />
//                           Parking
//                           <select
//                             className="form-control"
//                             id="parking"
//                             value={this.props.parking}
//                             name="parking"
//                             onChange={this.props.handleInputChange}
//                           >
//                             <option>No Garage</option>
//                             <option>1 Car Garage </option>
//                             <option>2 Car Garage </option>
//                             <option>3+ Car Garage </option>
//                             <option>Carport</option>
//                           </select>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//               </ModalBody>
//               <ModalFooter>
//                 <div className="row">
//                   <div className="col-12">
//                     <button
//                       className=" btn btn-block btn-success"
//                       onClick={this.props.handleSaveProfile}
//                     >
//                       Save Profile
//                     </button>
//                   </div>
//                 </div>
//               </ModalFooter>
//             </Modal>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
