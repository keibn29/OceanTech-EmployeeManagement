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
import MaterialTable from "material-table";
import _ from "lodash";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import {
  fetchProvinces,
  fetchDistricts,
  fetchCommunes,
} from "../../redux/actions/AddressActions";
import {
  createEmployee,
  editEmployeeById,
} from "../../redux/actions/EmployeeActions";
import DiplomaDialog from "./DiplomaDialog";

function MaterialButton(props) {
  const item = props.item;
  return (
    <div>
      <IconButton
        size="small"
        style={{ padding: "5px", marginLeft: "3px" }}
        onClick={() => props.onSelect(item)}
      >
        <Icon fontSize="small" color="error">
          delete
        </Icon>
      </IconButton>
    </div>
  );
}

class EmployeeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProvinces: [],
      listDistricts: [],
      listAllCommunes: [],
      listCommunesByDistrict: [],
      name: "",
      code: "",
      age: "",
      email: "",
      phone: "",
      provinceSelected: {},
      districtSelected: {},
      communeSelected: {},
      employeeId: "",
      isOpenDiplomaDialog: false,
      listDiplomas: [],
    };
  }

  componentDidMount() {
    this.fetchAddressInformation();
    this.getEmployeeEditedInformation();
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
    if (prevProps.listCommunes !== this.props.listCommunes) {
      this.setState({
        listAllCommunes: this.props.listCommunes,
      });
    }
    if (prevProps.isOpenDiplomaDialog !== this.props.isOpenDiplomaDialog) {
      this.setState({
        isOpenDiplomaDialog: this.props.isOpenDiplomaDialog,
      });
    }
  }

  handleAddValidationRule = () => {
    ValidatorForm.addValidationRule("isCode", (value) => {
      if (value.length < 6 || value.length > 10) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("isPhone", (value) => {
      let firstDigitStr = String(value)[0];
      if (value.length !== 10 || Number(firstDigitStr) !== 0) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("isAge", (value) => {
      if (value < 1 || value > 100) {
        return false;
      }
      return true;
    });
  };

  fetchAddressInformation = () => {
    let searchDto = {};

    this.props.fetchProvinces(searchDto);
    this.props.fetchDistricts(searchDto);
    this.props.fetchCommunes(searchDto);
  };

  searchCommuneByDistrict = () => {
    let { listAllCommunes, districtSelected } = this.state;
    let result = [];
    if (listAllCommunes && listAllCommunes.length > 0) {
      listAllCommunes.map((item) => {
        if (
          districtSelected &&
          !_.isEmpty(districtSelected) &&
          districtSelected.id === item.district.id
        ) {
          result.push(item);
        }
      });
    }
    this.setState({
      listCommunesByDistrict: result,
    });
  };

  handleFormSubmit = () => {
    let {
      name,
      code,
      age,
      email,
      phone,
      provinceSelected,
      districtSelected,
      communeSelected,
      employeeId,
    } = this.state;

    let employeeData = {
      name,
      code,
      age,
      email,
      phone,
      province: provinceSelected,
      district: districtSelected,
      commune: communeSelected,
    };

    if (!employeeId) {
      this.props.createEmployee(employeeData);
    }
    if (employeeId) {
      this.props.editEmployeeById(employeeData, employeeId);
    }
  };

  getEmployeeEditedInformation = () => {
    let { employeeEdited } = this.props;

    if (employeeEdited && !_.isEmpty(employeeEdited)) {
      this.setState({
        ...employeeEdited,
        employeeId: employeeEdited.id,
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
        districtSelected: {},
        communeSelected: {},
      });
    }
    if (id === "districtSelected") {
      this.setState(
        {
          districtSelected: event.target.value,
          communeSelected: {},
        },
        () => {
          this.searchCommuneByDistrict();
        }
      );
    }
    if (id === "communeSelected") {
      this.setState({
        communeSelected: event.target.value,
      });
    }
  };

  handleAddDiploma = () => {
    this.setState({
      isOpenDiplomaDialog: true,
    });
  };

  handleCloseDiplomaDialog = () => {
    this.setState({
      isOpenDiplomaDialog: false,
    });
  };

  getDiplomaInformation = (diplomaData) => {
    let { listDiplomas } = this.state;

    if (diplomaData && !_.isEmpty(diplomaData)) {
      let diplomaItem = {
        nameDiploma: diplomaData.name,
        dateEffect: diplomaData.dateEffect.toLocaleDateString("en-GB"),
        nameProvince: diplomaData.province.name,
      };
      this.setState({
        listDiplomas: [...listDiplomas, diplomaItem],
      });
    }
  };

  handleRemoveDiplomaItem = (diplomaIndex) => {
    let copyListDiplomas = this.state.listDiplomas;
    copyListDiplomas.splice(diplomaIndex, 1);

    this.setState({
      listDiplomas: copyListDiplomas,
    });
  };

  render() {
    let { isOpen, handleCloseEmployeeDialog } = this.props;
    let {
      listProvinces,
      listDistricts,
      listCommunesByDistrict,
      name,
      code,
      age,
      email,
      phone,
      employeeId,
      provinceSelected,
      districtSelected,
      communeSelected,
      isOpenDiplomaDialog,
      listDiplomas,
    } = this.state;
    console.log("listDiplomas: ", listDiplomas);

    let columns = [
      {
        title: "STT",
        align: "left",
        width: "100",
        sorting: false,
        render: (rowData) => rowData.tableData.id + 1,
      },
      {
        title: "T??n ch???ng ch???",
        field: "nameDiploma",
        align: "left",
      },
      {
        title: "Ng??y c???p",
        field: "dateEffect",
        align: "left",
      },
      {
        title: "N??i c???p",
        field: "nameProvince",
        align: "left",
      },
      {
        title: "Action",
        align: "center",
        sorting: false,
        render: (rowData) => (
          <MaterialButton
            item={rowData.tableData.id}
            onSelect={(diplomaIndex) => {
              this.handleRemoveDiplomaItem(diplomaIndex);
            }}
          />
        ),
      },
    ];

    return (
      <>
        <Dialog open={isOpen} maxWidth="md" fullWidth={true}>
          <DialogTitle>
            <span className="mb-20 styleColor">
              {employeeId
                ? "Ch???nh s???a th??ng tin nh??n vi??n"
                : "Th??m m???i nh??n vi??n"}
            </span>
            <IconButton
              style={{ position: "absolute", right: "10px", top: "10px" }}
              onClick={() => {
                handleCloseEmployeeDialog();
              }}
            >
              <Icon color="error" title="????ng">
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
                <Grid item md={6} xs={12}>
                  <TextValidator
                    className="w-100 mb-16"
                    label={
                      <span>
                        <span style={{ color: "red" }}> * </span>
                        H??? v?? t??n
                      </span>
                    }
                    onChange={(event) => {
                      this.handleChangeInput(event, "name");
                    }}
                    type="text"
                    name="name"
                    value={name}
                    validators={["required"]}
                    errorMessages={["Vui l??ng nh???p t??n nh??n vi??n"]}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <TextValidator
                    className="w-100 mb-16"
                    label={
                      <span>
                        <span style={{ color: "red" }}> * </span>
                        M?? nh??n vi??n
                      </span>
                    }
                    onChange={(event) => {
                      this.handleChangeInput(event, "code");
                    }}
                    type="text"
                    name="code"
                    value={code}
                    validators={["required", "isCode"]}
                    errorMessages={[
                      "Vui l??ng nh???p m?? nh??n vi??n",
                      "M?? nh??n vi??n ph???i d??i t??? 6-10 k?? t???",
                    ]}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <TextValidator
                    className="w-100 mb-16"
                    label={
                      <span>
                        <span style={{ color: "red" }}> * </span>
                        Tu???i
                      </span>
                    }
                    onChange={(event) => {
                      this.handleChangeInput(event, "age");
                    }}
                    type="number"
                    name="age"
                    value={age}
                    validators={["required", "isAge"]}
                    errorMessages={["Vui l??ng nh???p tu???i", "Nh???p ????ng tu???i"]}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextValidator
                    className="w-100 mb-16"
                    label={
                      <span>
                        <span style={{ color: "red" }}> * </span>
                        Email
                      </span>
                    }
                    onChange={(event) => {
                      this.handleChangeInput(event, "email");
                    }}
                    type="email"
                    name="email"
                    value={email}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "Vui l??ng nh???p email",
                      "Vui l??ng nh???p ????ng ?????nh d???ng email",
                    ]}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextValidator
                    className="w-100 mb-16"
                    label={
                      <span>
                        <span style={{ color: "red" }}> * </span>
                        S??? ??i???n tho???i
                      </span>
                    }
                    onChange={(event) => {
                      this.handleChangeInput(event, "phone");
                    }}
                    title="S??? ??i???n tho???i ph???i c?? 10 ch??? s???"
                    type="number"
                    name="phone"
                    value={phone}
                    validators={["required", "isPhone"]}
                    errorMessages={[
                      "Vui l??ng nh???p s??? ??i???n tho???i",
                      "Vui l??ng nh???p s??? ??i???n tho???i h???p l???",
                    ]}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <SelectValidator
                    className="w-100 mb-16"
                    label={
                      <span>
                        <span style={{ color: "red" }}> * </span>
                        T???nh
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
                    errorMessages={["Vui l??ng ch???n t???nh"]}
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
                <Grid item md={4} xs={12}>
                  <SelectValidator
                    className="w-100 mb-16"
                    label={
                      <span>
                        <span style={{ color: "red" }}> * </span>
                        Qu???n (Huy???n)
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
                    errorMessages={["Vui l??ng ch???n qu???n (huy???n)"]}
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
                <Grid item md={4} xs={12}>
                  <SelectValidator
                    className="w-100 mb-16"
                    label={
                      <span>
                        <span style={{ color: "red" }}> * </span>
                        Ph?????ng (X??)
                      </span>
                    }
                    onChange={(event) => {
                      this.handleChangeSelect(event, "communeSelected");
                    }}
                    name="communeSelected"
                    value={
                      communeSelected && !_.isEmpty(communeSelected)
                        ? communeSelected
                        : null
                    }
                    validators={["required"]}
                    errorMessages={["Vui l??ng ch???n ph?????ng (x??)"]}
                    variant="outlined"
                    size="small"
                  >
                    {listCommunesByDistrict &&
                    listCommunesByDistrict.length > 0 ? (
                      listCommunesByDistrict.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item}>
                            {item.name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem disabled>Kh??ng c?? ph?????ng (x??)</MenuItem>
                    )}
                  </SelectValidator>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.handleAddDiploma();
                    }}
                  >
                    Th??m ch???ng ch???
                  </Button>
                </Grid>
                {listDiplomas && !_.isEmpty(listDiplomas) && (
                  <Grid item xs={12}>
                    <MaterialTable
                      columns={columns}
                      data={listDiplomas}
                      title="Danh s??ch ch???ng ch???"
                      options={{
                        toolbar: false,
                        search: false,
                        paging: false,
                        maxBodyHeight: "150px",
                        padding: "dense",
                      }}
                      localization={{
                        body: {
                          emptyDataSourceMessage: "Kh??ng c?? b???n ghi n??o",
                        },
                      }}
                    />
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
                      handleCloseEmployeeDialog();
                    }}
                  >
                    H???y
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    L??u
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
        {isOpenDiplomaDialog && (
          <DiplomaDialog
            isOpen={isOpenDiplomaDialog}
            getDiplomaInformation={this.getDiplomaInformation}
            handleCloseDiplomaDialog={this.handleCloseDiplomaDialog}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listProvinces: state.address.listProvinces,
    listDistricts: state.address.listDistricts,
    listCommunes: state.address.listCommunes,
    isOpenDiplomaDialog: state.employee.isOpenDiplomaDialog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProvinces: (searchDto) => dispatch(fetchProvinces(searchDto)),
    fetchDistricts: (searchDto) => dispatch(fetchDistricts(searchDto)),
    fetchCommunes: (searchDto) => dispatch(fetchCommunes(searchDto)),
    createEmployee: (employeeData) => dispatch(createEmployee(employeeData)),
    editEmployeeById: (employeeData, employeeId) =>
      dispatch(editEmployeeById(employeeData, employeeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDialog);
