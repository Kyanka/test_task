import "./index.scss"

const Employee = (props) => {
    const {firstName, lastName, id, dob} = props.employee
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = dob.split("-")
    let month = months[parseInt(date[1], 10) - 1]
    let year = parseInt(date[0], 10)
    let day = parseInt(date[2].split("T")[0], 10)
    return <span key={id} className="employee"><div className="employee__dot"/>
        {firstName} {lastName} {day} {month} {year} year</span>
}

const MonthSublist = (props) => {
    const {employees} = props;
    employees.sort((a, b) => a.lastName < b.lastName ? -1 : a.lastName > b.lastName ? 1 : 0)

    return employees.length !== 0 ?
        employees.map(emp => <Employee key={emp.id} employee={emp}/>) :
        <p className="no_data">No employees</p>
}

const EmployeesBirthdays = (props) => {
    const {activeList, employees} = props

    if (activeList.length === 0 || employees.length === 0) {
        return <p className="no_data">Employees list is empty</p>
    } else {
        //shift months by current
        const current = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (let i = 0; i < current.getMonth(); i++) {
            let month = months.shift()
            months.push(month)
        }
        //sort active employees by activeList
        const activeEmployees = activeList.map(activeId => {
            let employee;
            employees.forEach(emp => {
                if (activeId === emp.id)
                    employee = emp
            })
            return employee
        })
        //
        return months.map((month, index) => {
            index += current.getMonth()
            index = index > 11 ? index - 12 : index
            const employeesByMonth = activeEmployees.filter(employee => parseInt(employee.dob.split("-")[1], 10) - 1 === index)
            return (
                <div className="month" key={month}>
                    <p className="month__caption">{month}</p>
                    <div className="month__list">
                        <MonthSublist employees={employeesByMonth}/>
                    </div>

                </div>)
        })
    }

}

export default EmployeesBirthdays