import axios from "axios";
import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async() => {
    try {
        const response = await axios.get("http://localhost:5257/api/products");
        setProducts(response.data);
        console.log(response.data);
    } catch(error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div className="bg-primary py-16">
        <div className="max-container p-10">
            <h2 className="font-dorsa text-secondary text-7xl">Products</h2>

            <div className="flex items-start gap-5 justify-between mt-10">
                {products.map((product, index) => 
                    <ProductCard key={index}
                                //  id={product.id}
                                //  name={product.name}
                                //  priceId={product.pricingId}
                                //  photo={product.photo}
                                //  quantity={product.quantity}
                                product={product}/>
                )}
            </div>
        </div>
    </div>
  )
}

export default ProductsPage