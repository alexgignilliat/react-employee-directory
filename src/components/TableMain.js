import React, { Component } from "react";
import API from "../utils/API"
import EmployeeRow from "./EmployeeRow"

class TableMain extends Component {
    state = {
        originalResults: [],
        displayResults: []
    };

    componentDidMount() {
        API.search().then(results => {
            const tableData = results.data.results.map((res, i) => ({
                image: res.picture.large,
                firstName: res.name.first,
                lastName: res.name.last,
                phone: res.phone,
                email: res.email,
                dob: res.dob.date.slice(0,10),
                key: i
            }));



            this.setState({ originalResults: tableData, displayResults: tableData });
        });
    }

    filterResults = (query, results) => {
        return results.filter(employee => {
            const lastName = employee.lastName.toLowerCase();
            const firstName = employee.firstName.toLowerCase();
            const fullName = firstName + " " + lastName;

            return fullName.includes(query);
        });
    };

    sortResults = event => {
        this.setState(prevState => {
            const { displayResults, sortOrder } = prevState;

            if (sortOrder === "descending") {
                displayResults.sort((a, b) => {
                    if (a.firstName > b.firstName) {
                        return -1;
                    }
                    return a.firstName > b.firstName ? 1 : 0;
                });
            } else {
                displayResults.sort((a, b) => {
                    if (a.firstName < b.firstName) {
                        return -1;
                    }
                    return a.firstName > b.firstName ? 1 : 0;
                });
            }

            return {
                displayResults,
                sortOrder: sortOrder === "descending" ? "ascending" : "descending"
            };
        });
    };

    onChange = e => {
        const query = e.target.value;

        this.setState(prevState => ({
            displayResults:
                query.length > 0
                    ? this.filterResults(query, prevState.originalResults)
                    : prevState.originalResults
        }));
    };

    render() {
        return (
            <div>
                <p style={{ color: "white" }}>Searh Employee by name:<br/>
                <input label="Search" onChange={this.onChange} /></p>
                <div className="row">
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <th>Image</th>
                                <th style={{ cursor: "pointer" }} onClick={this.sortResults} id="name">
                                    Name
                                </th>
                                <th id="phone">Phone</th>
                                <th id="email">Email</th>
                                <th id="dob">DOB</th>
                            </tr>
                            {this.state.displayResults.map(item => (
                                <EmployeeRow
                                    image={item.image}
                                    firstName={item.firstName}
                                    lastName={item.lastName}
                                    email={item.email}
                                    phone={item.phone}
                                    dob={item.dob}
                                    key={item.key}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TableMain;