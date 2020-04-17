import React, { Component } from "react";
import API from "../utils/API"
import EmployeeRow from "./EmployeeRow"

class TableMain extends Component {
    state = {
        result: [],
        search: "",
        sortOrder: "descending"
    }

    componentDidMount() {
        API.search()
            .then(results => {
                console.log(results)
                this.setState({
                    result: results.data.results.map((res, i) => ({
                        image: res.picture.large,
                        firstName: res.name.first,
                        lastName: res.name.last,
                        phone: res.phone,
                        email: res.email,
                        dob: res.dob.date,
                        key: i
                    })
                    )
                }
                )
            })
    }

    onChange = e => {
        this.setState({ search: e.target.value })
    }



    render() {

        return (
            <div>
                <input label="Search" onChange={this.onChange} />
                <div className="row">
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <th>Image</th>
                                <th  id="name">Name</th>
                                <th id="phone">Phone</th>
                                <th id="email">Email</th>
                                <th id="dob">DOB</th>
                            </tr>
                            {[...this.state.result].map((item) =>
                                <EmployeeRow
                                    image={item.image}
                                    firstName={item.firstName}
                                    lastName={item.lastName}
                                    email={item.email}
                                    phone={item.phone}
                                    dob={item.dob}
                                    key={item.key}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
                        
            </div>
        )
    }
}


export default TableMain;