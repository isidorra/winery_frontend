import axios from "axios";
import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard";
import searchIcon from "../assets/icons/search.png";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  const getProducts = async () => {
    try {
        const response = await axios.get("http://localhost:5257/api/products");
        setProducts(response.data);
        console.log(response.data);
    } catch(error) {
        console.log(error);
    }
  }

  const getCategories = async () => {
    try {
        const response = await axios.get("http://localhost:5257/api/product/category");
        setCategories(response.data);
    } catch(error) {
        console.log(error);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5257/api/products/search", JSON.stringify(keyword), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setProducts(response.data);
    } catch(error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    getProducts();
    getCategories();
  }, [])

  return (
    <div className="bg-primary py-16">
        <div className="max-container p-10">
            <h2 className="font-dorsa text-secondary text-7xl">Products</h2>

            <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <p className="uppercase font-thin text-lg text-white-smoke opacity-80">Filter By</p>
                    {categories.map((category, index) => 
                    <div key={index}>
                        <button className="border border-neutral-600 py-1 px-4 text-white-smoke rounded-md">
                            {category.name}
                        </button>
                    </div>)}
                </div>

                <div>
                    <form onSubmit={handleSearch} className="bg-white-smoke flex items-center gap-2 pl-4 pr-2 py-1 rounded-md">
                        <img src={searchIcon} alt="Search" className="w-3"/>
                        <input value={keyword} onChange={e => setKeyword(e.target.value)} className="bg-white-smoke outline-none"/>
                        <button className="bg-primary text-secondary rounded-md py-1 px-2">Search</button>
                    </form>
                </div>
            </div>

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