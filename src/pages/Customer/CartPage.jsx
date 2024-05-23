import { Link, useNavigate } from "react-router-dom"
import useStateContext, { stateContext } from "../../hooks/useStateContext"
import { useEffect, useState } from "react";
import axios from "axios";
import CartProduct from "../../components/CartProduct";
const CartPage = () => {
    const {context} = useStateContext(stateContext);
    const [cart, setCart] = useState();
    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const getCart = async() => {
        try {
            const response = await axios.get("http://localhost:5257/api/cart/customer-username?username=" + context.username);
            setCart(response.data);
            console.log(response.data);
        } catch(error) {
            console.log(error);
        }
    }

    const getCartProducts = async() => {
        try {
            const response = await axios.get("http://localhost:5257/api/cart-product/cart-id?cartId=" + cart.id);
            console.log(response.data);
            setCartProducts(response.data);
            console.log(cartProducts);
        } catch(error) {
            console.log(error);
        }
    }
    const getTotal = async() => {
        try{
            const response = await axios.get("http://localhost:5257/api/cart/total?cartId=" + cart.id);
            console.log(response.data);
            setTotal(response.data);
        } catch(error) {    
            console.log(error);
        }
    }
    

    useEffect(() => {
        getCart();
    }, []);

    useEffect(() => {
        if (cart && cart.id) {
            getCartProducts(cart.id);
            getTotal();
            
        }
    }, [cart]);
  return (
    <div className="bg-primary pt-16 pb-[600px]">
        <div className="max-container p-10">
            <div className="flex items-center justify-between">
                <h2 className="text-6xl font-dorsa text-secondary">
                    My Cart
                </h2>

                <div className="flex items-center gap-5">
                    <p className="text-xl text-white-smoke font-thin">
                        Total: <span className="font-normal">${total.toFixed(2)}</span>
                    </p>
                    
                    {total ?
                    <button className="bg-secondary py-2 px-6 rounded-md uppercase text-primary"
                             onClick={() => {navigate("/checkout", {replace: true, state: {total, cartProducts}})}}>
                            Checkout
                            </button>
                : 
                <p></p>
                        
                    }
                    

                </div>

            </div>

            {cartProducts.length === 0 ? 
                <p className="text-white-smoke text-lg mt-20">Cart is empty.</p>
            :
                <table className="table-auto w-full mt-10 mx-auto">
                    <thead className="table-auto">
                        <tr className="text-left text-secondary uppercase">
                            <th className="font-normal border-[0.5px] border-secondary p-2 bg-gray-900">Product</th>
                            <th className="font-normal border-[0.5px] border-secondary p-2 bg-gray-900 text-center">Price</th>
                            <th className="font-normal border-[0.5px] border-secondary p-2 bg-gray-900 text-center">Discounted</th>
                            <th className="font-normal border-[0.5px] border-secondary p-2 bg-gray-900 text-center">Quantity</th>
                            <th className="font-normal border-[0.5px] border-secondary p-2 bg-gray-900"></th>
                        </tr>
                    </thead>
                    <tbody className="table-auto">
                        {cartProducts.map((cartProduct, index) => 
                            <CartProduct cartProduct={cartProduct} key={index}/>
                        )}
                    </tbody>
                    
                </table>
            }

        </div>

    </div>
  )
}

export default CartPage