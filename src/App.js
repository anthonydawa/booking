import LoginForm from "./component/login-form/login-form.component";
import SignUpForm from "./component/sign-up-form/sign-up-form.component";
import Home from "./component/home.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const { Component } = require("react");

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((Snapshot) => {
          this.setState({
            currentUser: {
              id: Snapshot.id,
              ...Snapshot.data(),
            },
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/">home</Link>
          <Link to="/login">login</Link>
          <Link to="/sign-up">signup</Link>
          {this.state.currentUser ? (
            <button onClick={() => auth.signOut()}>Log Out</button>
          ) : (
            <p>no user</p>
          )}
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginForm} />
          <Route path="/sign-up" component={SignUpForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
