import { Link } from "react-router-dom";

const ProductItem = ({ product }) => (
  <div className="card mt-3 mx-auto" style={{ maxWidth: "40rem" }}>
    <div className="bg-light" style={{ width: "100%", height: "15rem" }}></div>
    <div className="card-body">
      <h5 className="card-title text-dark">{product.name}</h5>
      <p className="card-text text-dark">{product.description}</p>
      <hr />
      <div className="d-flex justify-content-between">
        <h4 className="card-text text-primary">{product.price}</h4>
        <Link to={`product/${product.id}`} className="btn btn-danger">
          Book now
        </Link>
      </div>
    </div>
  </div>
);

export default ProductItem;
