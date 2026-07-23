import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    async function login(e) {
        e.preventDefault();
        if (username.trim() === "" || password.trim() === "") {
            alert("Username dan Password harus diisi");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost:22000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            if (!data) {
                alert("Login gagal");
                return;
            }
            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );
            setUsername("");
            setPassword("");
            if (data.role === "Pelanggan") {
                navigate("/dashboard-pelanggan");
                return;
            }
            if (data.role === "Pekerja") {
                navigate("/dashboard-pekerja");
                return;
            }
            alert("Role tidak dikenali");
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
                width: "350px",
                margin: "50px auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px"
            }}
        >
            <h2 align="center">
                Login TemuJasa
            </h2>
            <form onSubmit={login}>
                <p>Username</p>
                <input
                    type="text"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "8px"
                    }}
                    required
                />
                <p>Password</p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "8px"
                    }}
                    required
                />
                <br />
                <br />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "10px"
                    }}
                >
                    {loading ? "Loading..." : "Login"}
                </button>
                <br />
                <br />
                <div align="center">
                    <Link to="/register">
                        Belum punya akun? Register
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;