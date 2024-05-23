import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStateContext, { stateContext } from "../../hooks/useStateContext";

const ProductDetailsPage = () => {
  let {id} = useParams();
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState({});
  const [discount, setDiscount] = useState(null);

  const {context} = useStateContext(stateContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5257/api/products/approved-details?id=${id}`);
        setProduct(response.data);
        
        // Only fetch price and category if product exists
        if (response.data) {
          getPrice(response.data.pricingId);
          getCategory(response.data.productCategoryId);
          
          console.log(price.discountId);
        }
        console.log(price.discountId);
        getDiscount(price.discountId);
        console.log(price.discountId);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [id]);
  
  const getPrice = async (pricingId) => {
    try {
      const response = await axios.get(`http://localhost:5257/api/product/pricing/price?id=${pricingId}`);
      setPrice(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDiscount = async(discountId) => {
    try {
      const response = await axios.get(`http://localhost:5257/api/discounts/details?id=${discountId}`);
      setDiscount(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  const getCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:5257/api/product/category/category?id=${categoryId}`);
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  if (!product) return <p>Loading...</p>;
  
  return (
    <div className="bg-primary pt-16">
      <div className="max-container p-10">
        {/* {(product) ?  */}
        <div className="flex items-start justify-between">
          <div className="w-1/2">
            <h2 className="text-8xl font-dorsa text-secondary mt-10">{product.name}</h2>

            <div className="flex items-center justify-between">
              <p className="text-lg font-thin text-white-smoke opacity-80"><span className="font-normal">Category:</span> {category.name}</p>

              <div className="">
                
                {discount != null ? 
                  <div className="flex items-center gap-1">
                    <p className="text-xl text-accent tracking-[.05em] line-through">${price.price}</p>
                    <p className="text-secondary text-3xl">${(price.price * (1 - discount.percentage / 100)).toFixed(2)}</p>
                  </div>
                  :

                  <p className="text-3xl text-secondary tracking-[.05em]">${price.price}</p>
              
                }
              </div>
              
            </div>

            <p className="text-white-smoke text-lg font-thin opacity-80 mt-5 text-justify border-b border-neutral-500 pb-10">
              {product.description}
            </p>
            {context.username != "" && 
            <form className="flex items-center gap-5 mt-5">
              <input type="number" min={1} max={product.quantity} className="p-2 rounded-md w-1/6 outline-none"/>
              <button className="w-full bg-secondary p-2 uppercase rounded-md">Add To Cart</button>
            </form>
            }
            
          </div>
          <div className="text-center w-1/3 ">
            <img src={"/src/assets/products/" + product.photo} className="h-screen mx-auto"/>
          </div>
        </div>
        {/* : */}
        {/* <p>Loading...</p>
        } */}
      </div>
    </div>
  )
}

export default ProductDetailsPage