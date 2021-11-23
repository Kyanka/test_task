import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getEmployees} from "../../redux/employeesReducer"

const MainPage = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employeesRed.employees)
    let dep = 0;

    useEffect(() => {
        dispatch(getEmployees());
    }, []);

    useEffect(() => {
        console.log(employees)
    }, [employees])

    return <></>
}
export default MainPage;