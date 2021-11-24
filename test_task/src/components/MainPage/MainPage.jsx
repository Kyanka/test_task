import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getEmployees} from "../../redux/employeesReducer"
import "./index.scss"
import EmployeesList from "../EmployeesList";
import EmployeesBirthdays from "../EmployeesBirthdays";

const MainPage = () => {
    const dispatch = useDispatch();
    const {employees} = useSelector((state) => state.employeesRed)
    const [activeList, setActiveList] = useState([])

    const updateActiveList = (id) => {
        const list = [...activeList];
        const index = list.findIndex(activeId => id === activeId)
        if (index >= 0)
            list.splice(index, 1)
        else
            list.push(id)
        setActiveList(list)

    }
    useEffect(() => {
        dispatch(getEmployees());
        setActiveList(JSON.parse(window.localStorage.getItem('activeList')))
    }, []);

    useEffect(() => {
        window.localStorage.setItem('activeList', JSON.stringify(activeList));
    }, [activeList])


    return (
        <main className="content">
            <div className="content__employees">
                <div className="content__caption">Employees</div>
                <div className="content__employees--wrapper">
                    <EmployeesList update={updateActiveList} activeList={activeList} employees={employees}/>
                </div>
            </div>
            <div className="content__divider">
                <div className="content__divider--border"/>
            </div>
            <div className="content__birthdays">
                <div className="content__caption">Employees Birthdays</div>
                <div className="content__caption--divider"/>
                <div className="content__birthdays--wrapper">
                    <EmployeesBirthdays activeList={activeList} employees={employees}/>
                </div>
            </div>
        </main>)
}
export default MainPage;