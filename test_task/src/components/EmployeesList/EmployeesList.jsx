import {useState} from "react";
import "./index.scss"

const Employee = (props) => {
    const {firstName, lastName, id} = props.employee;
    const [isActive, setIsActive] = useState(props.isActive);
    const onChange = () => {
        setIsActive(!isActive)
        props.update(id)
    }
    return (
        <div className="employee">
            <p className={`employee__name--active_${isActive} employee__name`}>{firstName} {lastName}</p>
            <div className="employee__action">
                <span className="employee__action--wrapper">
                    <input className="employee__action--input" onChange={onChange} name={id} type="radio"
                           value="not active" checked={!isActive}/>
                    <span className="employee__action--text">not active</span>
                </span>
                <span>
                    <input className="employee__action--input" onChange={onChange} name={id} type="radio"
                           value="active" checked={isActive}/>
                    <span className="employee__action--text">active</span>
                </span>
            </div>
        </div>)
}

const LetterSublist = (props) => {
    const {employees, activeList} = props
    employees.sort((a, b) => a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1 : 0)

    return employees.length === 0 ?
        <p className="no_data">No employees</p> :
        employees.map(emp => {
            let isActive = false
            activeList.forEach(id => {
                if (id === emp.id)
                    isActive = true;
            })
            return <Employee key={emp.id} update={props.update} isActive={isActive} employee={emp}/>
        })
}

const EmployeesList = (props) => {
    const employees = props.employees ?? [];
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return alphabet.map(letter => {
        const employeesByLetter = employees.filter(employee => employee.firstName[0] === letter)
        return (
            <div className="list" key={letter}>
                <p className="list__caption">{letter}</p>
                <LetterSublist update={props.update} activeList={props.activeList} employees={employeesByLetter}/>
            </div>)
    })
}

export default EmployeesList