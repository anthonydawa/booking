import LoginForm from "./component/login-form/login-form.component";
import SignUpForm from "./component/sign-up-form/sign-up-form.component";
import Home from "./component/home.component";
import Navbar from "./component/navbar/navbar.component";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const { Component } = require("react");

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/login"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <LoginForm />
            }
          />
          <Route
            exact
            path="/sign-up"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignUpForm />
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
