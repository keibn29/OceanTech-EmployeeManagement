import React from "react";
import Address from "./Address";

function District(props) {
  return (
    <>
      <Address
        nameItem="district"
        titleCode="Mã quận (huyện)"
        titleName="Tên quận (huyện)"
        breadcrumbName="Quận (Huyện)"
        titleDialog="quận (huyện)"
      />
    </>
  );
}

export default District;
