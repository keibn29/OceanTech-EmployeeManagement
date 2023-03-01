import { all } from "redux-saga/effects";
import AddressSaga from "./AddressSaga";
import EmployeeSaga from "./EmployeeSaga";

export default function* RootSaga() {
  yield all([EmployeeSaga(), AddressSaga()]);
}
