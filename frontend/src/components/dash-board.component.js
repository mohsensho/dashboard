import React, { Component, Fragment } from "react";
import AuthService from "../services/auth.service";
import DashService from "../services/dash.service";

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Row, Col, Button, CardHeader, Card, CardBody, Progress, TabContent, TabPane } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default class BoardUser extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        content: "",
      };
    }
  
    componentDidMount() {
        DashService.getAllTask().then(
        (response) => {
          this.setState({
            content: response.data,
          });
        },
        (error) => {
          this.setState({
            content:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString(),
          });
        }
      );
    }
    _renderObject(){
		return Object.entries(this.state.content).map(([key, value], i) => {
			return (
				<div key={key}>
					id: {value.id} ;
					Task name: {value.taskName}
                    taskDate: {value.id} ;
                    numberOfResource: {value.id} ;
                    numberOfRound: {value.id} ;
                    percentOfComplete: {value.id} ;
                    ECD: {value.id} ;
                    timeSpent: {value.id} ;
                    createdAt: {value.id} ;
                    updatedAt: {value.id} ;
                    userId: {value.id} ;
                    tasktypeId: {value.id} ;
                    customerId: {value.id} ;
                    taskstatusId: {value.id} ;
				</div>
			)
		})
	}
    render() {
    //   return (
    //     <div className="container">
    //       <header className="jumbotron">
    //         <h3>{this._renderObject()}</h3>
    //       </header>
    //     </div>
    //   );
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
                          <thead>
                            <tr>
                              <th className="text-center">#</th>
                              <th>Name</th>
                              <th className="text-center">Date</th>
                              <th className="text-center">Customer</th>
                              <th className="text-center"># Of Resources</th>
                              <th className="text-center"># Round</th>
                              <th className="text-center">% Complete</th>
                              <th className="text-center">ECD</th>
                              <th className="text-center">Time Spent</th>
                              <th className="text-center">Status</th>
                              <th className="text-center">Created By</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center text-muted">
                                <InputGroupText>
                                  <i className="header-icon pe-7s-search icon-gradient bg-plum-plate"></i>
                                </InputGroupText>
                              </td>
                              <td>
                                <InputGroup size="sm">
                                  <Input />
                                </InputGroup>
                              </td>
                              <td className="text-center">
                                <InputGroup size="sm">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <span style={{ fontSize: 10 }}>From</span>
                                    </InputGroupText>
                                    <DatePicker
                                      selected={this.state.startDate}
                                      onChange={this.handleChange}
                                    />
                                  </InputGroupAddon>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <span
                                        style={{ fontSize: 10, paddingRight: 12 }}
                                      >
                                        To
                                      </span>
                                    </InputGroupText>
                                    <DatePicker
                                      selected={this.state.startDate}
                                      onChange={this.handleChange}
                                    />
                                  </InputGroupAddon>
                                </InputGroup>
                              </td>
                              <td className="text-center">
                                <InputGroup size="sm">
                                  <select className="form-control">
                                    <option>Intel</option>
                                    <option>Samsung</option>
                                    <option>Micron</option>
                                  </select>
                                </InputGroup>
                              </td>
                              <td className="text-center">
                                <InputGroup size="sm">
                                  <Input />
                                </InputGroup>
                              </td>
                              <td className="text-center">
                                <InputGroup size="sm">
                                  <Input />
                                </InputGroup>
                              </td>
                              <td className="text-center">
                                <InputGroup size="sm">
                                  <Input />
                                </InputGroup>
                              </td>
                              <td className="text-center">
                                <InputGroup size="sm">
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <span style={{ fontSize: 10 }}>From</span>
                                    </InputGroupText>
                                    <DatePicker
                                      selected={this.state.startDate}
                                      onChange={this.handleChange}
                                    />
                                  </InputGroupAddon>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <span
                                        style={{ fontSize: 10, paddingRight: 12 }}
                                      >
                                        To
                                      </span>
                                    </InputGroupText>
                                    <DatePicker
                                      selected={this.state.startDate}
                                      onChange={this.handleChange}
                                    />
                                  </InputGroupAddon>
                                </InputGroup>
                              </td>
                              <td className="text-center">
                                <InputGroup size="sm">
                                  <Input />
                                </InputGroup>
                              </td>
                              <td className="text-center">
                                <InputGroup>
                                  <select className="form-control">
                                    <option>Active</option>
                                    <option>Pending</option>
                                    <option>Disabled</option>
                                  </select>
                                </InputGroup>
                              </td>
                              <td>
                                <InputGroup size="sm">
                                  <Input />
                                </InputGroup>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center text-muted">1</td>
                              <td>Task Name</td>
                              <td className="text-center">12-12-2020 8:40:20</td>
                              <td className="text-center">Intel</td>
                              <td className="text-center">5</td>
                              <td className="text-center">4</td>
                              <td className="text-center">20 %</td>
                              <td className="text-center">07-07-2020</td>
                              <td className="text-center">234 hrs</td>
                              <td className="text-center">
                                <div className="badge badge-success">Completed</div>
                              </td>
                              <td>Mohsen Shojaeifar</td>
                            </tr>
                            <tr>
                              <td className="text-center text-muted">1</td>
                              <td>Task Name</td>
                              <td className="text-center">12-12-2020 8:40:20</td>
                              <td className="text-center">Intel</td>
                              <td className="text-center">5</td>
                              <td className="text-center">4</td>
                              <td className="text-center">
                                <Progress className="mb-3" value="25">
                                  25%
                                </Progress>
                              </td>
                              <td className="text-center">07-07-2020</td>
                              <td className="text-center">234 hrs</td>
                              <td className="text-center">
                                <div className="badge badge-warning">Pending</div>
                              </td>
                              <td>Mohsen Shojaeifar</td>
                            </tr>
                            <tr>
                              <td className="text-center text-muted">1</td>
                              <td>Task Name</td>
                              <td className="text-center">12-12-2020 8:40:20</td>
                              <td className="text-center">Intel</td>
                              <td className="text-center">5</td>
                              <td className="text-center">4</td>
                              <td className="text-center">20 %</td>
                              <td className="text-center">07-07-2020</td>
                              <td className="text-center">234 hrs</td>
                              <td className="text-center">
                                <div className="badge badge-danger">
                                  In progress
                                </div>
                              </td>
                              <td>Mohsen Shojaeifar</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="d-block text-center card-footer">
                        <button className="btn-wide btn btn-success">Add</button>
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