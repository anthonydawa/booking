import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";

import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selectors'

const Navbar = ({ currentUser }) => (
  <nav className="nav bg-dark " style={{ padding: "0.5rem 12%" }}>
    <Link to="/" className="nav-link text-primary">
      Home
    </Link>
    <Link
      to="/bookings"
      className="nav-link text-light"
      style={{ marginRight: "auto" }}
    >
      Bookings
    </Link>
    {currentUser ? null : (
      <Link to="/login" className="nav-link text-success">
        Login
      </Link>
    )}
    {currentUser ? null : (
      <Link to="sign-up" className="nav-link text-success ">
        Sign up
      </Link>
    )}

    {currentUser ? (
      <a
        href="/"
        onClick={() => {
          auth.signOut();
        }}
        className="nav-link text-warning"
      >
        Log out
      </a>
    ) : null}
  </nav>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Navbar);
