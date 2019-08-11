import React from "react";
import { Button, Modal, ModalBody, Row, Col, Form, FormGroup, Label, Input, Card, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, } from "reactstrap";
import moment from 'moment';
import API from "../../utils/API";


  export default class Repair extends React.Component {
    constructor(props) {
     super(props)

     this.state = {
      repairs: [],
      changeRepairId: "",
      modal: false,
      repairType: "",
      title: "",
      cost: 0,
      priority: "",
      status: "",
      isVendor: false,
      vendor: "",
      notes: "",
      recurrencePeriod: "never",
      repeatInterval: 1,
      repeatDayOfWeek: "",
      startDate: "",
      recurrenceStartDate: "",
      recurrenceEndDate: "",
      startTime: "",
      endTime: "",
      changeRepairType: "",
     
    };
  }


  componentDidMount() {
    this.loadRepairs();
}

loadRepairs = () => { 
  console.log("Repairs.js this.props.userId: " + this.props.userId);
  API.getRepairs(this.props.userId)
  .then(repairs => {
   
    console.log(repairs);

  const repairList =  repairs.data.map(item => ({
    repairId: item._id,
    repairType: item.repairType,
    title:item.title,
    cost: item.cost,
    priority: item.priority,
    status: item.status,
    vendor: item.vendor,
    notes: item.notes,
    recurrencePeriod: item.recurrencePeriod,
    repeatInterval: item.repeatInterval,
    repeatDayOfWeek: item.repeatDayOfWeek,
    startDate: item.startDate,
    recurrenceStartDate: item.recurrenceStartDate,
    recurrenceEndDate: item.recurrenceEndDate,
    duration: item.duration,
    startTime: item.startTime,
    endTime: item.endTime,  
  }))

    this.setState({ 
        repairs: repairList,
      });
  })
  .catch(err => console.log(err));
};


toggle = () => {
  this.setState(prevState => ({
    modal: !prevState.modal,
  }));
};


handleChangeRepair = (id) => {
      let changeRepair = this.state.repairs.filter(item => item.repairId === id);
      console.log("changeRepair: " + JSON.stringify(changeRepair));  // working

      let formatStartDate = moment(changeRepair[0].startDate).format("YYYY-MM-DD");
      let formatRecurStartDate = moment(changeRepair[0].recurrenceStartDate).format("YYYY-MM-DD");
      let formatRecurEndDate = moment(changeRepair[0].recurrenceEndDate).format("YYYY-MM-DD");


      this.setState({
      changeRepairId: changeRepair[0].repairId,
      repairType: changeRepair[0].repairType,
      title: changeRepair[0].title,
      cost: changeRepair[0].cost,
      priority: changeRepair[0].priority,
      status: changeRepair[0].status,
      isVendor: changeRepair[0].isVendor,
      vendor: changeRepair[0].vendor,
      notes: changeRepair[0].notes,
      recurrencePeriod: changeRepair[0].recurrencePeriod,
      repeatInterval: changeRepair[0].repeatInterval,
      repeatDayOfWeek: changeRepair[0].repeatDayOfWeek,
      startDate: formatStartDate,
      recurrenceStartDate: formatRecurStartDate,
      recurrenceEndDate: formatRecurEndDate,
      startTime: changeRepair[0].startTime,
      endTime: changeRepair[0].endTime,

       });

       this.toggle();

    }


    handleCheck = () => {      
        this.setState({ isVendor: !this.state.isVendor });
    };


  /*   handleInputChange = event => {
      // Getting the value and name of the input which triggered the change
      const { name, value } = event.target;
           console.log(event.target);
      // Updating the input's state
      this.setState({
       
        [name]: value,
      
      });
    }; */

    handleInputChange = event => {
      // Getting the value and name of the input which triggered the change
      const { name, value } = event.target;
           console.log(event.target);
      // Updating the input's state
      this.setState({
       
        [name]: value,
      
      });
    };


handleDeleteRepair (id) {
  var filtered = this.state.repairs.filter(item => item._id !== id);
  this.setState({ 
    repairs: filtered,
   });
  API.deleteRepair(id)
    .then(this.loadRepairs())
    .catch(err => console.log(err));
  API.deleteEvent(id)
  .then()
  .catch(err => console.log(err));
};


//// NOT COMPLETE ////
handleFormSubmit = event => {
  // Preventing the default behavior of the form submit (which is to refresh the page)
  event.preventDefault();
 
  let modifiedEvent = {};

  modifiedEvent.repairId = this.state.changeRepairId;
  
  let modifiedRepair = {
    userId: this.props.userId,
    repairId: this.state.changeRepairId,
    repairType: this.state.repairType,
    title: this.state.title,
    cost: this.state.cost,
    priority: this.state.priority,
    status: this.state.status,
    recurrencePeriod: this.state.recurrencePeriod,
    vendor: this.state.vendor,
    notes: this.state.notes,
    startTime: this.state.startTime,
    endTime: this.state.endTime,
  }


  if (this.state.recurrencePeriod !== "never") {

    let momentStart = this.state.recurrenceStartDate + " " + this.state.startTime;
    let momentEnd = this.state.recurrenceStartDate + " " + this.state.endTime;
    let duration = moment
    .duration(moment(momentEnd, 'YYYY/MM/DD HH:mm')
    .diff(moment(momentStart, 'YYYY/MM/DD HH:mm'))
    ).asHours();

    console.log("duration: " + duration);

    let parsedRecurStart = this.state.recurrenceStartDate + "T" + this.state.startTime + ":00";
//    let parsedRecurEnd = this.state.recurrenceEndDate + "T" + this.state.endTime + ":00";

        modifiedRepair.recurrenceStartDate = parsedRecurStart;
        modifiedRepair.repeatDayOfWeek = this.state.repeatDayOfWeek;
        modifiedRepair.recurrenceEndDate = this.state.recurrenceEndDate;
        modifiedRepair.duration= duration;

        if (this.state.recurrencePeriod === "daily"){

        /*     let momentDayInterval = moment
                .duration(moment(this.state.recurrenceEndDate, 'YYYY/MM/DD')
                .diff(moment(this.state.recurrenceStartDate, 'YYYY/MM/DD'))
                ).asDays();
            
            console.log("momentDayInterval: " + momentDayInterval); */

            this.setState({
                
                repeatInterval: 1,
              })

            modifiedRepair.repeatInterval = this.state.repeatInterval;
            
            modifiedEvent = {
                userId: this.props.userId,
                title: this.state.title,
                rrule: {
                    freq: this.state.recurrencePeriod,
                    interval: this.state.repeatInterval,
                    dtstart: parsedRecurStart,
                    until: this.state.recurrenceEndDate,
                },
                duration: duration,
                backgroundColor: "yellow",
    
               }

        }else if (this.state.recurrencePeriod === "weekly") {

            modifiedRepair.repeatInterval = this.state.repeatInterval;

            modifiedEvent = {
                userId: this.props.userId,
                title: this.state.title,
                rrule: {
                    freq: this.state.recurrencePeriod,
                    interval: this.state.repeatInterval,
                    byweekday: this.state.repeatDayOfWeek,
                    dtstart: parsedRecurStart,                // CHECK THIS //
                    until: this.state.recurrenceEndDate,
                },
                duration: duration,
                backgroundColor: "green",
    
               }
            
}
}else {
let momentStart = this.state.startDate + " " + this.state.startTime;
    let momentEnd = this.state.startDate + " " + this.state.endTime;
    let duration = moment
    .duration(moment(momentEnd, 'YYYY/MM/DD HH:mm')
    .diff(moment(momentStart, 'YYYY/MM/DD HH:mm'))
    ).asHours();

    console.log("duration: " + duration);

    let parsedStart = this.state.startDate + "T" + this.state.startTime + ":00";
    let parsedEnd = this.state.startDate + "T" + this.state.endTime + ":00";

    modifiedRepair.startDate = parsedStart;
    modifiedRepair.duration = duration;

    modifiedEvent = {
        userId: this.props.userId,
        category: this.state.repairType,
        title: this.state.title,
        start: parsedStart,
        end: parsedEnd,
        editable: true,
    }
}


  API.changeRepair(modifiedRepair)

      .then(modifiedRepair => {
        console.log("changeRepair: " + modifiedRepair);
      })
      .catch(err => console.log(err));

  API.changeEvent(modifiedEvent)
  .then(modifiedEvent => {
      console.log("changeEvent in changeEvent: " + JSON.stringify(modifiedEvent));
    this.toggle();
  })
  .catch(err => console.log(err));

  API.getRepairs(this.props.userId)
  .then(response => {
  //  console.log(response);
    this.setState({ 
        repairs: response.data
      });
  })
  .catch(err => console.log(err));

  this.setState({
    repairType: "",
    title: "",
    startDate: "",
    recurrencePeriod: "never",
    repeatInterval: 1,
    repeatDayOfWeek: "",
    recurrenceStartDate: "",
    recurrenceEndDate: "",
    startTime: "",
    endTime: "",
    cost: 0,
    priority: "low",
    status: "Thinking about it!",
    isVendor: false,
    vendor: "",
    notes: "",
    editable: true,
  })


};



render() {

  return (
    <div>
      <div className="container">
        <div className="card mt-2" />
        <div className="card-header mb-4 bg-secondary text-white">
          <h3 className="text-center mt-4 ">
            <i className="fas fa-tools" /> &nbsp; Updates, Repairs, and
            Maintenance
          </h3>
        </div>
        <div className="card-body">
          <div className="text-right">
            <a className="btn btn-info" href="/AddRepair/">
              <i class="fa fa-plus-circle" aria-hidden="true" /> &nbsp; Add
              Task
            </a>
          </div>
          <br />
          <div>
          {this.state.repairs.length ? (
            this.state.repairs.map(item => (    
      <Card className="repair-card" style={{ borderColor: '#333' }} key={item.repairId}>
        <CardBody>
          <CardTitle><h3>{item.title}</h3></CardTitle>
          <CardSubtitle><h5>{item.priority} priority</h5></CardSubtitle>
          <CardText className= "repair-card-textbox">
            <Row>
            <Col md={4}>
              <p>Notes: {item.notes}</p>
            </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p>Cost: ${item.cost}</p>
              </Col>
              <Col md={6}>
                <p>Status: {item.status}</p>
              </Col>
            </Row>
            <Row>
            <Col md={6}>
              <p>Vendor: {item.vendor}</p>
            </Col>
            
            {((item.recurrencePeriod === "never") ? (
            <Col md={6}>
              <p>Scheduled For: {moment(item.startDate).format('MM/DD/YYYY')}  </p>
            </Col>
            ) : (
              <p/>
              )
            )}

            {((item.recurrencePeriod === "weekly") ? (
            <Col md={6}>
              <p>Scheduled every {item.repeatInterval} week(s) from {moment(item.recurrenceStartDate).format('MM/DD/YYYY')} to {moment(item.recurrenceEndDate).format('MM/DD/YYYY')}</p>
            </Col>
             ) : (
              <p/>
              )
            )}

            {((item.recurrencePeriod === "daily") ? (
            <Col md={6}>
              <p>Scheduled from: {moment(item.recurrenceStartDate).format('MM/DD/YYYY')} to {moment(item.recurrenceEndDate).format('MM/DD/YYYY')}</p>
            </Col>
             ) : (
              <p/>
              )
            )}
            
         
            </Row>              
          </CardText>
          <Button
          color="danger"
          onClick={() =>this.handleDeleteRepair(item.repairId)}
          >Delete</Button>
           <Button
          color="success"
          onClick={() =>this.handleChangeRepair(item.repairId)}
          >Modify</Button>
        </CardBody>
      </Card>

      ))
      ) : (
        <h3>No Results to Display</h3>
      )}
    </div>
        </div>
      </div>

      <div>
        <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
        >
        <Button
            className="ml-auto"
            color="danger"
            onClick={this.toggle}
        >
            x
        </Button>
        <ModalBody>
        <Form>
    <FormGroup>
        <Label for="repairType">Type</Label>
        <Input
        type="select"
        id="repairTypeSelect"
        defaultValue= {this.state.changeRepairType}
        //value={this.state.repairType}

        name="repairType"
        onChange={this.handleInputChange}
        >
        <option>Update</option>
        <option>Repair</option>
        <option>Maintenance</option>
        </Input>
    </FormGroup>
    <FormGroup>
        <Label for="repairDescription">Description</Label>
        <Input
        type="text"
        id="repairDescriptionInput"
        defaultValue= {this.state.title}
    //    value={this.state.title}
        name="title"
        onChange={this.handleInputChange}
        />
    </FormGroup>

    <FormGroup>
        <Label for="recurringPeriod">Repeat</Label>
        <Input
        type="select"
        defaultValue={this.state.recurrencePeriod}
    //    value={this.state.recurrencePeriod}
        name="recurrencePeriod"
        onChange={this.handleInputChange}
        >
        <option value="never">Never</option>    
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
    {/*   <option>Monthly</option> */}
    {/*   <option>Yearly</option> */}
        </Input>
    </FormGroup>
    
    
        {((this.state.recurrencePeriod === "daily") || (this.state.recurrencePeriod === "weekly")) ? (
        <Row>
        <Col md={6}>
        <FormGroup>
            <Label for="recurrence-start-date-input">Start Date</Label>
            <Input
            type="date"
            id="recurrence-start-date-input"
            defaultValue={this.state.recurrenceStartDate}
    //        value={this.state.recurrenceStartDate}
            name="recurrenceStartDate"
            onChange={this.handleInputChange}
            />
        </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
            <Label for="end-date-input">End By Date</Label>
        <Input
        type="date"
        id="end-date-input"
        defaultValue={this.state.recurrenceEndDate}
    //    value={this.state.recurrenceEndDate}
        name="recurrenceEndDate"
        onChange={this.handleInputChange}
        />
        </FormGroup>
        </Col>
        </Row>
) : (
    <Row>
    <Col md={6}>
        <FormGroup>
            <Label for="start-date-input">Start Date</Label>
            <Input
            type="date"
            id="start-date-input"
            defaultValue={this.state.startDate}
    //        value={this.state.startDate}
            name="startDate"
            onChange={this.handleInputChange}
            />
        </FormGroup>
        </Col>
     </Row>
)}
               
        <Row form>
        <Col md={6}>
        <FormGroup>
        <Label for="start-time-input">Start Time</Label>
        <Input
        type="time"
        id="start-time-input"
        defaultValue={this.state.startTime}
   //     value={this.state.startTime}
        name="startTime"
        onChange={this.handleInputChange}
        />                  
        </FormGroup>
    </Col>
    <Col md={6}>
        <FormGroup>
        <Label for="end-time-input">End Time</Label>
        <Input
        type="time"
        id="end-time-input"
        defaultValue={this.state.endTime}
    //    value={this.state.endTime}
        name="endTime"
        onChange={this.handleInputChange}
        />                  
        </FormGroup>
    </Col>
    </Row>

    {(this.state.recurrencePeriod === "weekly") ? (
        <div>
        <Row form>
        <Col md={6}>
        <FormGroup>
        <Label for="repeatInterval">every</Label>
        <Input
        type="select"
        name="repeatInterval"
        defaultValue={this.state.repeatInterval}
   //     value={this.state.repeatInterval}
        onChange={this.handleInputChange}   
        >
        <option value={1}>1</option>    
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        </Input>
    <span>week(s)</span>
    </FormGroup>
    </Col>
    <Col md={6}>
    <FormGroup>
        <Label for="repeatDayOfWeek">on</Label>
        <Input
        type="select"
        defaultValue={this.state.repeatDayOfWeek}
    //    value={this.state.repeatDayOfWeek}
        name="repeatDayOfWeek"
        onChange={this.handleInputChange}
        >
        <option value="SU">Sunday</option>
        <option value="MO">Monday</option>
        <option value="TU">Tuesday</option>
        <option value="WE">Wednesday</option>
        <option value="TH">Thursday</option>
        <option value="FR">Friday</option>
        <option value="SA">Saturday</option>
        </Input>
    </FormGroup>
    </Col>
    </Row>
    </div>
    ) : (
        <p />
    )}

    <Row form>
    <Col md={4}>
    <FormGroup>
        <Label for="repairCost"> Repair Cost</Label>
        <Input
        type="number"
        id="repairCostInput"
        defaultValue={this.state.cost}
    //    value={this.state.cost}
        name="cost"
        onChange={this.handleInputChange}
        />
    </FormGroup>
    </Col>
    <Col md={4}>
    <FormGroup>
        <Label for="repairPriority">Repair Priority</Label>
        <Input
        type="select"
        id="repairPrioritySelect"
        defaultValue={this.state.priority}
    //    value={this.state.priority}
        name="priority"
        onChange={this.handleInputChange}
        >
        <option>low</option>
        <option>medium</option>
        <option>high</option>
        </Input>
    </FormGroup>
    </Col>
    <Col md={4}>
    <FormGroup>
        <Label for="repairStatus">Repair Status</Label>
        <Input
        type="select"
        id="repairStatusSelect"
        defaultValue={this.state.status}
    //    value={this.state.status}
        name="status"
        onChange={this.handleInputChange}
        >
        <option>Thinking about it!</option>
        <option>Getting Bids</option>
        <option>In Progress</option>
        <option>Completed</option>
        </Input>
    </FormGroup>
    </Col>
    </Row>
    <FormGroup>
    <Row form>
    <Col md={4}>
            <Label for="isVendor">Assign a Contractor/Vendor?</Label>
    </Col>
    <Col md={4}>
        <input
        type="checkbox"
        name="vendorCheckbox"
        checked={this.state.isVendor}
        onChange={this.handleCheck}
        />
    </Col>
    </Row>
    </FormGroup>

    {this.state.isVendor ? (
        <FormGroup>
        <Label for="repairVendor"></Label>
        <Input
            type="select"
            id="repairVendorSelect"
    //        defaultValue={this.state.vendor}
            value={this.state.vendor}
            name="vendor"
            onChange={this.handleInputChange}
        >
            <option>Big Bob</option>
            <option>Julio</option>
        </Input>
        </FormGroup>
    ) : (
        <p />
    )}

        <FormGroup>
        <Label for="repairNotes">Additional Notes/Instruction</Label>
        <Input
        type="textarea"
        id="repairNotesInput"
        rows="3"
        defaultValue={this.state.notes}
    //    value={this.state.notes}
        name="notes"
        onChange={this.handleInputChange}
        />
        </FormGroup>



    <button
        onClick={this.handleFormSubmit}
        className="btn btn-block btn-success mt-3"
    >
        Update
    </button>
    </Form>
        </ModalBody>
        </Modal>
            </div>

    </div>
  );
}
}
