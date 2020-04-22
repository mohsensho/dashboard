import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import DashService from "../services/dash.service";

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Row, Col, Button, CardHeader, Card, CardBody, Progress, TabContent, TabPane } from "reactstrap";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment";
import DatePicker from 'react-date-picker';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import dashService from "../services/dash.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.onChangeTaskName = this.onChangeTaskName.bind(this);
    this.onChangeTaskType = this.onChangeTaskType.bind(this);
    this.onChangeCustomerId = this.onChangeCustomerId.bind(this);
    this.onChangeTaskstatusId = this.onChangeTaskstatusId.bind(this);
    //this.handleDateChange = this.handleDateChange.bind(this);
    //this.onChangeUserId = this.onChangeUserId.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      contentTask: "",
      contentTaskType: "",
      contentCustomer: "",
      contentTaskStatus: "",
      inTaskName: "",
      inTaskDate: "",
      inResourceNum: "",
      inRoundNum: "",
      inCompleteNum: "",
      inECDDate: "",
      inTimeSpent: "",
      inUserId: AuthService.getCurrentUser().id,
      inTaskType: "",
      inCustomerId: "",
      inTaskstatus: "",
      message: "",
      taskDate: "",
      ECDDate: ""
    };
  }

  state = {
    date: new Date(),
  }

  onChange = date => {
    this.setState({ date });
    console.log("date injast:"+date.value);
  };



onChangeTaskName(e) {
  this.setState({
    inTaskName: e.target.value
  });
}
onChangeTaskType(e) {
  this.setState({
    inTaskType: e.target.value
  });
}
onChangeCustomerId(e){
  this.setState({
    inCustomerId: e.target.value
  });
}
onChangeTaskstatusId(e){
  this.setState({
    inTaskstatus: e.target.value
  });
}
// handleDateChange(dateName, dateValue) {
//   let { ECDDate, taskDate } = this.state;
  
