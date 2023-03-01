import ConstantList from "./appConfig";
export const navigations = [
  {
    name: "Dashboard.dashboard",
    icon: "dashboard",
    path: ConstantList.ROOT_PATH + "dashboard/analytics",
    isVisible: true,
  },
  {
    name: "Dashboard.category",
    icon: "dashboard",
    path: "",
    isVisible: true,
    children: [
      {
        name: "Dashboard.category",
        path: ConstantList.ROOT_PATH + "directory/category",
        icon: "keyboard_arrow_right",
        isVisible: true,
      },
      {
        name: "Dashboard.timeshet",
        path: ConstantList.ROOT_PATH + "directory/timesheet",
        icon: "keyboard_arrow_right",
        isVisible: true,
      },
    ],
  },
  {
    name: "Dashboard.manage",
    isVisible: true,
    icon: "engineering",
    children: [
      // {
      //   name: "Dashboard.eQAActivityLog",
      //   isVisible: true,
      //   path: ConstantList.ROOT_PATH + "user_manager/activity_log",
      //   icon: "keyboard_arrow_right",
      // },
      // {
      //   name: "manage.user",
      //   isVisible: true,
      //   path: ConstantList.ROOT_PATH + "user_manager/user",
      //   icon: "keyboard_arrow_right",
      // },
      // {
      //   name: "manage.menu",
      //   isVisible: true,
      //   path: ConstantList.ROOT_PATH + "list/menu",
      //   icon: "keyboard_arrow_right",
      // },
      {
        name: "manage.employee",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "employee-manager",
        icon: "group_add",
      },
      {
        name: "Quản lí địa chỉ",
        isVisible: true,
        icon: "add_location",
        children: [
          {
            name: "Tỉnh thành",
            isVisible: true,
            path: ConstantList.ROOT_PATH + "province-manager",
            icon: "keyboard_arrow_right",
          },
          {
            name: "Quận (Huyện)",
            isVisible: true,
            path: ConstantList.ROOT_PATH + "district-manager",
            icon: "keyboard_arrow_right",
          },
          {
            name: "Phường (Xã)",
            isVisible: true,
            path: ConstantList.ROOT_PATH + "commune-manager",
            icon: "keyboard_arrow_right",
          },
        ],
      },
    ],
  },
];
