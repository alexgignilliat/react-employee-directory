import React from "react";

function EmployeeRow(props) {

    return (
        <tr>
            <td><img alt={"Employee"} src={props.image} /></td>
            <td>{props.firstName + " " + props.lastName}</td>
            <td>{props.phone}</td>
            <td>{props.email}</td>
            <td>{props.dob}</td>
        </tr>
    )
}


export default EmployeeRow;