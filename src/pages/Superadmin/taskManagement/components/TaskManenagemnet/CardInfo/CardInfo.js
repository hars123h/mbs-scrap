import React, { useEffect, useState } from "react";
import moment from "moment";
import { MultiSelect } from "@progress/kendo-react-dropdowns";

import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";

import Modal from "../../Modal/Modal";
import Editable from "../../Editabled/Editable";

import "./CardInfo.css";
import { AutoComplete } from "@progress/kendo-react-dropdowns";
import common from "../../../../../../baseUrl";
import axios from "axios";
import { assignWith } from "lodash";

const initialValues = {
  id:'',
  title: '',
  description: '',
  label: '',
  created_on: '',
  updated_on: '',
  assign_to:'',
}

function CardInfo(props) {
  const [singleCard, setSingleCard] = useState(initialValues)
  const [allAdmins, setAllAdmins] = useState()

  useEffect(async () => {
    const url = `TaskManager/DetailTask/${props.card?.id}`
    const singleTask = await axios({
      method: "get",
      url: `${common.baseUrl}${url}`

    })
    setSingleCard({ ...singleCard, id: singleTask.data?.id, title: singleTask.data?.title, description: singleTask.data?.description, updated_on: singleTask.data?.updated_on, created_on: singleTask.data?.created_on, label: singleTask.data?.label })
  }, [])

  useEffect(() => {
    const getAllAdmins = async()=>{
      let url = "Login/AllHeadAdmin/"
      const allAdmin = await axios({
        url: `${common.baseUrl}${url}`,
        method:'get'
      })
    setAllAdmins(allAdmin.data)
      
    } 
    getAllAdmins()
}, [])


  const {
    id,
    title,
    description,
    created_on,
    label,
    updated_on,
    deadline
  } = singleCard
  const handleChange = name => event => {
    setSingleCard({ ...singleCard, [name]: event.target.value });

};
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [selectedColor, setSelectedColor] = useState();
  const [desc, setDesc] = useState();
  const [values, setValues] = useState({
    ...props.card,
  });


  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const updateDesc = (value) => {
    setValues({ ...values, description: value });
  };

  const addLabel = (label) => {

    setSelectedColor("");
    setValues(values.labels = label);
  };

  const removeLabel = (label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text);

    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  const updateAllfields = async () => {
   
    const url = `TaskManager/UpdateTask/${id}`
    const updatedTask = await axios({
      method: "patch",
      url: `${common.baseUrl}${url}`,
      data: {
        title: title,
        label: label,
        description: description,
        updated_on: moment(Date.now()).format('YYYY-MM-DD HH:mm'),
      }
    })
  
    if (updatedTask.status === 200) {
      window.location.reload();
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Type />
            <p>Title</p>
          </div>
          <input
           
            placeholder="Enter Title"
            onChange={handleChange('title')}
             value={title}
           
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <List />
            <p>Description</p>
          </div>
          <textarea 
            editClassInfo='editClassInfo'
           
            placeholder="Enter description"
            onChange={handleChange('description')}
            value={description}
          />
        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <List />
            <p>Assigned To</p>
          </div>
              <input type="text" disabled name="" id="" value={props?.card?.assignee?.name} />
          
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Calendar />
            <p>Created At:- </p>
            <h4>{moment(created_on).format("YYYY-MM-DD")}</h4>
          </div>

        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Calendar />
            <p>DeadLine:- </p>
            <h4>{moment(props?.card?.deadline).format("YYYY-MM-DD")}</h4>
          </div>

        </div>

        <div className="example-wrapper">
      {/* <div>
        <div>Favorite sports:</div>
        <MultiSelect data={allAdmins?.name} onChange={handleChange('description')} value={allAdmins?.head_admin_id} />
      </div> */}
    </div>

      

        <div className="updateButton"><button onClick={updateAllfields}>Update</button></div>
      </div>
    </Modal>
  );
}

export default CardInfo;