//   if (dateName === 'taskDateTime') {
//     //taskDate =dateValue.getMonth()+'/'+dateValue.getDy();
//     taskDate = dateValue;
//   } else if (dateName === 'ECDDateTime') {
//     ECDDate = dateValue;
//   } 
//   this.setState({
//     taskDate,
//     ECDDate
//   });
// } 
handleAdd(e) {
  //console.log("userID:  "+this.state.inUserId)
  e.preventDefault();
  
  this.setState({
    message: "",
    successful: false
  });
  //this.form.validateAll();

  //if (this.checkBtn.context._errors.length === 0) {
    DashService.addTask(
      this.state.inTaskName,
      this.state.inTaskType,
      this.state.inCustomerId,
      this.state.inTaskstatusId,
      this.state.inUserId,
      this.state.taskDate
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  //}
}
// handleDateChange = (evt, date) => {
//   this.setState({
//     taskDate: date,
//   });
//   console.log(this.setState.taskDate);
// }


componentDidMount() {
    DashService.getAllTask().then(
    (response) => {
      this.setState({
        contentTask: response.data,
      });
    },
    (error) => {
      this.setState({
        contentTask:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  );
  DashService.getAllTaskType().then(
    (response) => {
      this.setState({
        contentTaskType: response.data,
      });
    },
    (error) => {
      this.setState({
        contentTaskType:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  );
  DashService.getAllCustomer().then(
    (response) => {
      this.setState({
        contentCustomer: response.data,
      });
    },
    (error) => {
      this.setState({
        contentCustomer:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  );
  DashService.getAllTaskStatus().then(
    (response) => {
      this.setState({
        contentTaskStatus: response.data,
      });
    },
    (error) => {
      this.setState({
        contentTaskStatus:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  );
}
loadTasks(){
return Object.entries(this.state.contentTask).map(([key, value], i) => {
  return (
            <tr>
                <td className="text-center text-muted">1</td>
                <td>{value.taskName}</td>
                <td className="text-center">{value.tasktype.tType}</td>
                <td className="text-center">{value.customer.cName}</td>
                <td className="text-center">{value.taskDate}</td>
                <td className="text-center">{value.numberOfResource}</td>
                <td className="text-center">{value.numberOfRound}</td>
                <td className="text-center">
                    <Progress className="mb-3" value={value.percentOfComplete}>
                    {value.percentOfComplete}%
                    </Progress>
                </td>
                <td className="text-center">{value.ECD}</td>
                <td className="text-center">{value.timeSpent}</td>
                <td className="text-center">
                    <div className="badge badge-success">{value.taskstatus.tStatus}</div>
                </td>
                <td>{value.user.username}</td>
            </tr>
    );
  })
}
loadTaskTypes(){
  return Object.entries(this.state.contentTaskType).map(([key, value], i) => {
    return (
      <option value={value.id}>{value.tType}</option>
    );
  })
}
loadCustomers(){
  return Object.entries(this.state.contentCustomer).map(([key, value], i) => {
    return (
      <option value={value.id}>{value.cName}</option>
    );
  })
}
loadTaskStatus(){
  return Object.entries(this.state.contentTaskStatus).map(([key, value], i) => {
    return (
      <option value={value.id}>{value.tStatus}</option>
    );
  })
}
  render() {
    const { currentUser } = this.state;
    //console.log("state is"+ this.state.taskDate);
        return(
            <Fragment>
            <CSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}
            >
              <div>              
                <Row>
                  <Col md="12">
                    <Card className="main-card mb-3">
                      <div className="table-responsive" style={{paddingBottom: 230}}>
                        <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                          <tbody>
                          <tr>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>Type</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <select className="form-control" value={this.state.inTaskType} onChange={this.onChangeTaskType}>
                                      <option value="null"></option>
                                      {this.loadTaskTypes()}
                                    </select>
                                    </InputGroup>
                                </td>
                                <td>
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>Name</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <Input
                                      name="inTaskName"
                                      value={this.state.inTaskName}
                                      onChange={this.onChangeTaskName}
                                    />
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroup size="sm">
                                    <InputGroupText>
                                        <span style={{ fontSize: 10 }}>Date</span>
                                    </InputGroupText>
                                    <InputGroupAddon addonType="prepend">
                                    {/* <DatePicker
                                        // name="taskDateTime"
                                        // onChange={ date =>this.handleDateChange}
                                        name="taskDateTime"
                                        selected={this.state.taskDate}
                                        value={this.state.taskDate}
                                        onChange={date => this.handleDateChange('taskDateTime', date)}
                                    /> */}
                                    <DatePicker
                                      onChange={this.onChange}
                                      value={this.state.date}
                                    />
                                    </InputGroupAddon>
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>Customer</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <select className="form-control" value={this.state.inCustomerId} onChange={this.onChangeCustomerId}>
                                      <option value="null"></option>
                                      {this.loadCustomers()}
                                    </select>
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>#Resource</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <Input />
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>#Round</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <Input />
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroup size="sm">
                                    <InputGroupText>
                                        <span style={{ fontSize: 10 }}>ECD</span>
                                    </InputGroupText>
                                    <InputGroupAddon addonType="prepend">
                                    {/* <DatePicker
                                        id="fromECD"
                                        name="ECDDateTime"
                                        selected={this.state.ECDDate}
                                        value={this.state.ECDDate}
                                        onChange={date => this.handleDateChange('ECDDateTime', date)}                                        
                                    /> */}
                                    
                                    </InputGroupAddon>
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>%Complete</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <Input />
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>Time Spent</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <Input />
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>Status</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <select className="form-control" value={this.state.inTaskstatus} onChange={this.onChangeTaskstatusId}>
                                      <option value="null"></option>
                                      {this.loadTaskStatus()}
                                    </select>
                                    </InputGroup>
                                </td>
                                <td>
                                    <button
                                    className="btn-wide btn btn-success"
                                    style={{ marginTop: 20 }}
                                    onClick={this.handleAdd}
                                    >{currentUser.id}</button>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><span style={{ padding: 20 }}></span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </CSSTransitionGroup>
          </Fragment>
        );
    }
  }