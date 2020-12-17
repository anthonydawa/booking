import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { firestore } from "../../firebase/firebase.utils";



class BookingPage extends Component {
  constructor() {
    super();
    this.state = {
      bookings: [],
    };
  }

  componentDidMount() {


  }



  render() {
    return <Fragment></Fragment>;
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(BookingPage);
