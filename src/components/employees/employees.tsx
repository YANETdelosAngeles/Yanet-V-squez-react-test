import {useFormik} from 'formik';
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, deleteEmployee, reset } from "../../features/counter/EmployeesSlice";
import { RootState } from "../../redux/store";
import "./employees.css";
import { basicSchema } from '../../schemas/schema';
import ReactPaginate from 'react-paginate';

interface Empleado 
{
    id: Number,
    name: String,
    last_name: String,
    birthday: Number
}

const Employees = () =>
{
    let lleno = false;
    let limitDatesPaginate = 10;

    const [datesEmployees, setDatesEmployees] = useState([{}]);
    const [search, setSearch] = useState('');
    
    const dispatch = useDispatch();

    const {values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: {
          name: '',
          last_name: '',
          birthday: '',
        },
        validationSchema : basicSchema,
        onSubmit: async (values: any, actions: any) => {
            console.log("valores: " + JSON.stringify(values));
            await axios.post("https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:yanet_angeles", values);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            actions.resetForm();
            loadEmployees();
        }
    });    
    
    useEffect(() => {        
        loadEmployees()
        setDatesEmployees(empleados.slice(0, limitDatesPaginate))
    }, []);  

    const loadEmployees = async () => {
        const result = await axios.get("https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:yanet_angeles");   
        const empleados = result.data.data.employees;
        if(lleno === false)
        {
            empleados.map((obj: Empleado) => (
                dispatch(addEmployee(obj))
            ))
                lleno = true;
                dispatch(deleteEmployee(0));
        }               
    }        

    function formatDate(newDate: number) 
    {
        let formatted:Date = new Date(newDate);
        let year = formatted.getFullYear()
        let day = formatted.getDate()+1
        let monthName = formatted.getMonth()+1
        const formatteds = `${day}/${monthName}/${year}`
        return formatteds.toString()
    }

    const searchFuntion = () => {
        const empleadosFilter = empleados.filter(searchF => searchF.name === search || searchF.last_name === search);

        if(empleadosFilter.length > 0)
        {
            //console.log("Entro en search:" + JSON.stringify(empleadosFilter));
            setDatesEmployees(empleadosFilter)      
        }
        else
        {
            //console.log("No entro en search:" + JSON.stringify(empleadosFilter));
            setDatesEmployees(empleados.slice(0, limitDatesPaginate))
        }       
    }

    const handlePageClick = async (data:any) => {
        const arr = Array.from({length: Math.ceil(empleados.length / limitDatesPaginate)}, (_, index) => index + 1);
        const numbreI = (arr[data.selected]*10);
        setDatesEmployees(empleados.slice(numbreI-limitDatesPaginate, numbreI))  
    }

    const empleados = useSelector((state: RootState) => state.counterE)
    
  return (
    <div className="listEmployess">
        <div className="col-sm-12 mb-4">
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Nombre, Apellidos" aria-label="Search" onChange={(e) => setSearch(e.target.value) }/>
                <button className="btn btn-outline-success" type="submit" onClick={searchFuntion}>Search</button>
            </form>
        </div>

        <div className="col-sm-12 position">
            <button className="btn btn-outline-success" data-bs-target="#exampleModal" data-bs-toggle="modal">Add Employee</button>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Employee</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Nombre:</label>
                                    <input name="name" type="text" id="name" 
                                        value={values.name} 
                                        onChange={handleChange} 
                                        onBlur={handleBlur}
                                        className={errors.name && touched.name ? "form-control input-error" : "form-control"}/>
                                </div>
                                {errors.name && touched.name && (<p className='error'>{errors.name}</p>)}
                                <div className="mb-3">
                                    <label htmlFor="last_name" className="col-form-label">Apellidos:</label>
                                    <input name="last_name" type="text" id="last_name" 
                                        value={values.last_name} 
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        className={errors.last_name && touched.last_name ? "form-control input-error" : "form-control"}/>
                                </div>
                                {errors.last_name && touched.last_name && (<p className='error'>{errors.last_name}</p>)}
                                <div className="mb-3">
                                    <label htmlFor="last_name" className="col-form-label">Fecha de cumpleaños:</label>
                                    <input name="birthday" type="date" id="last_name" 
                                        value={values.birthday} 
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        className={errors.birthday && touched.birthday ? "form-control input-error" : "form-control"}/>
                                </div>
                                {errors.birthday && touched.birthday && (<p className='error'>{errors.birthday}</p>)}

                                <button type="button" className="btn btn-outline-secondary separated" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className={(values.name) && (values.last_name) && (values.birthday) ?"btn btn-outline-success separated":"btn btn-outline-success disabledAdd"}  disabled={(values.name) && (values.last_name) && (values.birthday) ?isSubmitting: !isSubmitting}>Save Employee</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>        

        <div className="col-sm-12">
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Fecha de cumpleaños</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datesEmployees.map((empleado:any) => (
                            <tr key={empleado.id}>
                                <th scope="row"> {empleado.id}</th>
                                <td>{empleado.name}</td>
                                <td>{empleado.last_name}</td>
                                <td>{formatDate(empleado.birthday)}</td>
                            </tr>
                        ))
                    }   
                </tbody>
            </table>
        </div>      

        <ReactPaginate nextLabel='>>' previousLabel='<<' 
        onPageChange={handlePageClick} pageCount={Math.ceil(empleados.length / limitDatesPaginate)}
        containerClassName={'pagination justify-content-center'} pageClassName={'page-item'} pageLinkClassName={'page-link'}
        previousClassName={'page-item'} previousLinkClassName={'page-link'}         
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        initialPage={0}
        ></ReactPaginate>

    </div>
  )
};

export default Employees;