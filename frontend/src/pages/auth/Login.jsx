import{useState}from"react";
import{Link,useNavigate}from"react-router-dom";
import"../../styles/Auth.css";
function Login(){
    const navigate=useNavigate();
    const[data,setData]=useState({email:"",password:""});
    const change=e=>{
        setData({...data,[e.target.name]:e.target.value});
    };
    const submit=e=>{
        e.preventDefault();
        const users=JSON.parse(localStorage.getItem("users"))||[];
        const user=users.find(item=>item.email===data.email&&item.password===data.password);
        if(!user){
            alert("Email atau password salah");
            return;
        }
        localStorage.setItem("token","login-success");
        localStorage.setItem("user",JSON.stringify(user));
        localStorage.setItem("role",user.role);
        if(user.role==="worker"||user.role==="pekerja"){
            navigate("/dashboard-pekerja");
        }else{
            navigate("/dashboard-customer");
        }
    };
    return(
        <div className="auth-page">
            <div className="auth-card">
                <h1>Login</h1>
                <form className="auth-form" onSubmit={submit}>
                    <input type="email" name="email" placeholder="Email" value={data.email} onChange={change} required/>
                    <input type="password" name="password" placeholder="Password" value={data.password} onChange={change} required/>
                    <button type="submit" className="auth-btn">Login</button>
                </form>
                <p className="auth-footer">
                    Belum punya akun? <Link to="/register">Daftar</Link>
                </p>
            </div>
        </div>
    );
}
export default Login;
