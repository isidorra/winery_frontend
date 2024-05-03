import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useStateContext, { stateContext } from '../hooks/useStateContext';
const ProductCard = ({product}) => {

  const [price, setPrice] = useState(0);
  const {context} = useStateContext(stateContext);
  
  const getPrice = async() => {
    try {
        const response = await axios.get(`http://localhost:5257/api/product/pricing/price?id=${product.pricingId}`);
        setPrice(response.data);
        console.log(price);
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    getPrice();
  }, [])
  return (
    <div className="bg-primary white-shadow w-1/3">
        <img src={"src/assets/products/" + product.photo} alt={product.name} className="h-96 mx-auto"/>
        <div className="flex items-center justify-between p-5">
            <h3 className="text-white-smoke text-xl font-thin">{product.name}</h3>
            <p className="text-xl text-secondary">${price.price}</p>
        </div>
        <div className="px-5 pb-5">
            {context.username != "" && 
            <form className="flex items-center gap-2 mb-2">
                <input type="number" className="w-1/4 p-2 outline-none rounded-md" min={1} max={product.quantity}/>
                <button className="w-full bg-secondary rounded-md p-2 uppercase">Add To Cart</button>
            </form> }
            <Link to={"/products/" + product.id} className="w-full block text-center border border-secondary rounded-md p-2 text-secondary">
                See More
            </Link>
        </div>
        
    </div>
  )
}

export default ProductCard