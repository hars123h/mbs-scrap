import React, { useEffect, useRef } from "react";

import "./Dropdown.css";

function Dropdown(props) {

  return (
    <div onClick={()=> props.onClose ? props.onClose():""}
      
      className={`dropdown custom-scroll ${props.class ? props.class : ""}`}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;
