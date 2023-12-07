import signupImg from "../asset/Images/group.png"
import Template from "../components/auth/Template"

function Signup() {
  return (
    <Template
      title="Join the millions learning  for group colab for free"
      description1="Add task create team."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup