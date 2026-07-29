import { useState } from "react";
import profileDefault from "../assets/profile-default.png";
import "../styles/Profile.css";

function Profile() {
    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    const [nama, setNama] = useState(user.nama || "");
    const [email, setEmail] = useState(user.email || "");
    const [password, setPassword] = useState("");

    const simpan = () => {
        const updatedUser = {
            ...user,
            nama,
            email,
            password: password || user.password
        };

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const newUsers = users.map(item =>
            item.id === user.id
                ? updatedUser
                : item
        );

        localStorage.setItem(
            "users",
            JSON.stringify(newUsers)
        );

        alert("Profil berhasil diperbarui");
    };

    return (
        <div className="profile-page">
            <div className="profile-card">
                <img
                    src={profileDefault}
                    alt="Profile"
                    className="profile-image"
                />

                <h2>{nama}</h2>

                <div className="form-group">
                    <label>Nama</label>
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) =>
                            setNama(e.target.value)
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Password Baru</label>
                    <input
                        type="password"
                        placeholder="Kosongkan jika tidak ingin mengganti"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                </div>

                <button
                    className="save-btn"
                    onClick={simpan}
                >
                    Simpan Perubahan
                </button>
            </div>
        </div>
    );
}

export default Profile;