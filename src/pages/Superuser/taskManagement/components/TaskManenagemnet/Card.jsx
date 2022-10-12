import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal, X } from "react-feather";

import Dropdown from "../Dropdown/Dropdown";

import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);



  // created_on, updated_on, assigned_to, assigned_by, deadline,desc
  const { id, title, date, cards,  labels } = props?.card;

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };

  return (
    <>
      {showModal && (
        <CardInfo
          getTasks ={props?.getTasks}
          onClose={() => setShowModal(false)}
          card={props?.card}
          boardId={props?.Bid}
          updateCard={props?.updateCard}
          UpdateCardData={props?.UpdateCardData}
        />
      )}
      <div
        className="card"
        onClick={() => setShowModal(true)}
        style={{ backgroundColor: props.isDraging ? "#8a28d9" : "#fff",color: props.isDraging ? "#fff" : "#000" }}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={(e) => { setShowDropdown(false) }}
              >
                <p onClick={(e) => { e.stopPropagation(); props.DeleteCard(props?.Bid, id) }}>
                  Delete Card
                </p>
                <span onClick={(e) => { e.stopPropagation(); setShowDropdown(false) }}><X /></span>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{title}</div>
        <div className="card_footer">
          {date && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}
          {cards && cards?.length > 0 && (
            <p className="card_footer_item">
              <CheckSquare className="card_footer_icon" />
              {cards?.filter((item) => item.completed)?.length}/{cards?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
