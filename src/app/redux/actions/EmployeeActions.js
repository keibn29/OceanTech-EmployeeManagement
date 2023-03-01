import { toast } from "react-toastify";

export const FETCH_EMPLOYEE = "FETCH_EMPLOYEE";
export const FETCH_EMPLOYEE_SUCCESS = "FETCH_EMPLOYEE_SUCCESS";
export const FETCH_EMPLOYEE_FAILED = "FETCH_EMPLOYEE_FAILED";

export const DELETE_EMPLOYEE_BY_ID = "DELETE_EMPLOYEE_BY_ID";
export const DELETE_EMPLOYEE_BY_ID_SUCCESS = "DELETE_EMPLOYEE_BY_ID_SUCCESS";
export const DELETE_EMPLOYEE_BY_ID_FAILED = "DELETE_EMPLOYEE_BY_ID_FAILED";

export const CREATE_EMPLOYEE = "CREATE_EMPLOYEE";
export const CREATE_EMPLOYEE_SUCCESS = "CREATE_EMPLOYEE_SUCCESS";
export const CREATE_EMPLOYEE_FAILED = "CREATE_EMPLOYEE_FAILED";

export const EDIT_EMPLOYEE_BY_ID = "EDIT_EMPLOYEE_BY_ID";
export const EDIT_EMPLOYEE_BY_ID_SUCCESS = "EDIT_EMPLOYEE_BY_ID_SUCCESS";
export const EDIT_EMPLOYEE_BY_ID_FAILED = "EDIT_EMPLOYEE_BY_ID_FAILED";

export const ADD_DIPLOMA = "ADD_DIPLOMA";
export const ADD_DIPLOMA_SUCCESS = "ADD_DIPLOMA_SUCCESS";
export const ADD_DIPLOMA_FAILED = "ADD_DIPLOMA_FAILED";

//fetch-employee
export const fetchEmployees = (searchDto) => {
  return {
    type: FETCH_EMPLOYEE,
    searchDto,
  };
};

export const fetchEmployeesSuccess = (data) => {
  return {
    type: FETCH_EMPLOYEE_SUCCESS,
    data,
  };
};

export const fetchEmployeesFailed = (error) => {
  toast.error(error);
  return {
    type: FETCH_EMPLOYEE_FAILED,
  };
};

//delete-employee-by-id
export const deleteEmployeeById = (employeeId) => {
  return {
    type: DELETE_EMPLOYEE_BY_ID,
    employeeId,
  };
};

export const deleteEmployeeByIdSuccess = () => {
  toast.success("Xoá nhân viên thành công");
  return {
    type: DELETE_EMPLOYEE_BY_ID_SUCCESS,
  };
};

export const deleteEmployeeByIdFailed = (error) => {
  toast.error(error);
  return {
    type: DELETE_EMPLOYEE_BY_ID_FAILED,
  };
};

//create-employee
export const createEmployee = (data) => {
  return {
    type: CREATE_EMPLOYEE,
    data,
  };
};

export const createEmployeeSuccess = () => {
  toast.success("Thêm mới nhân viên thành công");
  return {
    type: CREATE_EMPLOYEE_SUCCESS,
  };
};

export const createEmployeeFailed = (error) => {
  toast.error(error);
  return {
    type: CREATE_EMPLOYEE_FAILED,
  };
};

//edit-employee-by-id
export const editEmployeeById = (employeeData, employeeId) => {
  return {
    type: EDIT_EMPLOYEE_BY_ID,
    employeeData,
    employeeId,
  };
};

export const editEmployeeByIdSuccess = (data) => {
  toast.success("Sửa thông tin nhân viên thành công");
  return {
    type: EDIT_EMPLOYEE_BY_ID_SUCCESS,
    data,
  };
};

export const editEmployeeByIdFailed = (error) => {
  toast.error(error);
  return {
    type: EDIT_EMPLOYEE_BY_ID_FAILED,
  };
};

//add-diploma
export const addDiploma = (data) => {
  return {
    type: ADD_DIPLOMA,
    data,
  };
};

export const addDiplomaSuccess = () => {
  toast.success("Thêm chứng chỉ thành công");
  return {
    type: ADD_DIPLOMA_SUCCESS,
  };
};

export const addDiplomaFailed = (error) => {
  toast.error(error);
  return {
    type: ADD_DIPLOMA_FAILED,
  };
};
