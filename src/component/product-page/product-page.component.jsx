import { Component } from "react";
import { connect } from "react-redux";
import Product from "../../data/product.data";
import { addBookingToUser, firestore } from "../../firebase/firebase.utils";

class ProductPage extends Component {
  constructor() {
    super();

    this.state = {
      product: {},
      dateFrom: {
        value: "",
        valueAsNumber: 0,
      },
      dateTo: {
        value: "",
        valueAsNumber: 0,
      },
      duration: 0,
    };
  }

  componentDidMount() {
    const productId = this.props.match.params.id;
    const filteredProducts = Product.filter(
      (product) => product.id == productId
    );
    this.setState({ product: filteredProducts[0] });
  }
  handleChange = (event) => {
    const { value, valueAsNumber, name } = event.target;
    this.setState({ [name]: { value, valueAsNumber } }, () => {
      if (this.state.dateFrom == null || this.state.dateFrom == null) {
        return;
      } else {
        this.setState(
          {
            duration:
              this.state.dateFrom.valueAsNumber -
              this.state.dateTo.valueAsNumber,
          },
          () => {
            console.log(this.state);
          }
        );
      }
    });
  }
  handleSubmit = () => {
    const { id, name, description, price } = this.state.product;
    const { dateFrom, dateTo, duration } = this.state;
    const { currentUser } = this.props;
    const booking = {
      userId: currentUser.currentUser.id,
      productId: id,
      dateTo,
      dateFrom,
      duration,
      name,
      description,
      price,
    };

    if (currentUser.currentUser != null && duration > 0) {
      let createdAt = new Date();

      firestore.collection("bookings").add({
        createdAt,
        booking,
      }).then( (doc) => {
        addBookingToUser(booking.userId,doc.id)
      })
      }
    }
  

  render() {
    const { name, price, description } = this.state.product;
    return (
      <div className="container">
        <div className="jumbotron mt-5" style={{ height: "20rem" }}></div>
        <div className="container">
          <div className="d-flex justify-content-between">
            <button onClick={this.handleSubmit} className="btn btn-danger">
              Book now
            </button>
            <h4 className="text-primary">
              {price} <small>/ Day</small>
            </h4>
          </div>

          <div className="d-flex justify-content-end mt-2">
            <div>
              <label className="mr-2"> Duration </label>

              <input
                value={this.state.dateTo.value}
                onChange={this.handleChange}
                className="mr-2"
                type="date"
                name="dateTo"
              />
              <input
                value={this.state.dateFrom.value}
                onChange={this.handleChange}
                className="mr-2"
                type="date"
                name="dateFrom"
              />
            </div>
          </div>

          <hr />
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(ProductPage);
