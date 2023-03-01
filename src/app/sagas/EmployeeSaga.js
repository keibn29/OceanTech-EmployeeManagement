import { takeLatest, call, put } from "redux-saga/effects";
import * as EmployeeService from "../views/Employee/EmployeeService";
import * as EmployeeActions from "../redux/actions/EmployeeActions";

function* fetchEmployeeSaga(payload) {
  try {
    const res = yield call(EmployeeService.searchEmployees, payload.searchDto);
    const { data, code, message } = res.data;
    if (code && code === 200) {
      yield put(EmployeeActions.fetchEmployeesSuccess(data));
    } else {
      yield put(EmployeeActions.fetchEmployeesFailed(message));
    }
  } catch (e) {
    yield put(EmployeeActions.fetchEmployeesFailed(e));
  }
}

function* deleteEmployeeByIdSaga(payload) {
  try {
    const res = yield call(
      EmployeeService.deleteEmployeeById,
      payload.employeeId
    );
    const { code, message } = res.data;
    if (code && code === 200) {
      yield put(EmployeeActions.deleteEmployeeByIdSuccess());
    } else {
      yield put(EmployeeActions.deleteEmployeeByIdFailed(message));
    }
  } catch (e) {
    yield put(EmployeeActions.deleteEmployeeByIdFailed(e));
  }
}

function* createEmployeeSaga(payload) {
  try {
    const res = yield call(EmployeeService.createNewEmployee, payload.data);
    const { code, message } = res.data;
    if (code && code === 200) {
      yield put(EmployeeActions.createEmployeeSuccess());
    } else {
      yield put(EmployeeActions.createEmployeeFailed(message));
    }
  } catch (e) {
    yield put(EmployeeActions.createEmployeeFailed(e));
  }
}

function* editEmployeeByIdSaga(payload) {
  try {
    const res = yield call(
      EmployeeService.editEmployeeById,
      payload.employeeData,
      payload.employeeId
    );
    const { data, code, message } = res.data;
    if (code && code === 200) {
      yield put(EmployeeActions.editEmployeeByIdSuccess(data));
    } else {
      yield put(EmployeeActions.editEmployeeByIdFailed(message));
    }
  } catch (e) {
    yield put(EmployeeActions.editEmployeeByIdFailed(e));
  }
}

//add-diploma
function* addDiplomaSaga(payload) {
  try {
    const res = yield call(EmployeeService.addDiploma, payload.data);
    const { code, message } = res.data;
    if (code && code === 200) {
      yield put(EmployeeActions.addDiplomaSuccess());
    } else {
      yield put(EmployeeActions.addDiplomaFailed(message));
    }
  } catch (e) {
    yield put(EmployeeActions.addDiplomaFailed(e));
  }
}

function* EmployeeSaga() {
  yield takeLatest(EmployeeActions.FETCH_EMPLOYEE, fetchEmployeeSaga);
  yield takeLatest(
    EmployeeActions.DELETE_EMPLOYEE_BY_ID,
    deleteEmployeeByIdSaga
  );
  yield takeLatest(EmployeeActions.CREATE_EMPLOYEE, createEmployeeSaga);
  yield takeLatest(EmployeeActions.EDIT_EMPLOYEE_BY_ID, editEmployeeByIdSaga);
  //add-diploma
  yield takeLatest(EmployeeActions.ADD_DIPLOMA, addDiplomaSaga);
}

export default EmployeeSaga;
