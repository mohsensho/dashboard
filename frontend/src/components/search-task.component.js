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

export default class Search extends Component {
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
        toECDTime: ""
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
    //this.form.validateAll();

    //if (this.checkBtn.context._errors.length === 0) {
    //let trimTaskDate = this.state.taskDate;
    //trimTaskDate = String(trimTaskDate).substring(4, 16);
    //console.log("ecd date is= "+this.state.ECDDate)

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
      this.state.searchUserId,
      this.state.searchTaskType,
      this.state.searchCustomerId,
      this.state.searchTaskstatusId
    ).then(
      response => {
        
        this.setState({
          message: "Search Result",
          successful: true,
        });
        console.log(response);
        //this.state.contentTask=response;
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
    //     DashService.getAllTask().then(
    //     (response) => {
    //       this.setState({
    //         contentTask: response.data,
    //       });
    //     },
    //     (error) => {
    //       this.setState({
    //         contentTask:
    //           (error.response &&
    //             error.response.data &&
    //             error.response.data.message) ||
    //           error.message ||
    //           error.toString(),
    //       });
    //     }
    //   );
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
//     loadTasks(){
// 		return Object.entries(this.state.contentTask).map(([key, value], i) => {
//       let badgType= "badge-primary";

//       if(value.taskstatus.tStatus == "Completed"){
//           badgType = "badge-success";
//       } else if(value.taskstatus.tStatus == "On Hold"){
//         badgType = "badge-warning";
//       } else if(value.taskstatus.tStatus == "In Progress"){
//         badgType = "badge-primary";
//       }
      
// 			return (
//                 <tr>
//                     <td className="text-center">{value.tasktype.tType}</td>
//                     <td>{value.taskName}</td>
//                     <td className="text-center">{String(value.taskDate).substring(0,10)}</td>
//                     <td></td>
//                     <td className="text-center">{value.customer.cName}</td>
//                     <td className="text-center">{value.numberOfResource}</td>
//                     <td className="text-center">{value.numberOfRound}</td>
//                     <td className="text-center">{String(value.ECD).substring(0,10)}</td>
//                     <td></td>
//                     <td className="text-center">
//                         <Progress striped className="mb-3" animated value={value.percentOfComplete}>
//                         {value.percentOfComplete}%
//                         </Progress>
//                     </td>
//                     <td className="text-center">{value.timeSpent}</td>
//                     <td className="text-center">
//                         <div className={"badge "+ badgType} >{value.taskstatus.tStatus}</div>
//                     </td>
//                     <td><div className="badge badge-info" title={value.user.email}>i</div></td>
//                     <td></td>
//                 </tr>
// 			);
// 		})
//   }
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
                <tr>
                    <td className="text-center">
                        <InputGroupText>
                        <span style={{ fontSize: 10 }}>Type</span>
                        </InputGroupText>
                        <InputGroup size="sm">
                        <select id="taskTypesId" className="form-control" value={this.state.inTaskType} searchOnChange={this.searchOnChangeTaskType}>
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
                        <select id="taskStatusId" className="form-control" value={this.state.inTaskstatusId} onChange={this.searchOnChangeTaskstatusId}>
                            {this.loadTaskStatus()}
                        </select>
                        </InputGroup>
                    </td>
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
            </Fragment>     
        );
    }
  }