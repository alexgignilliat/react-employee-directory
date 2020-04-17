import React from "react"

const EmployeeContext = React.createContext({
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",

    handleBtnClick: () => {}
})

export default EmployeeContext;