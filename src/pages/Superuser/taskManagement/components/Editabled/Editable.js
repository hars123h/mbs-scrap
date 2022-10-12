import { DropDownList } from "@progress/kendo-react-dropdowns";
import axios from "axios";
import React, { useEffect, useState } from "react";
import common from "../../../../../baseUrl"
import { BookOpen, Calendar, X } from "react-feather";

import "./Editable.css";
import { method, set } from "lodash";
const AdminList = [
  {
    name: "Harsh"
  },
  {
    name: "Kabya"
  },
]
const defaultItem = {
  name: "select assigne.."
}

function Editable(props) {

  const[allSuperadmin, setAllsuperAdmin]  = useState()
 
  const [asignedTo, setAsignedTo] = useState()
  const [date, setDate] = useState()
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(props?.defaultValue || "");
  const [desc, setDesc] = useState(props?.desc || "");
  // console.log(desc);

  const submission = (e) => {
    e.stopPropagation()
    e.preventDefault();
    if (inputText && props.onSubmit) {
      setInputText("");
      props.onSubmit(inputText, asignedTo, date);
      setDate("")
    }
    setIsEditable(false);
  };
  useEffect(() => {
        const getAllSuperAdmin = async()=>{
          let url = "Login/AllSuperHeadAdmin/"
          const allSuperAdmin = await axios({
            url :`http://3.110.249.10:8000/Login/AllSuperHeadAdmin/`,
            method:'get'
          })
        setAllsuperAdmin(allSuperAdmin.data)
          
        } 
        getAllSuperAdmin()
  }, [])
  return (
    <div className="editable">
      {isEditable ? (
        <form
          className={`editable_edit ${props.editClass ? props.editClass : ""}`}
          onSubmit={submission}
        >
          <input
          className={props.editClassInfo ? 'editClassInfo':""}
            type="text"
            value={inputText}
            placeholder={props.placeholder || props.text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          {
            props.dropdown && 
            <div className="assinedTo">
              <div className="cardinfo_box_title">
                <BookOpen />
                <p>Assign To</p>
              </div>
              <DropDownList

                style={{ backgroundColor: "#fff",  height: "45px", color: "#000" }}
                data={allSuperadmin}
                textField="name"
                defaultItem={defaultItem}
                onChange={(e) => setAsignedTo(e.target.value.super_model_id)}
              />
              <div className="cardinfo_box">
                <div className="cardinfo_box_title">
                  <Calendar />
                  <p>Deadline</p>
                </div>
                <input
                 type="datetime-local" name="partydate" value={date}
                  required
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>

            </div>
          }

          <div className="editable_edit_footer">
            <button type="submit">{props.buttonText || "Add"}</button>
            <X onClick={() => setIsEditable(false)} className="closeIcon" />
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${props.displayClass ? props.displayClass : ""
            }`}
          onClick={() => setIsEditable(true)}
        >
          {props.text}
        </p>
      )}
    </div>
  );
}

export default Editable;
