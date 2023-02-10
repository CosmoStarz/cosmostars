import { useFormik } from "formik"
import { Card } from "../../../shared/ui"
import { authSchema } from "../schemas";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';


export const SignUp = () => {
  const {values, errors, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: {
      email: '',
      login: '',
      name: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: authSchema,
    onSubmit: () => {
      console.log('sign-up')
    }
  });
  const props = {
    className: "sign-up",
    title: "Sign up",
    handleSubmit: handleSubmit,
    fields: [{
      id:"email",
      label:"Email",
      name:"email",
      value: values.email,
      type:"email",
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.email
    },
      {
      id:"login",
      label:"Login",
      name:"login",
      value:values.login,
      type:"text",
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.login
    },
    {
      id:"name",
      label:"Name",
      name:"name",
      value:values.name,
      type:"text",
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.name
    },
    {
      id:"phone",
      label:"Phone",
      name:"phone",
      value:values.phone,
      type:"text",
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.phone
    },
    {
      id:"password",
      label:"Password",
      name:"password",
      value:values.password,
      type:"password",
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.password
    },
    {
      id:"re-password",
      label:"Re-type password",
      name:"re-password",
      value:values.confirmPassword,
      type:"password",
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.confirmPassword
    },
  ],
  btn: "sign up",
  icon: <ArrowBackRoundedIcon/>  
  }
  return (
  <Card 
    handleSubmit={props.handleSubmit}
    className={props.className} 
    title={props.title}  
    fields={props.fields}
    buttonName={props.btn}
    icon={props.icon}
  />
  )
};
