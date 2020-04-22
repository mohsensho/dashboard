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

export default class BoardUser extends Component {
    constructor({searchResult}) {
      super();


      this.state = {
        currentUser: AuthService.getCurrentUser(),
        contentTask: "",
        contentTaskType: "",
        contentCustomer: "",
        contentTaskStatus: "",
       ////
        message: "",
        taskDate: "",
        ECDDate: "",
        startDate: "",
        endDate: "",
        fromECDTime: "",
        toECDTime: "",
        searchResult: searchResult
      };
      
    }

    
    componentWillReceiveProps({searchResult}){
        console.log(searchResult.data);
        if(searchResult.data){
        this.state.contentTask = searchResult.data; 
        }
        //this.state.searchResult = searchResult;

        
    }

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
    }
    loadTasks(){
        // if(searchResult !== null){

        // }
		return Object.entries(this.state.contentTask).map(([key, value], i) => {
      let badgType= "badge-primary";

      if(value.taskstatus.tStatus == "Completed"){
          badgType = "badge-success";
      } else if(value.taskstatus.tStatus == "On Hold"){
        badgType = "badge-warning";
      } else if(value.taskstatus.tStatus == "In Progress"){
        badgType = "badge-primary";
      }
      
			return (
                <tr>
                    <td className="text-center">{value.tasktype.tType}</td>
                    <td>{value.taskName}</td>
                    <td className="text-center">{String(value.taskDate).substring(0,10)}</td>
                    <td></td>
                    <td className="text-center">{value.customer.cName}</td>
                    <td className="text-center">{value.numberOfResource}</td>
                    <td className="text-center">{value.numberOfRound}</td>
                    <td className="text-center">{String(value.ECD).substring(0,10)}</td>
                    <td></td>
                    <td className="text-center">
                        <Progress striped className="mb-3" animated value={value.percentOfComplete}>
                        {value.percentOfComplete}%
                        </Progress>
                    </td>
                    <td className="text-center">{value.timeSpent}</td>
                    <td className="text-center">
                        <div className={"badge "+ badgType} >{value.taskstatus.tStatus}</div>
                    </td>
                    <td><div className="badge badge-info" title={value.user.email}>i</div></td>
                    <td></td>
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
        console.log("hala"+this.state.searchResult);
      const { currentUser } = this.state;
        return(
            <Fragment>
            
                            <tr>
                                <td>Type</td>
                                <td>Name</td>
                                <td>Date</td>
                                <td></td>
                                <td>Customer</td>
                                <td>#Resource</td>
                                <td>#Round</td>
                                <td>ECD</td>
                                <td></td>
                                <td>%Complete</td>
                                <td>Time Spent</td>
                                <td>Status</td>
                                <td>Created By</td>
                            </tr>
                            {this.loadTasks()}
                            <tr>
                                <td>
                                  <Link to={"/add"}>
                                    <button className="btn-wide btn btn-success">Add</button>
                                  </Link>
                                </td>
                                <td>{this.state.searchResult}</td>
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