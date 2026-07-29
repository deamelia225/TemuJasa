import {useState} from "react";
import {useSearchParams,useNavigate} from "react-router-dom";
import "../styles/Ulasan.css";

function Ulasan(){
    const[searchParams]=useSearchParams();
    const navigate=useNavigate();
    const id=Number(searchParams.get("id"));

    const[rating,setRating]=useState(5);
    const[ulasan,setUlasan]=useState("");

    const submitUlasan=()=>{
        const booking=JSON.parse(localStorage.getItem("booking"))||[];

        const updated=booking.map(item=>
            item.id===id
                ?{
                    ...item,
                    rating,
                    ulasan
                }
                :item
        );

        localStorage.setItem("booking",JSON.stringify(updated));

        alert("Ulasan berhasil dikirim");
        navigate("/booking");
    };

    return(
        <div className="ulasan-page">
            <div className="ulasan-card">
                <h1>Beri Ulasan</h1>

                <div className="ulasan-content">
                    <h2>Berikan Penilaian</h2>

                    <div className="rating-group">
                        {[1,2,3,4,5].map(star=>(
                            <span
                                key={star}
                                className={
                                    star<=rating
                                        ?"star active"
                                        :"star"
                                }
                                onClick={()=>setRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <textarea
                        value={ulasan}
                        onChange={e=>setUlasan(e.target.value)}
                        placeholder="Tulis komentar atau pengalaman Anda..."
                    />

                    <button
                        className="btn-kirim-ulasan"
                        onClick={submitUlasan}
                    >
                        Kirim Ulasan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Ulasan;