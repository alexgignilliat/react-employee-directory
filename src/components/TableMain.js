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
                })
            })
    };

    filterResults = (results) => {
        const value = this.state.search
        const finalResult = results.filter((employee) => {
            const lastName = employee.lastName.toLowerCase();
            const firstName = employee.firstName.toLowerCase()
            const fullName = firstName + " " + lastName

            if (fullName.includes(value)) {
                return employee
            }
        });

        return finalResult
    };

    sortResults = (event) => {
        const results = this.state.result
        // const id = event.target.id
        // if (id === 'name'){
        // } else if (id === 'phone'){
        // } else if (id === 'email'){
        // }
        if (this.state.sortOrder === "descending") {
            results.sort((a, b) => {
                if (a.firstName > b.firstName) {
                    return -1
                }
                return a.firstName > b.firstName ? 1 : 0
            }, 
            this.setState({ sortOrder: "ascending" }))
        } else if (this.state.sortOrder === "ascending") {
            results.sort((a, b) => {
                if (a.firstName < b.firstName) {
                    return -1
                }
                return a.firstName > b.firstName ? 1 : 0
            }, 
            this.setState({ sortOrder: "descending" }))
        }
        
        console.log("RESULTS: ", results)

        this.setState({
            sortedResults: results,
            isSorted: true
        })
    }

    onChange = e => {
        const value = e.target.value;
        if (!value) {
            this.setState({ isSearchEmpty: true });
        } else {
            this.setState({ search: e.target.value, isSearchEmpty: false });
        }
    }

    render() {
        console.log("State", this.state)
        let employeeResults = this.state.result || []

        if (this.state.isSearchEmpty) {
            employeeResults = this.state.result
        } else {
            employeeResults = this.filterResults(this.state.result)
        }

        if (this.state.isSorted) {
            employeeResults = this.state.sortedResults
        }

        return (
            <div>
                <input label="Search" onChange={this.onChange} />
                <div className="row">
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <th>Image</th>
                                <th style={{ cursor: "pointer" }} onClick={this.sortResults} id="name">Name</th>
                                <th id="phone">Phone</th>
                                <th id="email">Email</th>
                                <th id="dob">DOB</th>
                            </tr>
                            {[...employeeResults].map((item) =>
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
        )}
}


export default TableMain;