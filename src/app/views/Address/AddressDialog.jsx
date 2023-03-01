import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Dialog,
  Button,
  Grid,
  MenuItem,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Icon,
} from "@material-ui/core";
import _ from "lodash";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import * as AddressActions from "../../redux/actions/AddressActions";

class AddressDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      itemId: "",
      listProvinces: [],
      listDistricts: [],
      provinceSelected: {},
      districtSelected: {},
    };
  }

  componentDidMount() {
    let { listProvinces, listDistricts } = this.props;
    this.getItemEditedInformation();
    this.setState({
      listProvinces,
      listDistricts,
    });
    this.handleAddValidationRule();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listProvinces !== this.props.listProvinces) {
      this.setState({
        listProvinces: this.props.listProvinces,
      });
    }
    if (prevProps.listDistricts !== this.props.listDistricts) {
      this.setState({
        listDistricts: this.props.listDistricts,
      });
    }
  }

  handleAddValidationRule = () => {
    ValidatorForm.addValidationRule("isCode", (value) => {
      if (value.length !== 6) {
        return false;
      }
      return true;
    });
  };

  handleFormSubmit = () => {
    let { name, code, provinceSelected, districtSelected, itemId } = this.state;
    let { nameItem } = this.props;

    let itemData = {
      name,
      code,
      province: provinceSelected,
      district: districtSelected,
    };

    console.log("check itemData: ", itemData);

    if (!itemId) {
      if (nameItem === "province") {
        this.props.addProvince(itemData);
      }
      if (nameItem === "district") {
        this.props.addDistrict(itemData);
      }
      if (nameItem === "commune") {
        this.props.addCommune(itemData);
      }
    }
    if (itemId) {
      if (nameItem === "province") {
        this.props.editProvinceById(itemData, itemId);
      }
      if (nameItem === "district") {
        this.props.editDistrictById(itemData, itemId);
      }
      if (nameItem === "commune") {
        this.props.editCommuneById(itemData, itemId);
      }
    }
  };

  getItemEditedInformation = () => {
    let { itemEdited } = this.props;

    if (itemEdited && !_.isEmpty(itemEdited)) {
      this.setState({
        ...itemEdited,
        itemId: itemEdited.id,
      });
    }
  };

  handleChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleChangeSelect = (event, id) => {
    if (id === "provinceSelected") {
      this.setState({
        provinceSelected: event.target.value,
      });
    }
    if (id === "districtSelected") {
      this.setState({
        districtSelected: event.target.value,
      });
    }
  };

  render() {
    let {
      isOpen,
      handleCloseItemDialog,
      labelName,
      codeName,
      titleDialog,
      nameItem,
    } = this.props;
    let {
      name,
      code,
      itemId,
      listProvinces,
      listDistricts,
      provinceSelected,
      districtSelected,
    } = this.state;

    return (
      <Dialog open={isOpen} maxWidth="xs" fullWidth={true}>
        <DialogTitle>
          <span className="mb-20 styleColor">
            {itemId ? (
              <span>Chỉnh sửa thông tin {titleDialog}</span>
            ) : (
              <span>Thêm mới {titleDialog}</span>
            )}
          </span>
          <IconButton
            style={{ position: "absolute", right: "10px", top: "10px" }}
            onClick={() => {
              handleCloseItemDialog();
            }}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleFormSubmit}
          style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContent dividers>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span>
                      <span style={{ color: "red" }}> * </span>
                      {codeName}
                    </span>
                  }
                  onChange={(event) => {
                    this.handleChangeInput(event, "code");
                  }}
                  type="number"
                  name="code"
                  value={code}
                  validators={["required", "isCode"]}
                  errorMessages={[
                    <span>Vui lòng nhập mã {titleDialog}</span>,
                    <span>Mã {titleDialog} phải gồm 6 chữ số</span>,
                  ]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span>
                      <span style={{ color: "red" }}> * </span>
                      {labelName}
                    </span>
                  }
                  onChange={(event) => {
                    this.handleChangeInput(event, "name");
                  }}
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={[<span>Vui lòng nhập tên {titleDialog}</span>]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              {nameItem === "district" && (
                <Grid item xs={12}>
                  <SelectValidator
                    className="w-100 mb-16"
                    label={
                      <span>
                        <span style={{ color: "red" }}> * </span>
                        Tỉnh
                      </span>
                    }
                    onChange={(event) => {
                      this.handleChangeSelect(event, "provinceSelected");
                    }}
                    name="provinceSelected"
                    value={
                      provinceSelected && !_.isEmpty(provinceSelected)
                        ? provinceSelected
                        : null
                    }
                    validators={["required"]}
                    errorMessages={["Vui lòng chọn tỉnh"]}
                    variant="outlined"
                    size="small"
                  >
                    {listProvinces &&
                      listProvinces.length > 0 &&
                      listProvinces.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </SelectValidator>
                </Grid>
              )}
              {nameItem === "commune" && (
                <Grid item xs={12}>
                  <SelectValidator
                    className="w-100 mb-16"
                    label={
                      <span>
                        <span style={{ color: "red" }}> * </span>
                        Quận (Huyện)
                      </span>
                    }
                    onChange={(event) => {
                      this.handleChangeSelect(event, "districtSelected");
                    }}
                    name="districtSelected"
                    value={
                      districtSelected && !_.isEmpty(districtSelected)
                        ? districtSelected
                        : null
                    }
                    validators={["required"]}
                    errorMessages={["Vui lòng chọn quận (huyện)"]}
                    variant="outlined"
                    size="small"
                  >
                    {listDistricts &&
                      listDistricts.length > 0 &&
                      listDistricts.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </SelectValidator>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="center" spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    handleCloseItemDialog();
                  }}
                >
                  Hủy
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Lưu
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    //province
    addProvince: (provinceData) =>
      dispatch(AddressActions.addProvince(provinceData)),
    editProvinceById: (provinceData, provinceId) =>
      dispatch(AddressActions.editProvinceById(provinceData, provinceId)),
    //district
    addDistrict: (districtData) =>
      dispatch(AddressActions.addDistrict(districtData)),
    editDistrictById: (districtData, districtId) =>
      dispatch(AddressActions.editDistrictById(districtData, districtId)),
    //commune
    addCommune: (communeData) =>
      dispatch(AddressActions.addCommune(communeData)),
    editCommuneById: (communeData, communeId) =>
      dispatch(AddressActions.editCommuneById(communeData, communeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressDialog);
