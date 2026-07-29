import{useEffect,useState}from"react";
import{useNavigate,useParams}from"react-router-dom";
import"../styles/FormJasa.css";
function KelolaJasa(){
    const{id}=useParams();
    const navigate=useNavigate();
    const[data,setData]=useState({
        nama_jasa:"",
        kategori:"",
        harga:"",
        deskripsi:""
    });
    useEffect(()=>{
        const jasa=JSON.parse(localStorage.getItem("jasa"))||[];
        const item=jasa.find(x=>String(x.id)===id);
        if(item){
            setData(item);
        }
    },[id]);
    const change=e=>{
        setData({...data,[e.target.name]:e.target.value});
    };
    const submit=e=>{
        e.preventDefault();
        const jasa=JSON.parse(localStorage.getItem("jasa"))||[];
        const update=jasa.map(item=>{
            if(String(item.id)===id){
                return{
                    ...item,
                    nama_jasa:data.nama_jasa,
                    kategori:data.kategori,
                    harga:data.harga,
                    deskripsi:data.deskripsi
                };
            }
            return item;
        });
        localStorage.setItem("jasa",JSON.stringify(update));
        navigate("/jasa-saya");
    };
    return(
        <div className="page">
            <form className="form-card" onSubmit={submit}>
                <h1>Edit Jasa</h1>
                <input type="text" name="nama_jasa" value={data.nama_jasa} onChange={change} required/>
                <select name="kategori" value={data.kategori} onChange={change} required>
                    <option value="Cleaning Service">Cleaning Service</option>
                    <option value="Service AC">Service AC</option>
                    <option value="Service Laptop">Service Laptop</option>
                    <option value="Tukang Bangunan">Tukang Bangunan</option>
                    <option value="Tukang Listrik">Tukang Listrik</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Pindahan">Pindahan</option>
                    <option value="Cat Rumah">Cat Rumah</option>
                </select>
                <input type="number" name="harga" value={data.harga} onChange={change} required/>
                <textarea name="deskripsi" value={data.deskripsi} onChange={change} rows="5" required/>
                <button type="submit">Update Jasa</button>
            </form>
        </div>
    );
}
export default KelolaJasa;