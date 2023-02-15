import RegisterForm from "../../components/registerForm";
import axios from 'axios'

const Register=()=>{

const onSubmitHandler=async(newUser)=>{
const user={
username:newUser.username,
email:newUser.email,
birthDate:newUser.birthDate,
password:newUser.password
}
try {
   await axios.post('http://localhost:8800/api/auth/register',user).then(response=>{
    console.log(response.data)
   });
} catch (error) {
    console.log(error.response.data);
}

}

return <div>
<RegisterForm onSubmitHandler={onSubmitHandler}/>
</div>



}

export default Register;