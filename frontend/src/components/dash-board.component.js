import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import DashService from "../services/dash.service";

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Row, Col, Button, CardHeader, Card, CardBody, Progress, TabContent, TabPane } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import TaskLoad from "./task-load.component";

export default class BoardUser extends Component {
    constructor(props) {
      super(props);
      // for search task
      this.searchOnChangeTaskName = this.searchOnChangeTaskName.bind(this);
      this.searchOnChangeTaskType = this.searchOnChangeTaskType.bind(this);
      this.searchOnChangeCustomerId = this.searchOnChangeCustomerId.bind(this);
      this.searchOnChangeTaskstatusId = this.searchOnChangeTaskstatusId.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.searchOnChangeResourceNum = this.searchOnChangeResourceNum.bind(this);
      this.searchOnChangeRoundNum = this.searchOnChangeRoundNum.bind(this);
      this.searchOnChangeCompleteNum = this.searchOnChangeCompleteNum.bind(this);
      this.searchOnChangeTimeSpent = this.searchOnChangeTimeSpent.bind(this);

      //this.setState({someValue:false});
      this.setState({searchResult:false});

      this.state = {
        currentUser: AuthService.getCurrentUser(),
        contentTask: "",
        contentTaskType: "",
        contentCustomer: "",
        contentTaskStatus: "",
        //for search task
        searchTaskName: "",
        searchTaskDate: "",
        searchResourceNum: "",
        searchRoundNum: "",
        searchCompleteNum: "",
        searchECDDate: "",
        searchTimeSpent: "",
        searchUserId: AuthService.getCurrentUser().id,
        searchTaskType: "",
        searchCustomerId: "",
        searchTaskstatusId: "",
        message: "",
        taskDate: "",
        ECDDate: "",
        startDate: "",
        endDate: "",
        fromECDTime: "",
        toECDTime: "",
        searchResult: ""
      };
    }
  // for search task 
  state = {
    taskDate: new Date(),
    ECDDate: new Date(),
  }

  searchOnChangeTimeSpent(e) {
    this.setState({
      searchTimeSpent: e.target.value
    });
  }
  searchOnChangeCompleteNum(e) {
    this.setState({
      searchCompleteNum: e.target.value
    });
  }
  searchOnChangeRoundNum(e) {
    this.setState({
      searchRoundNum: e.target.value
    });
  }

