import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  IconButton,
  Icon,
  Button,
  InputAdornment,
  Input,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import MaterialTable from "material-table";
import {
  fetchEmployees,
  deleteEmployeeById,
} from "../../redux/actions/EmployeeActions";
import EmployeeDialog from "./EmployeeDialog";
import { Breadcrumb, ConfirmationDialog } from "egret";

function MaterialButton(props) {
  const item = props.item;
  return (
    <div>
      <IconButton
        size="small"
        style={{ padding: "5px" }}
        onClick={() => props.onSelect(item, 0)}
      >
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton
        size="small"
        style={{ padding: "5px", marginLeft: "3px" }}
        onClick={() => props.onSelect(item, 1)}
      >
        <Icon fontSize="small" color="error">
          delete
        </Icon>
      </IconButton>
    </div>
  );
}

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      listEmployees: [],
      employeeId: "",
      employeeEdited: {},
      isOpenEmployeeDialog: false,
      isOpenConfirmationDialog: false,
    };
  }

  componentDidMount() {
    this.updatePageData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listEmployees !== this.props.listEmployees) {
      this.setState({
        listEmployees: this.props.listEmployees,
      });
    }
    if (prevProps.isOpenEmployeeDialog !== this.props.isOpenEmployeeDialog) {
      this.setState({
        isOpenEmployeeDialog: this.props.isOpenEmployeeDialog,
      });
      this.updatePageData();
    }
    if (
      prevProps.isOpenConfirmationDialog !== this.props.isOpenConfirmationDialog
    ) {
      this.setState({
        isOpenConfirmationDialog: this.props.isOpenConfirmationDialog,
      });
      this.updatePageData();
    }
  }

  updatePageData = () => {
    let searchDto = {
      name: this.state.keyword,
    };

    this.props.fetchEmployees(searchDto);
  };

  handleAddNewEmployee = () => {
    this.setState({
      isOpenEmployeeDialog: true,
      employeeEdited: {},
    });
  };

  handleChangeText = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  handleKeyDownEnterSearch = (event) => {
    if (event.key === "Enter") {
      this.updatePageData();
    }
  };

  handleCloseEmployeeDialog = () => {
    this.setState({
      isOpenEmployeeDialog: false,
    });
    this.updatePageData();
  };

  handleCloseConfirmationDialog = () => {
    this.setState({
      isOpenConfirmationDialog: false,
    });
    this.updatePageData();
  };

  handleConfirmDelete = () => {
    let { employeeId } = this.state;
    this.props.deleteEmployeeById(employeeId);
  };

  handleEditEmployee = (employeeData) => {
    this.setState({
      employeeEdited: employeeData,
      isOpenEmployeeDialog: true,
    });
  };

  handleDeleteEmployee = (employeeId) => {
    this.setState({
      isOpenConfirmationDialog: true,
      employeeId: employeeId,
    });
  };

  render() {
    let {
      keyword,
      listEmployees,
      employeeEdited,
      isOpenEmployeeDialog,
      isOpenConfirmationDialog,
    } = this.state;

    let columns = [
      {
        title: "STT",
        align: "left",
        width: "100",
        sorting: false,
        render: (rowData) => rowData.tableData.id + 1,
      },
      {
        title: "M?? nh??n vi??n",
        field: "code",
        align: "left",
      },
      {
        title: "T??n nh??n vi??n",
        field: "name",
        align: "left",
      },
      {
        title: "Email",
        field: "email",
        align: "left",
      },
      {
        title: "S??? ??i???n tho???i",
        field: "phone",
        align: "left",
      },
      {
        title: "Tu???i",
        field: "age",
        align: "left",
      },
      {
        title: "Action",
        align: "center",
        sorting: false,
        render: (rowData) => (
          <MaterialButton
            item={rowData}
            onSelect={(rowData, method) => {
              if (method === 0) {
                this.handleEditEmployee(rowData);
              }
              if (method === 1) {
                this.handleDeleteEmployee(rowData.id);
              }
            }}
          />
        ),
      },
    ];

    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[{ name: "Qu???n L??" }, { name: "Nh??n vi??n" }]}
          />
        </div>
        <Grid container spacing={3} style={{ marginBottom: "5px" }}>
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleAddNewEmployee();
              }}
            >
              Th??m m???i
            </Button>
          </Grid>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <Input
              label="EnterSearch"
              type="text"
              name="keyword"
              value={keyword}
              onChange={this.handleChangeText}
              onKeyDown={this.handleKeyDownEnterSearch}
              className="w-100"
              id="search_box"
              placeholder="Nh???p t??? kh??a t??m ki???m"
              startAdornment={
                <InputAdornment>
                  <Link to="#">
                    <SearchIcon
                      onClick={() => {
                        this.updatePageData();
                      }}
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}
                    />
                  </Link>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div>
            {isOpenEmployeeDialog && (
              <EmployeeDialog
                isOpen={isOpenEmployeeDialog}
                handleCloseEmployeeDialog={this.handleCloseEmployeeDialog}
                employeeEdited={employeeEdited}
              />
            )}

            {isOpenConfirmationDialog && (
              <ConfirmationDialog
                title={"X??c nh???n"}
                text={"B???n ch???c ch???n mu???n x??a nh??n vi??n n??y?"}
                open={isOpenConfirmationDialog}
                onConfirmDialogClose={this.handleCloseConfirmationDialog}
                onYesClick={this.handleConfirmDelete}
                Yes={"X??c nh???n"}
                No={"H???y"}
              />
            )}
          </div>
          <MaterialTable
            columns={columns}
            data={listEmployees}
            title="Danh s??ch nh??n vi??n"
            options={{
              toolbar: false,
              search: false,
              pageSizeOptions: [1, 2, 5, 8, 10, 20, 50],
              pageSize: 8,
              rowStyle: {
                height: "45px",
              },
              emptyRowsWhenPaging: false,
              headerStyle: {
                backgroundColor: "#7265EB",
                color: "#fff",
                height: "45px",
              },
              maxBodyHeight: "445px",
              minBodyHeight: "445px",
              padding: "dense",
            }}
            localization={{
              body: {
                emptyDataSourceMessage: "Kh??ng c?? b???n ghi n??o",
              },
            }}
          />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listEmployees: state.employee.listEmployees,
    isOpenEmployeeDialog: state.employee.isOpenEmployeeDialog,
    isOpenConfirmationDialog: state.employee.isOpenConfirmationDialog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployees: (searchDto) => dispatch(fetchEmployees(searchDto)),
    deleteEmployeeById: (employeeId) =>
      dispatch(deleteEmployeeById(employeeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
