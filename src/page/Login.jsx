import loginImg from "../asset/Images/boycode.jpg"
import Template from "../components/auth/Template"

 function Login ()  {
  return (
    <Template
    title="welcome back"
    formType="login"
    description1="Add task create team ."
    description2="Education to future-proof your career."
    image={loginImg}
    />

  )
}

export default Login