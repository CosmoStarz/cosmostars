import { useFormik } from "formik"
import { Card } from "../../../shared/ui"
import { authSchema } from "../schemas";


export const SignIn = () => {

  const {values, errors, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: authSchema,
    onSubmit: () => {
      console.log('sign-in')
    }
  });
  console.log(errors)
  const props = {
    className: "sign-in",
    title: "Login",
    handleSubmit: handleSubmit,
    fields: [{
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
      id:"password",
      label:"Password",
      name:"password",
      value:values.password,
      type:"password",
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors.password
    },
  ],
  btn: "sign in",
  link: "Create account?",
    
  }
  return (<Card 
    handleSubmit={props.handleSubmit}
    className={props.className} 
    title={props.title}  
    fields={props.fields}
    buttonName={props.btn}
    linkName={props.link}
    />)
};
