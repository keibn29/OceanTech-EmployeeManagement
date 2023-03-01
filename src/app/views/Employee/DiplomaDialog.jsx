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
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";
import _ from "lodash";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { fetchProvinces } from "../../redux/actions/AddressActions";
import { addDiploma } from "../../redux/actions/EmployeeActions";

class DiplomaDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dateSelected: new Date(),
      listProvinces: [],
      provinceSelected: {},
    };
  }

  componentDidMount() {
    this.props.fetchProvinces();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listProvinces !== this.props.listProvinces) {
      this.setState({
        listProvinces: this.props.listProvinces,
      });
    }
    // if (prevProps.isOpenDiplomaDialog !== this.props.isOpenDiplomaDialog) {
    //   this.setState({
    //     name: "",
    //     dateSelected: new Date(),
    //     provinceSelected: {},
    //   });
    // }
  }

  handleDiplomaFormSubmit = () => {
    let { name, dateSelected, provinceSelected } = this.state;
    let diplomaData = {
      name,
      dateEffect: dateSelected,
      province: provinceSelected,
    };

    this.props.addDiploma(diplomaData);

    this.props.getDiplomaInformation(diplomaData);
  };

  handleChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleChangeDate = (date) => {
    this.setState({
      dateSelected: date,
    });
  };

  render() {
    let { isOpen, handleCloseDiplomaDialog } = this.props;
    let { name, dateSelected, listProvinces, provinceSelected } = this.state;

    return (
      <Dialog open={isOpen} maxWidth="xs" fullWidth={true}>
        <DialogTitle>
          <span className="mb-20 styleColor">Thêm chứng chỉ</span>
          <IconButton
            style={{ position: "absolute", right: "10px", top: "10px" }}
            onClick={() => {
              handleCloseDiplomaDialog();
            }}
          >
            <Icon color="error" title="Đóng">
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleDiplomaFormSubmit}
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
                      Tên chứng chỉ
                    </span>
                  }
                  onChange={(event) => {
                    this.handleChangeInput(event, "name");
                  }}
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={["Vui lòng nhập tên chứng chỉ"]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableFuture
                    autoOk
                    className="w-100 mb-16"
                    format="dd/MM/yyyy"
                    label={
                      <span>
                        <span style={{ color: "red" }}> * </span>
                        Ngày cấp
                      </span>
                    }
                    invalidDateMessage="Ngày không hợp lệ"
                    value={dateSelected}
                    onChange={this.handleChangeDate}
                    inputVariant="outlined"
                    size="small"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <SelectValidator
                  className="w-100 mb-16"
                  label={
                    <span>
                      <span style={{ color: "red" }}> * </span>
                      Nơi cấp
                    </span>
                  }
                  onChange={(event) => {
                    this.handleChangeInput(event, "provinceSelected");
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
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="center" spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    handleCloseDiplomaDialog();
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
  return {
    listProvinces: state.address.listProvinces,
    isOpenDiplomaDialog: state.employee.isOpenDiplomaDialog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProvinces: (searchDto) => dispatch(fetchProvinces(searchDto)),
    addDiploma: (diplomaData) => dispatch(addDiploma(diplomaData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiplomaDialog);
