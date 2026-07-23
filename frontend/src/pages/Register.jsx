import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        role: "Pelanggan",
        nama: "",
        username: "",
        email: "",
        password: "",
        jenis_kelamin: "",
        no_hp: "",
        alamat: "",
        foto: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function register(e) {
        e.preventDefault();
        if (
            form.nama.trim() === "" ||
            form.username.trim() === "" ||
            form.email.trim() === "" ||
            form.password.trim() === "" ||
            form.jenis_kelamin === "" ||
            form.no_hp.trim() === "" ||
            form.alamat.trim() === ""
        ) {
            alert("Semua data wajib diisi");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost:22000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            alert(data.message);
            setForm({
                role: "Pelanggan",
                nama: "",
                username: "",
                email: "",
                password: "",
                jenis_kelamin: "",
                no_hp: "",
                alamat: "",
                foto: ""
            });
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert("Server tidak dapat dihubungi");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div
            style={{
                width: "450px",
                margin: "30px auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px"
            }}
        >
            <h2 align="center">
                Register TemuJasa
            </h2>
            <form onSubmit={register}>
                <p>Daftar Sebagai</p>
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="Pelanggan">
                        Pelanggan
                    </option>
                    <option value="Pekerja">
                        Pekerja
                    </option>
                </select>
                <p>Nama</p>
                <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    required
                />
                <p>Username</p>
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <p>Email</p>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <p>Password</p>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <p>Jenis Kelamin</p>
                <select
                    name="jenis_kelamin"
                    value={form.jenis_kelamin}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        -- Pilih --
                    </option>
                    <option value="Laki-laki">
                        Laki-laki
                    </option>
                    <option value="Perempuan">
                        Perempuan
                    </option>
                </select>
                <p>No HP</p>
                <input
                    type="text"
                    name="no_hp"
                    value={form.no_hp}
                    onChange={handleChange}
                    required
                />
                <p>Alamat</p>
                <textarea
                    name="alamat"
                    value={form.alamat}
                    onChange={handleChange}
                    required
                />
                <p>Foto (Opsional)</p>
                <input
                    type="text"
                    name="foto"
                    value={form.foto}
                    onChange={handleChange}
                    placeholder="foto.jpg"
                />
                <br />
                <br />
                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Register"}
                </button>
                <br />
                <br />
                <Link to="/login">
                    Sudah punya akun? Login
                </Link>
            </form>
        </div>
    );
}

export default Register;