import _ from 'lodash'
import React from 'react'

const SuTop = ({title, sx}) => {
    return (
        <div className="suTop" style={sx} style={{padding:_.isEmpty(title)&&0, marginTop:"1.4rem"}}>
            <h2>{title}</h2>
            {/* <div className="avatar">{localStorage.getItem("username")[0].toUpperCase()}</div> */}
        </div>
    )
}

export default SuTop
