import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useStateContext, { stateContext } from '../hooks/useStateContext';

const ProductCard = ({ product }) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(null);
  const { context } = useStateContext(stateContext);
  
  const getPrice = async () => {
    try {
      const response = await axios.get(`http://localhost:5257/api/product/pricing/price?id=${product.pricingId}`);
      setPrice(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  const getDiscount = async () => {
    try {
      const response = await axios.get(`http://localhost:5257/api/discounts/details?id=${price.discountId}`);
      setDiscount(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  const calculateDiscountedPrice = () => {
    if (price && discount) {
      const discountedPrice = price.price * (1 - discount.percentage / 100);
      return discountedPrice.toFixed(2);
    }
    return price.price.toFixed(2);
  }
  
  useEffect(() => {
    getPrice();
  }, []);

  useEffect(() => {
    if (price.discountId) {
      getDiscount();
    } else {
      setDiscount(null);
    }
  }, [price]);

  return (
    <div className="test2 white-shadow hover:drop-shadow-[1px_1px_10px_#58574a] duration-300">
      <img src={"src/assets/products/" + product.photo} alt={product.name} className="h-96 mx-auto"/>
      <div className="flex items-center justify-between p-5">
        <h3 className="text-white-smoke text-xl font-thin">{product.name}</h3>
        {discount != null ?
          <div className="flex flex-col items-center">
            <p className="text-secondary line-through text-base">${price.price}</p>
            <p className="text-secondary text-lg">${calculateDiscountedPrice()}</p>
          </div>
          :
          <p className="text-xl text-secondary">${price.price}</p>
        }
      </div>
      <div className="px-5 pb-5">
        {(context.username !== "" && context.role === "9") &&
          <form className="flex items-center gap-2 mb-2">
            <input type="number" className="w-1/4 p-2 outline-none rounded-md" min={1} max={product.quantity}/>
            <button className="w-full bg-secondary rounded-md p-2 uppercase">Add To Cart</button>
          </form>
        }
        <Link to={"/products/" + product.id} className="uppercase w-full block text-center border border-secondary rounded-md p-2 text-secondary">
          See More
        </Link>
      </div>
    </div>
  )
}

export default ProductCard;
