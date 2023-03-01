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
import * as AddressActions from "../../redux/actions/AddressActions";
import { Breadcrumb, ConfirmationDialog } from "egret";
import AddressDialog from "./AddressDialog";

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

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      listItem: [],
      listProvinces: [],
      listDistricts: [],
      listCommunes: [],
      itemId: "",
      itemEdited: {},
      isOpenItemDialog: false,
      isOpenConfirmationDialog: false,
    };
  }

  componentDidMount() {
    this.updatePageDataByItem();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listProvinces !== this.props.listProvinces) {
      this.setState(
        {
          listProvinces: this.props.listProvinces,
        },
        () => {
          this.setItemByNameItem();
        }
      );
    }
    if (prevProps.listDistricts !== this.props.listDistricts) {
      this.setState(
        {
          listDistricts: this.props.listDistricts,
        },
        () => {
          this.setItemByNameItem();
        }
      );
    }
    if (prevProps.listCommunes !== this.props.listCommunes) {
      this.setState(
        {
          listCommunes: this.props.listCommunes,
        },
        () => {
          this.setItemByNameItem();
        }
      );
    }
    if (
      prevProps.isOpenConfirmationDialog !== this.props.isOpenConfirmationDialog
    ) {
      this.setState(
        {
          isOpenConfirmationDialog: this.props.isOpenConfirmationDialog,
        },
        () => {
          this.updatePageDataByItem();
        }
      );
    }
    if (prevProps.isOpenItemDialog !== this.props.isOpenItemDialog) {
      this.setState(
        {
          isOpenItemDialog: this.props.isOpenItemDialog,
        },
        () => {
          this.updatePageDataByItem();
        }
      );
    }
  }

  setItemByNameItem = () => {
    let { nameItem } = this.props;
    let { listProvinces, listDistricts, listCommunes } = this.state;

    if (nameItem === "province") {
      this.setState({
        listItem: listProvinces,
      });
    }
    if (nameItem === "district") {
      this.setState({
        listItem: listDistricts,
      });
    }
    if (nameItem === "commune") {
      this.setState({
        listItem: listCommunes,
      });
    }
  };

  updatePageDataByItem = () => {
    let searchDto = {
      keyword: this.state.keyword,
    };

    this.props.fetchProvinces(searchDto);
    this.props.fetchDistricts(searchDto);
    this.props.fetchCommunes(searchDto);
  };

  handleAddNewItem = () => {
    this.setState({
      isOpenItemDialog: true,
      itemEdited: {},
    });
  };

  handleChangeText = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  handleKeyDownEnterSearch = (event) => {
    if (event.key === "Enter") {
      this.updatePageDataByItem();
    }
  };

  handleCloseItemDialog = () => {
    this.setState({
      isOpenItemDialog: false,
    });
    this.updatePageDataByItem();
  };

  handleDeleteItem = (itemId) => {
    this.setState({
      isOpenConfirmationDialog: true,
      itemId: itemId,
    });
  };

  handleCloseConfirmationDialog = () => {
    this.setState({
      isOpenConfirmationDialog: false,
    });
    this.updatePageDataByItem();
  };

  handleConfirmDelete = () => {
    let { itemId } = this.state;
    let { nameItem } = this.props;

    if (nameItem === "province") {
      this.props.deleteProvinceById(itemId);
    }
    if (nameItem === "district") {
      this.props.deleteDistrictById(itemId);
    }
    if (nameItem === "commune") {
      this.props.deleteCommuneById(itemId);
    }
  };

  handleEditItem = (itemData) => {
    this.setState({
      itemEdited: itemData,
      isOpenItemDialog: true,
    });
  };

  render() {
    let {
      keyword,
      listItem,
      itemEdited,
      isOpenItemDialog,
      isOpenConfirmationDialog,
    } = this.state;

    let { nameItem, titleCode, titleName, breadcrumbName, titleDialog } =
      this.props;

    let columns = [
      {
        title: "STT",
        align: "left",
        width: "100",
        sorting: false,
        render: (rowData) => rowData.tableData.id + 1,
      },
      {
        title: titleCode,
        field: "code",
        align: "left",
      },
      {
        title: titleName,
        field: "name",
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
                this.handleEditItem(rowData);
              }
              if (method === 1) {
                this.handleDeleteItem(rowData.id);
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
            routeSegments={[
              { name: "Quản Lý" },
              { name: "Địa chỉ" },
              { name: breadcrumbName },
            ]}
          />
        </div>
        <Grid container spacing={3} style={{ marginBottom: "5px" }}>
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleAddNewItem();
              }}
            >
              Thêm mới
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
              placeholder="Nhập từ khóa tìm kiếm"
              startAdornment={
                <InputAdornment>
                  <Link to="#">
                    <SearchIcon
                      onClick={() => {
                        this.updatePageDataByItem();
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
            {isOpenItemDialog && (
              <AddressDialog
                isOpen={isOpenItemDialog}
                handleCloseItemDialog={this.handleCloseItemDialog}
                nameItem={nameItem}
                itemEdited={itemEdited}
                labelName={titleName}
                codeName={titleCode}
                titleDialog={titleDialog}
                listProvinces={this.state.listProvinces}
                listDistricts={this.state.listDistricts}
              />
            )}

            {isOpenConfirmationDialog && (
              <ConfirmationDialog
                title={"Xác nhận"}
                text={"Bạn chắc chắn muốn xóa?"}
                open={isOpenConfirmationDialog}
                onConfirmDialogClose={this.handleCloseConfirmationDialog}
                onYesClick={this.handleConfirmDelete}
                Yes={"Xác nhận"}
                No={"Hủy"}
              />
            )}
          </div>
          <MaterialTable
            columns={columns}
            data={listItem}
            // title="Danh sách nhân viên"
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
                emptyDataSourceMessage: "Không có bản ghi nào",
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
    listProvinces: state.address.listProvinces,
    listDistricts: state.address.listDistricts,
    listCommunes: state.address.listCommunes,
    isOpenConfirmationDialog: state.address.isOpenConfirmationDialog,
    isOpenItemDialog: state.address.isOpenItemDialog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //province
    fetchProvinces: (searchDto) =>
      dispatch(AddressActions.fetchProvinces(searchDto)),
    deleteProvinceById: (provinceId) =>
      dispatch(AddressActions.deleteProvinceById(provinceId)),
    //district
    fetchDistricts: (searchDto) =>
      dispatch(AddressActions.fetchDistricts(searchDto)),
    deleteDistrictById: (districtId) =>
      dispatch(AddressActions.deleteDistrictById(districtId)),
    //commune
    fetchCommunes: (searchDto) =>
      dispatch(AddressActions.fetchCommunes(searchDto)),
    deleteCommuneById: (communeId) =>
      dispatch(AddressActions.deleteCommuneById(communeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
