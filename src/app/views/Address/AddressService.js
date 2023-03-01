import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_SWAGGER;

//province
export const searchProvinces = (searchDto) => {
  return axios.post(API_PATH + "/provinces/search", searchDto);
};

export const deleteProvinceById = (provinceId) => {
  return axios.delete(API_PATH + `/provinces/${provinceId}`);
};

export const addNewProvince = (provinceData) => {
  return axios.post(API_PATH + "/provinces", provinceData);
};

export const editProvinceById = (provinceData, provinceId) => {
  return axios.put(API_PATH + `/provinces/${provinceId}`, provinceData);
};

//district
export const searchDistricts = (searchDto) => {
  return axios.post(API_PATH + "/districts/search", searchDto);
};

export const deleteDistrictById = (districtId) => {
  return axios.delete(API_PATH + `/districts/${districtId}`);
};

export const addNewDistrict = (districtData) => {
  return axios.post(API_PATH + "/districts", districtData);
};

export const editDistrictById = (districtData, districtId) => {
  return axios.put(API_PATH + `/districts/${districtId}`, districtData);
};

//commune
export const searchCommunes = (searchDto) => {
  return axios.post(API_PATH + "/communes/search", searchDto);
};

export const deleteCommuneById = (communeId) => {
  return axios.delete(API_PATH + `/communes/${communeId}`);
};

export const addNewCommune = (communeData) => {
  return axios.post(API_PATH + "/communes", communeData);
};

export const editCommuneById = (communeData, communeId) => {
  return axios.put(API_PATH + `/communes/${communeId}`, communeData);
};
