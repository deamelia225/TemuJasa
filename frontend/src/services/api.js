const API_URL = "http://187.77.126.21:22000/api";

const request=async(endpoint,options={})=>{
    const token=localStorage.getItem("token");

    const response=await fetch(`${API_URL}${endpoint}`,{
        headers:{
            "Content-Type":"application/json",
            Authorization:token?`Bearer ${token}`:""
        },
        ...options
    });

    const text=await response.text();

    let data={};

    try{
        data=text?JSON.parse(text):{};
    }catch{
        data={message:"Response tidak valid"};
    }

    if(!response.ok){
        throw new Error(data.message||"Terjadi kesalahan");
    }

    return data;
};

const api={
    auth:{
        register:(data)=>request("/auth/register",{
            method:"POST",
            body:JSON.stringify(data)
        }),
        login:(data)=>request("/auth/login",{
            method:"POST",
            body:JSON.stringify(data)
        })
    },
    jasa:{
        getAll:()=>request("/jasa"),
        getById:(id)=>request(`/jasa/${id}`),
        create:(data)=>request("/jasa",{
            method:"POST",
            body:JSON.stringify(data)
        }),
        update:(id,data)=>request(`/jasa/${id}`,{
            method:"PUT",
            body:JSON.stringify(data)
        }),
        delete:(id)=>request(`/jasa/${id}`,{
            method:"DELETE"
        })
    },
    booking:{
        getAll:()=>request("/booking"),
        getById:(id)=>request(`/booking/${id}`),
        create:(data)=>request("/booking",{
            method:"POST",
            body:JSON.stringify(data)
        }),
        update:(id,data)=>request(`/booking/${id}`,{
            method:"PUT",
            body:JSON.stringify(data)
        })
    },
    pembayaran:{
        getAll:()=>request("/pembayaran"),
        create:(data)=>request("/pembayaran",{
            method:"POST",
            body:JSON.stringify(data)
        })
    },
    ulasan:{
        getAll:()=>request("/ulasan"),
        create:(data)=>request("/ulasan",{
            method:"POST",
            body:JSON.stringify(data)
        })
    },
    notifikasi:{
        getAll:()=>request("/notifikasi")
    },
    users:{
        getAll:()=>request("/users"),
        getById:(id)=>request(`/users/${id}`)
    },
    pekerja:{
        getAll:()=>request("/pekerja"),
        getById:(id)=>request(`/pekerja/${id}`)
    }
};

export default api;
