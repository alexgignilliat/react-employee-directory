import React from "react";

function Header(){
    return (
        <div className="row">
        <h1 style={{
            margin: "10px",
            color: "white", 
            width: "100%",
            height: "5rem",
            backgroundColor: "#567b99",
            textAlign: "center",
            paddingTop: "10px",
            borderRadius: "5px"
        }}>Employee Directory</h1>
        </div>
    )
}

export default Header;