import React, { useEffect, useState } from 'react';
import Japan from "../static/Japan.png"
//Using momentjs https://momentjs.com/
import momentz from 'moment-timezone';
import moment from 'moment'

var dateFormat = require("dateformat")



function ClockC() {

  moment.locale('ja')
  const [date, setDate] = useState(moment().format("DD-MM-YYYY"));
  const [time, setTime] = useState(momentz().tz('Japan').format("HH:mm"));

  useEffect(() => {
    setInterval(() => {
      setDate(moment().format("DD-MM-YYYY"))
      setTime(momentz().tz('Japan').format("HH:mm"))
    }, 60000)
  })

  return (
    <div style={{ display: "flex", alignItems: 'center', color: "#be0029", marginLeft: "1rem" }}>
      <img style={{ borderRadius: "50%", width: "20px", height: "20px", objectFit: "cover", border: "2px solid #be0029" }} src={Japan} alt="Japan Flag" />
      <p style={{ marginLeft: "0.1rem", fontSize: "0.9rem", width: "auto" }}>{time} {date}</p>
    </div>
  )
}

export default ClockC