  searchOnChangeResourceNum(e) {
    this.setState({
      searchResourceNum: e.target.value
    });
  }
  searchOnChangeTaskName(e) {
    this.setState({
      searchTaskName: e.target.value
    });
  }
  searchOnChangeTaskType(e) {
    this.setState({
      searchTaskType: e.target.value
    });
  }
  searchOnChangeCustomerId(e){
    this.setState({
      searchCustomerId: e.target.value
    });
  }
  searchOnChangeTaskstatusId(e){
    this.setState({
      searchTaskstatusId: e.target.value
    });
  }
  handleDateChange(dateName, dateValue) {
    //let { startDate, endDate, fromECDTime, toECDTime } = this.state;
    if (dateName === 'startDateTime') {
      this.state.startDate = dateValue;
    } else if (dateName === 'endDateTime') {
      this.state.endDate = dateValue;
    } else if (dateName === 'fromECDTime') {
      this.state.fromECDTime = dateValue;
    } else if (dateName === 'toECDTime') {
      this.state.toECDTime = dateValue;
    }
    this.setState({
    });
  }   
  handleSearch(e) {
    //e.preventDefault();
    
    this.setState({
      message: "",
      successful: false
    });
   
    DashService.searchTask(
      this.state.searchTaskName,
      this.state.startDate,
      this.state.endDate,
      this.state.searchResourceNum,
      this.state.searchRoundNum,
      this.state.searchCompleteNum,
      this.state.fromECDTime,
      this.state.toECDTime,
      this.state.searchTimeSpent,
      this.state.searchTaskType,
      this.state.searchCustomerId,
      this.state.searchTaskstatusId
    ).then(
      
      response => {
        this.setState({
          message: "Search Result",
          successful: true,
          searchResult : response
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
  }
    componentDidMount() {
    
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
                      <div className="table-responsive">
                        <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                          <tbody>
                          <tr>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>Type</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <select className="form-control" value={this.state.searchTaskType} onChange={this.searchOnChangeTaskType}>
                                        <option value=""></option>
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
                                        name="searchTaskName"
                                        value={this.state.searchTaskName}
                                        onChange={this.searchOnChangeTaskName}/>
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroup size="sm">
                                    <InputGroupText>
                                        <span style={{ fontSize: 10 }}>From</span>
                                    </InputGroupText>
                                    <InputGroupAddon addonType="prepend">
                                    <DatePicker
                                        id="start-date-time"
                                        name="startDateTime"
                                        selected={this.state.startDate}
                                        value={this.state.startDate}
                                        showPopperArrow={false}
                                        format='MM-dd-yyyy'
                                        onChange={date => this.handleDateChange('startDateTime', date)}
                                    />
                                    </InputGroupAddon>
                                    </InputGroup>
                                </td>
                                <td>
                                    <InputGroup size="sm">
                                    <InputGroupText>
                                        <span
                                        style={{ fontSize: 10, paddingRight: 12 }}
                                        >
                                        To
                                        </span>
                                    </InputGroupText>
                                    <InputGroupAddon addonType="prepend">
                                        <DatePicker                                            
                                            id="end-date-time"
                                            name="endDateTime"
                                            selected={this.state.endDate}
                                            value={this.state.endDate}
                                            showPopperArrow={false}
                                            format='MM-dd-yyyy'
                                            onChange={date => this.handleDateChange('endDateTime', date)}                                     
                                        />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>Customer</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <select id="customersId" className="form-control" value={this.state.searchCustomerId} onChange={this.searchOnChangeCustomerId}>
                                        <option value=""></option>
                                        {this.loadCustomers()}
                                    </select>
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>#Resource</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <Input  
                                        name="searchResourceNum"
                                        value={this.state.searchResourceNum}
                                        onChange={this.searchOnChangeResourceNum}
                                    />
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>#Round</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <Input 
                                        name="searchRoundNum"
                                        value={this.state.searchRoundNum}
                                        onChange={this.searchOnChangeRoundNum}
                                    />
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroup size="sm">
                                    <InputGroupText>
                                        <span style={{ fontSize: 10 }}>ECD From</span>
                                    </InputGroupText>
                                    <InputGroupAddon addonType="prepend">
                                    <DatePicker
                                        id="fromECD"
                                        name="fromECDTime"
                                        selected={this.state.fromECDTime}
                                        value={this.state.fromECDTime}
                                        showPopperArrow={false}
                                        format='MM-dd-yyyy'
                                        onChange={date => this.handleDateChange('fromECDTime', date)} 
                                    />
                                    </InputGroupAddon>
                                    </InputGroup>
                                </td>
                                <td  className="text-center">
                                    <InputGroup size="sm">
                                    <InputGroupText>
                                        <span
                                        style={{ fontSize: 10}}>ECD To</span>
                                    </InputGroupText>
                                    <InputGroupAddon addonType="prepend">
                                    <DatePicker
                                        id="toECD"
                                        name="toECDTime"
                                        selected={this.state.toECDTime}
                                        value={this.state.toECDTime}
                                        showPopperArrow={false}
                                        format='MM-dd-yyyy'
                                        onChange={date => this.handleDateChange('toECDTime', date)}                                        
                                    />
                                    </InputGroupAddon>
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>%Complete To</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <Input 
                                        name="searchCompleteNum"
                                        value={this.state.searchCompleteNum}
                                        onChange={this.searchOnChangeCompleteNum}
                                    />
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>Time Spent To</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <Input  
                                        name="searchTimeSpent"
                                        value={this.state.searchTimeSpent}
                                        onChange={this.searchOnChangeTimeSpent}
                                    />
                                    </InputGroup>
                                </td>
                                <td className="text-center">
                                    <InputGroupText>
                                    <span style={{ fontSize: 10 }}>Status</span>
                                    </InputGroupText>
                                    <InputGroup size="sm">
                                    <select id="taskStatusId" className="form-control" value={this.state.searchTaskstatusId} onChange={this.searchOnChangeTaskstatusId}>
                                        <option value=""></option>
                                        {this.loadTaskStatus()}
                                    </select>
                                    </InputGroup>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <button className="btn-wide btn btn-info" onClick={() => this.handleSearch()}>Search</button>
                                </td>
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
                            </tr>
                            <TaskLoad searchResult={this.state.searchResult}  />
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