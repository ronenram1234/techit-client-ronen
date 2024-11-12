import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";

interface RegisterProps {
    
}
 
const Register: FunctionComponent<RegisterProps> = () => {

    const navigate: NavigateFunction=useNavigate()
    
    
    const formik: FormikValues=useFormik<User>({
        
        intialValues:{},

        validationSchema: yup.object(),

        onSubmit:async(values)=>{},
        
        
        
        })

    return ( <>
    <h1>Register</h1>
    
  



    </> );
}
 
export default Register;