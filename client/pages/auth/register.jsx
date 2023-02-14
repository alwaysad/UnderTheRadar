import RegisterForm from "../../components/registerForm";
import axios from 'axios'

const Register=()=>{

const onSubmitHandler=(newUser)=>{
const user={
username:newUser.username,
email:newUser.email,
birthdate:newUser.birthdate,
password:newUser.password
}

axios.post('http://localhost:8800/api/auth/register',user);

}

return <div>
<RegisterForm onSubmitHandler={onSubmitHandler}/>
</div>



}

export default Register;