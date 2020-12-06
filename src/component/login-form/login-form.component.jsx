import { Component } from "react";
import {
  auth,
  signInWithFacebook,
  signInWithGoogle,
} from "../../firebase/firebase.utils";

import "./login-form.scss";

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { email, password } = this.state;

    return (
      <div className="login-form">
        <div className="card mx-auto login-card bg-gradient-light">
          <div className="card-body my-5">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Log In
              </button>
              <button type="submit" className="btn btn-success btn-block">
                Register
              </button>
            </form>

            <div className="mt-4 text-center">
              <small className="text-muted mt-5 mr-3 ">Login with </small>
            </div>

            <div className="mt-3 login-btn">
              <div className="col-6">
                <button
                  onClick={signInWithGoogle}
                  className="btn btn-primary btn-block"
                >
                  Google
                </button>
              </div>
              <div className="col-6">
                <button
                  onClick={signInWithFacebook}
                  className="btn btn-primary btn-block "
                >
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
