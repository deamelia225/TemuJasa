function Dashboard() {
    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    return (
        <div className="welcome-card">
            <h1>Selamat Datang, {user.nama} </h1>
            <p>Temukan jasa terbaik untuk kebutuhan Anda.</p>
        </div>
    );
}

export default Dashboard;