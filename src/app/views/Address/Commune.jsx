import React from "react";
import Address from "./Address";

function Commune(props) {
  return (
    <>
      <Address
        nameItem="commune"
        titleCode="Mã phường (xã)"
        titleName="Tên phường (xã)"
        breadcrumbName="Phường (Xã)"
        titleDialog="phường (xã)"
      />
    </>
  );
}

export default Commune;
