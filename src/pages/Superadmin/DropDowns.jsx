import React, { useState } from 'react'
import { AutoComplete  } from '@progress/kendo-react-dropdowns';
const assignees = [
    {
        id: 1,
        name: "Chloe Williams",
        occupation: "Developer",
    },
    {
        id: 2,
        name: "Severus Snape",
        occupation: "Developer",
    },
    {
        id: 3,
        name: "Mark Smith",
        occupation: "Tech Support",
    },
    {
        id: 4,
        name: "Rosemary Adams",
        occupation: "Tech Support",
    },
    {
        id: 5,
        name: "Joe McDonalds",
        occupation: "Designer",
    },
    {
        id: 6,
        name: "Minerva McGonagall",
        occupation: "Designer",
    },
];
function DropDowns(props) {
    const [selectedAssignee, setSelectedAssignee] = useState(null);
    const onChange = event => setSelectedAssignee(event.value);
    

    return (
        <div>
            <form >
                <AutoComplete 
                    
                    style={{width:"310px", borderRadius:"10rem"}}
                    placeholder='Select/Search'
                    data={assignees}    
                    value={selectedAssignee}
                    onChange={onChange}
                    textField="name"
                    groupField="occupation"
                    suggest
    
                    
                />
            </form>
        </div>
    )
}

export default DropDowns