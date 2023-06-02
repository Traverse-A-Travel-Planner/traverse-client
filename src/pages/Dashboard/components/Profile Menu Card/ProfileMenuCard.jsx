import { Link } from "react-router-dom";
import "./profileMenuCard.css"

const ProfileMenuCard = () => {
    return(
        <>
        <div className="profile-menu-card">
            <ul>
              <li className="items about-me-btn">
                <Link style={{ textDecoration: "none", color: "black" }} to="/dashboard">
                  About me
                </Link>
                </li>
              <li className="items change-password-btn">
                <Link style={{ textDecoration: "none", color: "black" }} to="/changePassword">
                  Change Password
                </Link>
              </li>
              <li className="items change-avatar-btn">
                <Link style={{ textDecoration: "none", color: "black" }} to="/dashboard">
                  Change Avatar
                </Link>
              </li>
            </ul>
          </div>
        </>
    )
}

export default ProfileMenuCard;