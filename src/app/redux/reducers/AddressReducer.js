import * as AddressActions from "../actions/AddressActions";

const initialState = {
  listProvinces: [],
  listDistricts: [],
  listCommunes: [],
  isOpenConfirmationDialog: true,
  isOpenItemDialog: true,
};

const AddressReducer = (state = initialState, action) => {
  switch (action.type) {
    //fetch-province
    case AddressActions.FETCH_PROVINCE: {
      return {
        ...state,
      };
    }
    case AddressActions.FETCH_PROVINCE_SUCCESS: {
      return {
        ...state,
        listProvinces: action.data,
      };
    }
    case AddressActions.FETCH_PROVINCE_FAILED: {
      return {
        ...state,
        listProvinces: [],
      };
    }
    //add-province
    case AddressActions.ADD_PROVINCE: {
      return {
        ...state,
        isOpenItemDialog: true,
      };
    }
    case AddressActions.ADD_PROVINCE_SUCCESS: {
      return {
        ...state,
        isOpenItemDialog: false,
      };
    }
    case AddressActions.ADD_PROVINCE_FAILED: {
      return {
        ...state,
        isOpenItemDialog: true,
      };
    }
    //delete-province
    case AddressActions.DELETE_PROVINCE_BY_ID: {
      return {
        ...state,
        isOpenConfirmationDialog: true,
      };
    }
    case AddressActions.DELETE_PROVINCE_BY_ID_SUCCESS: {
      return {
        ...state,
        isOpenConfirmationDialog: false,
      };
    }
    case AddressActions.DELETE_PROVINCE_BY_ID_FAILED: {
      return {
        ...state,
        isOpenConfirmationDialog: false,
      };
    }
    //edit-province
    case AddressActions.EDIT_PROVINCE_BY_ID: {
      return {
        ...state,
        isOpenItemDialog: true,
      };
    }
    case AddressActions.EDIT_PROVINCE_BY_ID_SUCCESS: {
      return {
        ...state,
        listProvinces: action.data,
        isOpenItemDialog: false,
      };
    }
    case AddressActions.EDIT_PROVINCE_BY_ID_FAILED: {
      return {
        ...state,
        listProvinces: [],
        isOpenItemDialog: true,
      };
    }

    //fetch-district
    case AddressActions.FETCH_DISTRICT: {
      return {
        ...state,
      };
    }
    case AddressActions.FETCH_DISTRICT_SUCCESS: {
      return {
        ...state,
        listDistricts: action.data,
      };
    }
    case AddressActions.FETCH_DISTRICT_FAILED: {
      return {
        ...state,
        listDistricts: [],
      };
    }
    //add-district
    case AddressActions.ADD_DISTRICT: {
      return {
        ...state,
        isOpenItemDialog: true,
      };
    }
    case AddressActions.ADD_DISTRICT_SUCCESS: {
      return {
        ...state,
        isOpenItemDialog: false,
      };
    }
    case AddressActions.ADD_DISTRICT_FAILED: {
      return {
        ...state,
        isOpenItemDialog: true,
      };
    }
    //delete-district
    case AddressActions.DELETE_DISTRICT_BY_ID: {
      return {
        ...state,
        isOpenConfirmationDialog: true,
      };
    }
    case AddressActions.DELETE_DISTRICT_BY_ID_SUCCESS: {
      return {
        ...state,
        isOpenConfirmationDialog: false,
      };
    }
    case AddressActions.DELETE_DISTRICT_BY_ID_FAILED: {
      return {
        ...state,
        isOpenConfirmationDialog: false,
      };
    }
    //edit-dsitrict
    case AddressActions.EDIT_DISTRICT_BY_ID: {
      return {
        ...state,
        isOpenItemDialog: true,
      };
    }
    case AddressActions.EDIT_DISTRICT_BY_ID_SUCCESS: {
      return {
        ...state,
        listProvinces: action.data,
        isOpenItemDialog: false,
      };
    }
    case AddressActions.EDIT_DISTRICT_BY_ID_FAILED: {
      return {
        ...state,
        listProvinces: [],
        isOpenItemDialog: true,
      };
    }

    //fetch-commune
    case AddressActions.FETCH_COMMUNE: {
      return {
        ...state,
      };
    }
    case AddressActions.FETCH_COMMUNE_SUCCESS: {
      return {
        ...state,
        listCommunes: action.data,
      };
    }
    case AddressActions.FETCH_COMMUNE_FAILED: {
      return {
        ...state,
        listCommunes: [],
      };
    }
    //add-commune
    case AddressActions.ADD_COMMUNE: {
      return {
        ...state,
        isOpenItemDialog: true,
      };
    }
    case AddressActions.ADD_COMMUNE_SUCCESS: {
      return {
        ...state,
        isOpenItemDialog: false,
      };
    }
    case AddressActions.ADD_COMMUNE_FAILED: {
      return {
        ...state,
        isOpenItemDialog: true,
      };
    }
    //delete-commune
    case AddressActions.DELETE_COMMUNE_BY_ID: {
      return {
        ...state,
        isOpenConfirmationDialog: true,
      };
    }
    case AddressActions.DELETE_COMMUNE_BY_ID_SUCCESS: {
      return {
        ...state,
        isOpenConfirmationDialog: false,
      };
    }
    case AddressActions.DELETE_COMMUNE_BY_ID_FAILED: {
      return {
        ...state,
        isOpenConfirmationDialog: false,
      };
    }
    //edit-dsitrict
    case AddressActions.EDIT_COMMUNE_BY_ID: {
      return {
        ...state,
        isOpenItemDialog: true,
      };
    }
    case AddressActions.EDIT_COMMUNE_BY_ID_SUCCESS: {
      return {
        ...state,
        listProvinces: action.data,
        isOpenItemDialog: false,
      };
    }
    case AddressActions.EDIT_COMMUNE_BY_ID_FAILED: {
      return {
        ...state,
        listProvinces: [],
        isOpenItemDialog: true,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default AddressReducer;
