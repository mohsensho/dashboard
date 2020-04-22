import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/task/";
const API_URL_TYPE = "http://localhost:8080/api/tasktype";
const API_URL_CUSTOMER = "http://localhost:8080/api/customer";
const API_URL_STATUS = "http://localhost:8080/api/taskstatus";

class DashService {
  getAllTask() {
    return axios.get(API_URL, { headers: authHeader() });
  }
  getAllTaskType() {
    return axios.get(API_URL_TYPE, { headers: authHeader() });
  }
  getAllCustomer() {
    return axios.get(API_URL_CUSTOMER, { headers: authHeader() });
  }
  getAllTaskStatus() {
    return axios.get(API_URL_STATUS, { headers: authHeader() });
  }
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
  addTask(taskName,inTaskDate,inResourceNum, inRoundNum, inCompleteNum, inECDDate, inTimeSpent, inUserId,inTaskType,inCustomerId,inTaskStatus) {
    return axios.post(API_URL, {
      "taskname": taskName,
      "taskdate": inTaskDate,
      "resourcenumber": inResourceNum,
      "roundnumber": inRoundNum,
      "completepercent": inCompleteNum,
      "ECD": inECDDate,
      "timespent": inTimeSpent,
      "userid": inUserId,
      "tasktypeid": inTaskType,
      "customerid": inCustomerId,
      "taskstatusid": inTaskStatus
    });

  }
 searchTask(taskName,inStartDate,inEndDate,inResourceNum, inRoundNum, inCompleteNum, inFromECDTime, inToECDTime, inTimeSpent,inTaskType,inCustomerId,inTaskStatus) {
 
    return axios.get(API_URL, {
      params: {
        taskName: taskName,
        taskDateFrom: inStartDate,
        taskDateTo: inEndDate,
        resource: inResourceNum,
        round: inRoundNum,
        completeTo: inCompleteNum,
        ECDFrom: inFromECDTime,
        ECDTo: inToECDTime,
        timeSpentTo: inTimeSpent,
        userid: "",
        tasktypeId: inTaskType,
        customerId: inCustomerId,
        taskstatusId: inTaskStatus
      }
    });

  }
  deleteTask(taskId) {

      return axios.delete(API_URL + "/" + taskId);
  
    }
  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new DashService();
