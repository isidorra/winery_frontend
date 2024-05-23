import axios from "axios";
import { useEffect, useState } from "react"

const CartProduct = ({cartProduct}) => {
    const [product, setProduct] = useState({});
    const [productPrice, setProductPrice] = useState(0);
    const [productDiscount, setProductDiscount] = useState(1);
    const [quantity, setQuantity] = useState(cartProduct.quantity);

    const getProductByCartProductId = async() => {
        try {
            const response = await axios.get("http://localhost:5257/api/products/approved-details?id=" + cartProduct.productId);
            console.log(response.data);
            setProduct(response.data);
            console.log("Product" + response.data);
        } catch {
            console.log(error);
        }
    }
    const getProductPrice = async () => {
        try {
          const response = await axios.get(`http://localhost:5257/api/product/pricing/price?id=${product.pricingId}`);
          setProductPrice(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
    }
    const getDiscount = async () => {
        try {
          const response = await axios.get(`http://localhost:5257/api/discounts/details?id=${productPrice.discountId}`);
          setProductDiscount(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    const removeFromCart = async() => {
        try {
            const response = await axios.post("http://localhost:5257/api/cart-product/delete?id=" + cartProduct.id);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    const editQuantity = async(ev) => {
        ev.preventDefault();
        try {
            const response = await axios.post("http://localhost:5257/api/cart-product/edit-quantity?quantity=" + quantity + "&id=" + cartProduct.id);
            console.log(response.data);
        } catch(error) {
            console.log(error);
        }
    }
    
    

    useEffect(() => {
        getProductByCartProductId();
        getProductPrice();
        
        
    }, []);

    useEffect(() => {
        if (product && product.id) {
            getProductPrice(product.id);
            
        }
    }, [product]);

    useEffect(() => {
        if(productPrice.price && quantity) {
            getDiscount();
        }
        
    }, [quantity, productPrice.price, productDiscount.discountId, productDiscount.percentage])
    

    
    

  return (
    
        <tr>
            <td className="border-[0.5px] border-secondary flex items-center gap-5 p-2">
                <img src={"src/assets/products/" + product.photo} className="h-20"/>
                <p className="text-white-smoke text-xl font-thin">{product.name}</p>
            </td>
            <td className="border-[0.5px] border-secondary">
                <p className="text-white-smoke opacity-70 text-center">${productPrice.price}</p>
            </td>
            <td className="border-[0.5px] border-secondary">
                {productDiscount.percentage != null ?
                    
                    <p className="text-center text-white-smoke">${(productPrice.price * (1 - productDiscount.percentage / 100)).toFixed(2)}</p>
                    
                :
                    <p className="text-center text-white-smoke">-</p>
                }
                
            </td>
            <td className="border-[0.5px] border-secondary">
                <form onSubmit={editQuantity}
                    className="flex items-center gap-3 justify-center">
                    <input value={quantity} 
                            onChange={ev => setQuantity(ev.target.value)} 
                            min={1} max={product.quantity} type="number"
                            className="bg-white-smoke rounded-md p-2 w-24"/>
                    <button className="p-2 rounded-md bg-green-500 text-white-smoke">
                        Save Changes
                    </button>
                </form>
            </td>
            
            <td className="border-[0.5px] border-secondary text-center">
                <button onClick={removeFromCart} 
                        className="bg-accent py-2 px-4 rounded-md text-white-smoke uppercase mx-auto">
                    Remove
                </button>
            </td>
        </tr>
        
    
  )
}

export default CartProduct