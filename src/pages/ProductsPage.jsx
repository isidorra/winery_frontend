import axios from "axios";
import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard";
import searchIcon from "../assets/icons/search.png";
import close from "../assets/icons/red-exit.png";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);

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
      const response = await axios.get("http://localhost:5257/api/products/search?keyword=" + keyword);
      setProducts(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  const getProductsByCategory = async() => {
    try {
        const response = await axios.get("http://localhost:5257/api/products/category?categoryId=" + selectedCategory);
        setProducts(response.data);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getCategories();

    if(selectedCategory == 0)
        getProducts();
    else 
        getProductsByCategory();
  }, [selectedCategory])

  return (
    <div className="bg-primary py-16">
        <div className="max-container p-10">
            <h2 className="font-dorsa text-secondary text-7xl">Products</h2>

            <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <p className="uppercase font-thin text-lg text-white-smoke opacity-80">Filter By</p>
                    {categories.map((category, index) => 
                    <div key={index}>
                        <button onClick={() => setSelectedCategory(category.id)} className={`border border-neutral-600 py-1 px-4  rounded-md ${selectedCategory === category.id ? "bg-secondary text-primary" : 'text-white-smoke'}`}>
                            {category.name}
                        </button>
                    </div>)}
                    {selectedCategory != 0 &&
                        <button onClick={() => setSelectedCategory(0)} className="flex items-center gap-1 text-accent ">
                            <img src={close} alt="Remove" className="w-3"/>
                            Remove
                        </button>
                    }
                </div>

                <div>
                    <form onSubmit={handleSearch} className="bg-primary border text-white-smoke border-neutral-600 flex items-center gap-2 pl-4 pr-2 py-1 rounded-md">
                        
                        <input value={keyword} onChange={e => setKeyword(e.target.value)} className="bg-primary outline-none"/>
                        <button className="bg-primary text-secondary rounded-md py-1 px-2 flex items-center gap-2 font-light">
                            <img src={searchIcon} alt="Search" className="w-3"/>
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-10 mt-10">
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