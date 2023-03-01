import { toast } from "react-toastify";

//province
export const FETCH_PROVINCE = "FETCH_PROVINCE";
export const FETCH_PROVINCE_SUCCESS = "FETCH_PROVINCE_SUCCESS";
export const FETCH_PROVINCE_FAILED = "FETCH_PROVINCE_FAILED";

export const DELETE_PROVINCE_BY_ID = "DELETE_PROVINCE_BY_ID";
export const DELETE_PROVINCE_BY_ID_SUCCESS = "DELETE_PROVINCE_BY_ID_SUCCESS";
export const DELETE_PROVINCE_BY_ID_FAILED = "DELETE_PROVINCE_BY_ID_FAILED";

export const ADD_PROVINCE = "ADD_PROVINCE";
export const ADD_PROVINCE_SUCCESS = "ADD_PROVINCE_SUCCESS";
export const ADD_PROVINCE_FAILED = "ADD_PROVINCE_FAILED";

export const EDIT_PROVINCE_BY_ID = "EDIT_PROVINCE_BY_ID";
export const EDIT_PROVINCE_BY_ID_SUCCESS = "EDIT_PROVINCE_BY_ID_SUCCESS";
export const EDIT_PROVINCE_BY_ID_FAILED = "EDIT_PROVINCE_BY_ID_FAILED";

//district
export const FETCH_DISTRICT = "FETCH_DISTRICT";
export const FETCH_DISTRICT_SUCCESS = "FETCH_DISTRICT_SUCCESS";
export const FETCH_DISTRICT_FAILED = "FETCH_DISTRICT_FAILED";

export const DELETE_DISTRICT_BY_ID = "DELETE_DISTRICT_BY_ID";
export const DELETE_DISTRICT_BY_ID_SUCCESS = "DELETE_DISTRICT_BY_ID_SUCCESS";
export const DELETE_DISTRICT_BY_ID_FAILED = "DELETE_DISTRICT_BY_ID_FAILED";

export const ADD_DISTRICT = "ADD_DISTRICT";
export const ADD_DISTRICT_SUCCESS = "ADD_DISTRICT_SUCCESS";
export const ADD_DISTRICT_FAILED = "ADD_DISTRICT_FAILED";

export const EDIT_DISTRICT_BY_ID = "EDIT_DISTRICT_BY_ID";
export const EDIT_DISTRICT_BY_ID_SUCCESS = "EDIT_DISTRICT_BY_ID_SUCCESS";
export const EDIT_DISTRICT_BY_ID_FAILED = "EDIT_DISTRICT_BY_ID_FAILED";

//commune
export const FETCH_COMMUNE = "FETCH_COMMUNE";
export const FETCH_COMMUNE_SUCCESS = "FETCH_COMMUNE_SUCCESS";
export const FETCH_COMMUNE_FAILED = "FETCH_COMMUNE_FAILED";

export const DELETE_COMMUNE_BY_ID = "DELETE_COMMUNE_BY_ID";
export const DELETE_COMMUNE_BY_ID_SUCCESS = "DELETE_COMMUNE_BY_ID_SUCCESS";
export const DELETE_COMMUNE_BY_ID_FAILED = "DELETE_COMMUNE_BY_ID_FAILED";

export const ADD_COMMUNE = "ADD_COMMUNE";
export const ADD_COMMUNE_SUCCESS = "ADD_COMMUNE_SUCCESS";
export const ADD_COMMUNE_FAILED = "ADD_COMMUNE_FAILED";

export const EDIT_COMMUNE_BY_ID = "EDIT_COMMUNE_BY_ID";
export const EDIT_COMMUNE_BY_ID_SUCCESS = "EDIT_COMMUNE_BY_ID_SUCCESS";
export const EDIT_COMMUNE_BY_ID_FAILED = "EDIT_COMMUNE_BY_ID_FAILED";

//fetch-province
export const fetchProvinces = (searchDto) => {
  return {
    type: FETCH_PROVINCE,
    searchDto,
  };
};

export const fetchProvincesSuccess = (data) => {
  return {
    type: FETCH_PROVINCE_SUCCESS,
    data,
  };
};

export const fetchProvincesFailed = (error) => {
  toast.error(error);
  return {
    type: FETCH_PROVINCE_FAILED,
  };
};

//detele-province
export const deleteProvinceById = (provinceId) => {
  return {
    type: DELETE_PROVINCE_BY_ID,
    provinceId,
  };
};

export const deleteProvinceByIdSuccess = () => {
  toast.success("Xoá tỉnh thành công");
  return {
    type: DELETE_PROVINCE_BY_ID_SUCCESS,
  };
};

export const deleteProvinceByIdFailed = (error) => {
  toast.error(error);
  return {
    type: DELETE_PROVINCE_BY_ID_FAILED,
  };
};

