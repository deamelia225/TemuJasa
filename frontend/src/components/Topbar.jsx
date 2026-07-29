import "../styles/Topbar.css";
import profile from "../assets/profile-default.png";

function Topbar(){
    return(
        <div className="topbar">
            <div className="topbar-title">
                <h2>TemuJasa</h2>
            </div>
            <div className="topbar-user">
                <img src={profile} alt="Profile"/>
            </div>
        </div>
    );
}
export default Topbar;