
import { Link,useNavigate } from "react-router-dom";
export const Navbar = () => {
    const navigate = useNavigate();

    return(
        <div className="Navbar">
<Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>

     

        </div>

    )
}