//add-province
export const addProvince = (data) => {
  return {
    type: ADD_PROVINCE,
    data,
  };
};

export const addProvinceSuccess = () => {
  toast.success("Thêm mới tỉnh thành công");
  return {
    type: ADD_PROVINCE_SUCCESS,
  };
};

export const addProvinceFailed = (error) => {
  toast.error(error);
  return {
    type: ADD_PROVINCE_FAILED,
  };
};

//edit-province-by-id
export const editProvinceById = (provinceData, provinceId) => {
  return {
    type: EDIT_PROVINCE_BY_ID,
    provinceData,
    provinceId,
  };
};

export const editProvinceByIdSuccess = (data) => {
  toast.success("Sửa thông tin tỉnh thành công");
  return {
    type: EDIT_PROVINCE_BY_ID_SUCCESS,
    data,
  };
};

export const editProvinceByIdFailed = (error) => {
  toast.error(error);
  return {
    type: EDIT_PROVINCE_BY_ID_FAILED,
  };
};

//fetch-district
export const fetchDistricts = (searchDto) => {
  return {
    type: FETCH_DISTRICT,
    searchDto,
  };
};

export const fetchDistrictsSuccess = (data) => {
  return {
    type: FETCH_DISTRICT_SUCCESS,
    data,
  };
};

export const fetchDistrictsFailed = (error) => {
  toast.error(error);
  return {
    type: FETCH_DISTRICT_FAILED,
  };
};

//detele-district
export const deleteDistrictById = (districtId) => {
  return {
    type: DELETE_DISTRICT_BY_ID,
    districtId,
  };
};

export const deleteDistrictByIdSuccess = () => {
  toast.success("Xoá huyện thành công");
  return {
    type: DELETE_DISTRICT_BY_ID_SUCCESS,
  };
};

export const deleteDistrictByIdFailed = (error) => {
  toast.error(error);
  return {
    type: DELETE_DISTRICT_BY_ID_FAILED,
  };
};

//add-district
export const addDistrict = (data) => {
  return {
    type: ADD_DISTRICT,
    data,
  };
};

export const addDistrictSuccess = () => {
  toast.success("Thêm mới huyện thành công");
  return {
    type: ADD_DISTRICT_SUCCESS,
  };
};

export const addDistrictFailed = (error) => {
  toast.error(error);
  return {
    type: ADD_DISTRICT_FAILED,
  };
};

//edit-distric-by-id
export const editDistrictById = (districtData, districtId) => {
  return {
    type: EDIT_DISTRICT_BY_ID,
    districtData,
    districtId,
  };
};

export const editDistrictByIdSuccess = (data) => {
  toast.success("Sửa thông tin huyện thành công");
  return {
    type: EDIT_DISTRICT_BY_ID_SUCCESS,
    data,
  };
};

export const editDistrictByIdFailed = (error) => {
  toast.error(error);
  return {
    type: EDIT_DISTRICT_BY_ID_FAILED,
  };
};

//fetch-commune
export const fetchCommunes = (searchDto) => {
  return {
    type: FETCH_COMMUNE,
    searchDto,
  };
};

export const fetchCommunesSuccess = (data) => {
  return {
    type: FETCH_COMMUNE_SUCCESS,
    data,
  };
};

export const fetchCommunesFailed = (error) => {
  toast.error(error);
  return {
    type: FETCH_COMMUNE_FAILED,
  };
};

//detele-commune
export const deleteCommuneById = (communeId) => {
  return {
    type: DELETE_COMMUNE_BY_ID,
    communeId,
  };
};

export const deleteCommuneByIdSuccess = () => {
  toast.success("Xoá xã thành công");
  return {
    type: DELETE_COMMUNE_BY_ID_SUCCESS,
  };
};

export const deleteCommuneByIdFailed = (error) => {
  toast.error(error);
  return {
    type: DELETE_COMMUNE_BY_ID_FAILED,
  };
};

//add-commune
export const addCommune = (data) => {
  return {
    type: ADD_COMMUNE,
    data,
  };
};

export const addCommuneSuccess = () => {
  toast.success("Thêm mới xã thành công");
  return {
    type: ADD_COMMUNE_SUCCESS,
  };
};

export const addCommuneFailed = (error) => {
  toast.error(error);
  return {
    type: ADD_COMMUNE_FAILED,
  };
};

//edit-commune-by-id
export const editCommuneById = (communeData, communeId) => {
  return {
    type: EDIT_COMMUNE_BY_ID,
    communeData,
    communeId,
  };
};

export const editCommuneByIdSuccess = (data) => {
  toast.success("Sửa thông tin xã thành công");
  return {
    type: EDIT_COMMUNE_BY_ID_SUCCESS,
    data,
  };
};

export const editCommuneByIdFailed = (error) => {
  toast.error(error);
  return {
    type: EDIT_COMMUNE_BY_ID_FAILED,
  };
};
