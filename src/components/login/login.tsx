import {useFormik} from 'formik';
import { requiredLogin } from '../../schemas/schema';
import { logIn } from '../../features/counter/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { RootState } from '../../redux/store';
import imagen1 from "../../imagenes/2.jpg";
import "./login.css";
import React, {useState} from 'react';


const Login = () => {
    const [isWrongAuth, setIsWrongAuth] = useState(false);
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const users = useSelector((state: RootState) => state.counter)

    const Login = () => {      

        const payload = users.find(user => user.correo === values.email && user.contraseña === values.password)

        if(payload)
        {
            dispatch(logIn(payload));
            setIsWrongAuth(false)
            navigate("/employees");
        }
        else
        {

            setIsWrongAuth(true)
        }
    }



    const {values, errors, isSubmitting,touched, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            email:'',
            password:'',
        },
        validationSchema : requiredLogin ,
        onSubmit: async (values: any, actions: any) => {
            console.log("valores: " + JSON.stringify(values));
            actions.resetForm();

            setTimeout(()=>{
                setIsWrongAuth(false)
            }, 2000)
        }
    });    
    

  return (
    <>
        <div className="containerLogin">
          <div className="row seccion">
              <div className="col-sm-6 sn-padding">
                <img alt="imagen Login" src={imagen1} className="dimension"/>  
              </div>
              <div className="col-sm-6">
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <legend>Login to Account</legend>
                            <div className="form-floating mb-3">
                                <input name='email' onPaste={(event) => {event.preventDefault();}} type="email" className={errors.email && touched.email ? "form-control input-error" : "form-control"} id="floatingInput"
                                    value={values.email} onChange={handleChange}  onBlur={handleBlur}
                                    >
                                 </input>
                                <label htmlFor="floatingInput">Email *</label>
                                {errors.email && touched.email && (<p className='error'>{errors.email}</p>)}
                            </div>
                            <div className="form-floating mb-3">
                                <input name='password' onCopy={(event) => {event.preventDefault();}} onPaste={(event) => {event.preventDefault();}} type="password" className={errors.password && touched.password ? "form-control input-error" : "form-control"} id="floatingPassword"
                                   value={values.password} onChange={handleChange}  onBlur={handleBlur}
                                    >                                        
                                </input>
                                <label htmlFor="floatingPassword">Password *</label>
                                {errors.password && touched.password && (<p className='error'>{errors.password}</p>)}
                            </div>
                            <button type="submit" className={(values.email) && (values.password) ?"col-sm-6 btn btn-primary size":"col-sm-6 btn disabled size"} onClick={Login} disabled={(values.email) && (values.password) ?isSubmitting: !isSubmitting} >Login In</button>
                        </form> 
                        {
                            isWrongAuth?
                            <div className="alert alert-danger " role="alert">
                                email o password incorrectos
                            </div>                                                      
                            :null
                        }
                    </div>                                               
              </div>
          </div>
        </div>
    </>    
  );
}

export default Login;