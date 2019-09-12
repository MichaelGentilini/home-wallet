import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Calendar from "./Calendar";
import Vendors from "./Vendors";
import Repairs from "./Repairs";
import Documents from "./Documents";
import AddVendor from "./AddVendor";
import AddRepair from "./AddRepair";
import NoMatch from "./NoMatch";
import axios from "axios";

export class Private extends Component {
  constructor(props) {
    super(props);
    this.toggleZillowModal = this.toggleZillowModal.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.showProfile = this.showProfile.bind(this);

    this.state = {
      zillowData: {},
      streetAddress: "",
      zipCode: "",
      yearBuilt: "",
      bedrooms: "",
      bathrooms: "",
      gla: "",
      lotSize: "",
      parking: "",
      hasPool: false,
      hasFence: false,
      profileModal: false,
      isProfileOpen: false,
      zillowModal: false,
      dropdownOpen: false,
      homeProfile: {},
      isError: false,
      errorMsg: "You did something wrong",
    };
  }

  componentDidMount() {
    var homeId = this.props.user.id;
    axios.get(`/api/home/${homeId}`).then(res => {
      if (res.data.length > 0) {
        this.setState({
          homeProfile: res.data[0],
          hasHomeProfile: true,
          hasZillow: true,
          profileModal: false,
        });
      } else {
        this.setState({
          profileModal: true,
        });
      }
    });
  }

  handleSaveProfile = event => {
    event.preventDefault();
    const {
      zillowData,
      streetAddress,
      zipCode,
      hasPool,
      hasFence,
      parking,
      hasHomeProfile,
      hasZillow,
      yearBuilt,
      bedrooms,
      bathrooms,
      gla,
      lotSize,
    } = this.state;

    let formProfile = {
      userId: this.props.user.id,
      hasHomeProfile,
      hasZillow,
      streetAddress,
      zipCode,
      hasPool,
      hasFence,
      parking,
      yearBuilt,
      bedrooms,
      bathrooms,
      gla,
      lotSize,
      taxAssessment: zillowData.taxAssessment,
      taxYear: zillowData.taxYear,
      zestimate: zillowData.zestimate,
      zestimateHigh: zillowData.zestimateHigh,
      zeistimateLow: zillowData.zeistimateLow,
      zillowLink: zillowData.zillowLink,
      documents: this.props.user.id,
    };

    axios.post("/api/home", { formProfile }).then(res => {
      if (res.data) {
        this.setState({
          hasHomeProfile: true,
          zillowModal: false,
          homeProfile: formProfile,
        });
      } else {
        console.log("NO DATA");
      }
    });
  };

  handleDeleteProfile = event => {
    event.preventDefault();

    axios
      .delete(`/api/home/${this.props.user.id}`)
      .then(
        this.setState({
          hasHomeProfile: false,
          hasZillow: false,
          modal: true,
        })
      )
      .catch(function(error) {
        if (error) {
          console.log(error);
        }
      });
  };

  handleZillowCall = event => {
    event.preventDefault();
    const { zipCode, streetAddress } = this.state;
    if (zipCode && streetAddress) {
      axios.get(`/api/zillow/${streetAddress}/${zipCode}`).then(response => {
        this.setState({
          zillowData: response.data,
          hasZillow: true,
          profileModal: false,
          zillowModal: true,
          yearBuilt: response.data.yearBuilt,
          bedrooms: response.data.bedrooms,
          bathrooms: response.data.bathrooms,
          gla: response.data.gla,
          lotSize: response.data.lotSize,
        });
      });
    } else {
      this.onShowMessage();
      this.setState({
        errorMsg: "Please enter the full address with zip code",
      });
    }
  };

  toggleZillowModal() {
    this.setState(prevState => ({
      profileModal: !prevState.profileModal,
    }));
  }

  toggleNav() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  showProfile() {
    this.setState(prevState => ({
      isProfileOpen: !prevState.isProfileOpen,
    }));
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value,
    });
  };

  handlePoolCheck = () => {
    this.setState({ hasPool: !this.state.hasPool });
  };

  handleFenceCheck = () => {
    this.setState({ hasFence: !this.state.hasFence });
  };

  handleLogout = () => {
    document.cookie = `key=;path=/`;
    this.props.unAuth();
  };

  clearProfile() {
    this.setState({
      hasZillow: false,
      hasHomeProfile: false,
      profileModal: true,
    });
  }

  // alerts/messages for the user
  onShowMessage = () => {
    this.setState({ isError: true }, () => {
      window.setTimeout(() => {
        this.setState({ isError: false });
      }, 3000);
    });
  };

  render() {
    return (
      <div>
        <Router>
          <Nav
            userName={this.props.user.userName}
            userId={this.props.user.id}
            unAuth={this.props.unAuth}
            streetAddress={this.state.streetAddress}
            zipCode={this.state.zipCode}
            handleZillowCall={this.handleZillowCall}
            handleSaveProfile={this.handleSaveProfile}
            handleDeleteProfile={this.handleDeleteProfile}
            handleFenceCheck={this.handleFenceCheck}
            handlePoolCheck={this.handlePoolCheck}
            handleInputChange={this.handleInputChange}
            toggleZillowModal={this.toggleZillowModal}
            toggleNav={this.toggleNav}
            dropdownOpen={this.state.dropdownOpen}
            clearProfile={this.clearProfile}
            handleLogout={this.handleLogout}
            showProfile={this.showProfile}
            isProfileOpen={this.state.isProfileOpen}
            hasHomeProfile={this.state.hasHomeProfile}
            hasZillow={this.state.hasZillow}
            zillowData={this.state.zillowData}
            profileModal={this.state.profileModal}
            zillowModal={this.state.zillowModal}
            hasPool={this.state.hasPool}
            hasFence={this.state.hasFence}
            parking={this.state.parking}
            newHomeProfile={this.state.homeProfile}
            isError={this.state.isError}
            errorMsg={this.state.errorMsg}
            onShowMessage={this.onShowMessage}
          />
          <Switch>
            <Route
              path={["/", "/login"]}
              exact
              render={() => <Calendar userId={this.props.user.id} />}
            />
            <Route
              path="/Vendors/"
              render={props => (
                <Vendors {...props} userId={this.props.user.id} />
              )}
            />
            <Route
              path="/Repairs/"
              render={() => <Repairs userId={this.props.user.id} />}
            />
            <Route
              path="/Documents/"
              render={props => (
                <Documents
                  {...props}
                  userId={this.props.user.id}
                  showFile={this.showFile}
                />
              )}
            />
            <Route
              path="/AddVendor/"
              render={props => (
                <AddVendor {...props} userId={this.props.user.id} />
              )}
            />
            <Route
              render={() => <AddRepair userId={this.props.user.id} />}
              path="/AddRepair/"
            />
            <Route path="*" component={NoMatch} />
            )} />
          </Switch>
        </Router>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default Private;
