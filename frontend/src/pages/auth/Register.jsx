import{useState}from"react";
import{Link,useNavigate}from"react-router-dom";
import"../../styles/Auth.css";
function Register(){
    const navigate=useNavigate();
    const[data,setData]=useState({nama:"",email:"",password:"",role:"customer"});
    const change=e=>{
        setData({...data,[e.target.name]:e.target.value});
    };
    const submit=e=>{
        e.preventDefault();
        const users=JSON.parse(localStorage.getItem("users"))||[];
        const cek=users.find(item=>item.email===data.email);
        if(cek){
            alert("Email sudah digunakan");
            return;
        }
        users.push({
            id:Date.now(),
            nama:data.nama,
            email:data.email,
            password:data.password,
            role:data.role
        });
        localStorage.setItem("users",JSON.stringify(users));
        alert("Registrasi berhasil");
        navigate("/login");
    };
    return(
        <div className="auth-page">
            <div className="auth-card">
                <h1>Register</h1>
                <form className="auth-form" onSubmit={submit}>
                    <input type="text" name="nama" placeholder="Nama Lengkap" value={data.nama} onChange={change} required/>
                    <input type="email" name="email" placeholder="Email" value={data.email} onChange={change} required/>
                    <input type="password" name="password" placeholder="Password" value={data.password} onChange={change} required/>
                    <select name="role" value={data.role} onChange={change}>
                        <option value="customer">Pelanggan</option>
                        <option value="pekerja">Pekerja</option>
                    </select>
                    <button type="submit" className="auth-btn">Daftar</button>
                </form>
                <p className="auth-footer">
                    Sudah punya akun? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
export default Register;