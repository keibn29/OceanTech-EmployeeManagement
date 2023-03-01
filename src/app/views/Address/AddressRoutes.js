import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";
const Province = EgretLoadable({
  loader: () => import("./Province"),
});
const District = EgretLoadable({
  loader: () => import("./District"),
});
const Commune = EgretLoadable({
  loader: () => import("./Commune"),
});
const ViewComponentProvince = withTranslation()(Province);
const ViewComponenDistrict = withTranslation()(District);
const ViewComponentCommune = withTranslation()(Commune);

const AddressRoutes = [
  {
    path: ConstantList.ROOT_PATH + "province-manager",
    exact: true,
    component: ViewComponentProvince,
  },
  {
    path: ConstantList.ROOT_PATH + "district-manager",
    exact: true,
    component: ViewComponenDistrict,
  },
  {
    path: ConstantList.ROOT_PATH + "commune-manager",
    exact: true,
    component: ViewComponentCommune,
  },
];

export default AddressRoutes;
