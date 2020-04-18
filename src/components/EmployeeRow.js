import React from "react";

function EmployeeRow(props) {

    return (
        <tr style={{border: "1px grey solid", borderRadius: "5px"}}>
            <td style={{backgroundColor: "white", padding: 10}} ><img alt={"Employee"} style={{borderRadius: "5px"}} src={props.image} /></td>
            <td style={{backgroundColor: "white", padding: 10}}>{props.firstName + " " + props.lastName}</td>
            <td style={{backgroundColor: "white", padding: 10}}>{props.phone}</td>
            <td style={{backgroundColor: "white", padding: 10}}>{props.email}</td>
            <td style={{backgroundColor: "white", padding: 10}}>{props.dob}</td>
        </tr>
    )
}


export default EmployeeRow;