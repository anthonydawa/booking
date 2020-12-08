import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";

const Navbar = ({ currentUser }) => (
  <nav className="nav">
    <Link to="/" className="nav-link">
      Home
    </Link>
    {currentUser ? null : (
      <Link to="/login" className="nav-link">
        Login
      </Link>
    )}
    {currentUser ? null : (
      <Link to="sign-up" className="nav-link">
        Sign up
      </Link>
    )}

    {currentUser ? (
      <a href="/" onClick={() =>{ auth.signOut()}} className="nav-link">
        Log out
      </a>
    ) : null}
  </nav>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Navbar);
