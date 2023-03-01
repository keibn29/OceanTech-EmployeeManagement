import * as EmployeeActions from "../actions/EmployeeActions";

const initialState = {
  listEmployees: [],
  isOpenEmployeeDialog: true,
  isOpenConfirmationDialog: true,
  isOpenDiplomaDialog: true,
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    //fetch-employee
    case EmployeeActions.FETCH_EMPLOYEE: {
      return {
        ...state,
      };
    }
    case EmployeeActions.FETCH_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        listEmployees: action.data,
      };
    }
    case EmployeeActions.FETCH_EMPLOYEE_FAILED: {
      return {
        ...state,
        listEmployees: [],
      };
    }

    //delete-employee-by-id
    case EmployeeActions.DELETE_EMPLOYEE_BY_ID: {
      return {
        ...state,
        isOpenConfirmationDialog: true,
      };
    }
    case EmployeeActions.DELETE_EMPLOYEE_BY_ID_SUCCESS: {
      return {
        ...state,
        isOpenConfirmationDialog: false,
      };
    }
    case EmployeeActions.DELETE_EMPLOYEE_BY_ID_FAILED: {
      return {
        ...state,
        isOpenConfirmationDialog: false,
      };
    }

    //create-employee
    case EmployeeActions.CREATE_EMPLOYEE: {
      return {
        ...state,
        isOpenEmployeeDialog: true,
      };
    }
    case EmployeeActions.CREATE_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        isOpenEmployeeDialog: false,
      };
    }
    case EmployeeActions.CREATE_EMPLOYEE_FAILED: {
      return {
        ...state,
        isOpenEmployeeDialog: true,
      };
    }

    //edit-employee-by-id
    case EmployeeActions.EDIT_EMPLOYEE_BY_ID: {
      return {
        ...state,
        isOpenEmployeeDialog: true,
      };
    }
    case EmployeeActions.EDIT_EMPLOYEE_BY_ID_SUCCESS: {
      return {
        ...state,
        listEmployees: action.data,
        isOpenEmployeeDialog: false,
      };
    }
    case EmployeeActions.EDIT_EMPLOYEE_BY_ID_FAILED: {
      return {
        ...state,
        listEmployees: [],
        isOpenEmployeeDialog: true,
      };
    }

    //add-diploma
    case EmployeeActions.ADD_DIPLOMA: {
      return {
        ...state,
        isOpenDiplomaDialog: true,
      };
    }
    case EmployeeActions.ADD_DIPLOMA_SUCCESS: {
      return {
        ...state,
        isOpenDiplomaDialog: false,
      };
    }
    case EmployeeActions.ADD_DIPLOMA_FAILED: {
      return {
        ...state,
        isOpenDiplomaDialog: true,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default EmployeeReducer;
