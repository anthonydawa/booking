import Product from "../../data/product.data";
import ProductItem from "../product-item/product-item.component"

const ProductList = () => {
  console.log(Product);
  return (
    <div className="container my-5 ">
      {Product.map(product => <ProductItem key={product.id} product={product} />)}
    </div>
  )
}

export default ProductList;
