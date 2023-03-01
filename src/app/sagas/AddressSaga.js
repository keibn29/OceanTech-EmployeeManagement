import { takeLatest, call, put } from "redux-saga/effects";
import * as AddressService from "../views/Address/AddressService";
import * as AddressActions from "../redux/actions/AddressActions";

//province
function* fetchProvinceSaga(payload) {
  try {
    const res = yield call(AddressService.searchProvinces, payload.searchDto);
    const { data, code, message } = res.data;
    if (code && code === 200) {
      yield put(AddressActions.fetchProvincesSuccess(data));
    } else {
      yield put(AddressActions.fetchProvincesFailed(message));
    }
  } catch (e) {
    yield put(AddressActions.fetchProvincesFailed(e));
  }
}

function* deleteProvinceByIdSaga(payload) {
  try {
    const res = yield call(
      AddressService.deleteProvinceById,
      payload.provinceId
    );
    const { code, message } = res.data;
    if (code && code === 200) {
      yield put(AddressActions.deleteProvinceByIdSuccess());
    } else {
      yield put(AddressActions.deleteProvinceByIdFailed(message));
    }
  } catch (e) {
    yield put(AddressActions.deleteProvinceByIdFailed(e));
  }
}

function* addProvinceSaga(payload) {
  try {
    const res = yield call(AddressService.addNewProvince, payload.data);
    const { code, message } = res.data;
    if (code && code === 200) {
      yield put(AddressActions.addProvinceSuccess());
    } else {
      yield put(AddressActions.addProvinceFailed(message));
    }
  } catch (e) {
    yield put(AddressActions.addProvinceFailed(e));
  }
}

function* editProvinceByIdSaga(payload) {
  try {
    const res = yield call(
      AddressService.editProvinceById,
      payload.provinceData,
      payload.provinceId
    );
    const { data, code, message } = res.data;
    if (code && code === 200) {
      yield put(AddressActions.editProvinceByIdSuccess(data));
    } else {
      yield put(AddressActions.editProvinceByIdFailed(message));
    }
  } catch (e) {
    yield put(AddressActions.editProvinceByIdFailed(e));
  }
}

//district
function* fetchDistrictSaga(payload) {
  try {
    const res = yield call(AddressService.searchDistricts, payload.searchDto);
    const { data, code, message } = res.data;
    if (code && code === 200) {
      yield put(AddressActions.fetchDistrictsSuccess(data));
    } else {
      yield put(AddressActions.fetchDistrictsFailed(message));
    }
  } catch (e) {
    yield put(AddressActions.fetchDistrictsFailed(e));
  }
}

function* deleteDistrictByIdSaga(payload) {
  try {
    const res = yield call(
      AddressService.deleteDistrictById,
      payload.districtId
    );
    const { code, message } = res.data;
    if (code && code === 200) {
      yield put(AddressActions.deleteDistrictByIdSuccess());
    } else {
      yield put(AddressActions.deleteDistrictByIdFailed(message));
    }
  } catch (e) {
    yield put(AddressActions.deleteDistrictByIdFailed(e));
  }
}

function* addDistrictSaga(payload) {
  try {
    const res = yield call(AddressService.addNewDistrict, payload.data);
    const { code, message } = res.data;
    if (code && code === 200) {
      yield put(AddressActions.addDistrictSuccess());
    } else {
      yield put(AddressActions.addDistrictFailed(message));
    }
  } catch (e) {
    yield put(AddressActions.addDistrictFailed(e));
  }
}

function* editDistrictByIdSaga(payload) {
  try {
    const res = yield call(
      AddressService.editDistrictById,
      payload.districtData,
      payload.districtId
    );
    const { data, code, message } = res.data;
    if (code && code === 200) {
      yield put(AddressActions.editDistrictByIdSuccess(data));
    } else {
      yield put(AddressActions.editDistrictByIdFailed(message));
    }
  } catch (e) {
    yield put(AddressActions.editDistrictByIdFailed(e));
  }
}

//commune
function* fetchCommuneSaga(payload) {
  try {
    const res = yield call(AddressService.searchCommunes, payload.searchDto);
    const { data, code, message } = res.data;
    if (code && code === 200) {
      yield put(AddressActions.fetchCommunesSuccess(data));
    } else {
      yield put(AddressActions.fetchCommunesFailed(message));
    }
  } catch (e) {
    yield put(AddressActions.fetchCommunesFailed(e));
  }
}

function* deleteCommuneByIdSaga(payload) {
  try {
    const res = yield call(AddressService.deleteCommuneById, payload.communeId);
    const { code, message } = res.data;
    if (code && code === 200) {
      yield put(AddressActions.deleteCommuneByIdSuccess());
    } else {
      yield put(AddressActions.deleteCommuneByIdFailed(message));
    }
  } catch (e) {
    yield put(AddressActions.deleteCommuneByIdFailed(e));
  }
}

function* addCommuneSaga(payload) {
  try {
    const res = yield call(AddressService.addNewCommune, payload.data);
    const { code, message } = res.data;
    if (code && code === 200) {
      yield put(AddressActions.addCommuneSuccess());
    } else {
      yield put(AddressActions.addCommuneFailed(message));
    }
  } catch (e) {
    yield put(AddressActions.addCommuneFailed(e));
  }
}

function* editCommuneByIdSaga(payload) {
  try {
    const res = yield call(
      AddressService.editCommuneById,
      payload.communeData,
      payload.communeId
    );
    const { data, code, message } = res.data;
    if (code && code === 200) {
      yield put(AddressActions.editCommuneByIdSuccess(data));
    } else {
      yield put(AddressActions.editCommuneByIdFailed(message));
    }
  } catch (e) {
    yield put(AddressActions.editCommuneByIdFailed(e));
  }
}

function* AddressSaga() {
  //province
  yield takeLatest(AddressActions.FETCH_PROVINCE, fetchProvinceSaga);
  yield takeLatest(
    AddressActions.DELETE_PROVINCE_BY_ID,
    deleteProvinceByIdSaga
  );
  yield takeLatest(AddressActions.ADD_PROVINCE, addProvinceSaga);
  yield takeLatest(AddressActions.EDIT_PROVINCE_BY_ID, editProvinceByIdSaga);
  //district
  yield takeLatest(AddressActions.FETCH_DISTRICT, fetchDistrictSaga);
  yield takeLatest(
    AddressActions.DELETE_DISTRICT_BY_ID,
    deleteDistrictByIdSaga
  );
  yield takeLatest(AddressActions.ADD_DISTRICT, addDistrictSaga);
  yield takeLatest(AddressActions.EDIT_DISTRICT_BY_ID, editDistrictByIdSaga);
  //commune
  yield takeLatest(AddressActions.FETCH_COMMUNE, fetchCommuneSaga);
  yield takeLatest(AddressActions.DELETE_COMMUNE_BY_ID, deleteCommuneByIdSaga);
  yield takeLatest(AddressActions.ADD_COMMUNE, addCommuneSaga);
  yield takeLatest(AddressActions.EDIT_COMMUNE_BY_ID, editCommuneByIdSaga);
}

export default AddressSaga;
