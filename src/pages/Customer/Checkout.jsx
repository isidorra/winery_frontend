import axios from "axios";
import useStateContext, { stateContext } from "../../hooks/useStateContext"
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Checkout = (props) => {
    const {context} = useStateContext(stateContext);
    const [customer, setCustomer] = useState({});
    const location = useLocation();
    const [note, setNote] = useState("");
    console.log(location);
    const total = location.state.total;
    const cartProducts = location.state.cartProducts;
    const customerId = customer.id;
    const [missingDataError, setMissingDataError] = useState(false);
    
    

    const getCustomer = async() => {
        try {
            const response = await axios.get("http://localhost:5257/api/customers/username?username=" + context.username);
            console.log(response.data);
            setCustomer(response.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    const createOrder = async() => {
        if(!customer.street || !customer.number || !customer.floor || !customer.door || !customer.cityId){
            setMissingDataError(true);
        } else {
            try {
                const response = await axios.post("http://localhost:5257/api/purchase", {
                    customerId: customerId,
                    total: total, 
                    note: note,
                    cartProducts: cartProducts
    
                });
                console.log(response.data);
            } catch(error) {
                console.log(error);
            }
        }
        
    }

    useEffect(() => {
        getCustomer();
        
    }, [])
  return (
    <div className="bg-primary py-16 pb-[200px]">
        <div className="max-container p-10">
            <h2 className="text-6xl font-dorsa text-secondary">
                Checkout
            </h2>

            <div className="flex items-start justify-between">
                <div className="mt-10 w-1/3 border-r-[0.5px] border-white-smoke">
                    <h3 className="text-5xl text-secondary font-dorsa">
                        Personal Info
                    </h3>
                    <p className="text-white-smoke opacity-90 text-lg">
                        <span className="opacity-80">Name:</span> {customer.firstname} {customer.lastname}
                    </p>
                    <p className="text-white-smoke opacity-90 text-lg">
                        <span className="opacity-80">Email:</span> {customer.email}
                    </p>
                    <p className="text-white-smoke opacity-90 text-lg">
                        <span className="opacity-80">Phone Number: </span> {customer.phoneNumber}
                    </p>

                    <h3 className="text-5xl text-secondary font-dorsa mt-5">
                       Delivery Info
                    </h3>
                    <p className="text-white-smoke opacity-90 text-lg">
                        <span className="opacity-80">Street:</span> 
                        {customer.street ?
                            customer.street
                        :
                            <span className="ml-2">-</span>
                        }
                        
                    </p>
                    <p className="text-white-smoke opacity-90 text-lg">
                        <span className="opacity-80">Number:</span> 
                        {customer.number ?
                            customer.number
                        :
                            <span className="ml-2">-</span>
                        }
                        
                    </p>
                    <p className="text-white-smoke opacity-90 text-lg">
                        <span className="opacity-80">Floor:</span> 
                        {customer.floor ?
                            customer.floor
                        :
                            <span className="ml-2">-</span>
                        }
                        
                    </p>
                    <p className="text-white-smoke opacity-90 text-lg">
                        <span className="opacity-80">Door:</span> 
                        {customer.door ?
                            customer.door
                        :
                            <span className="ml-2">-</span>
                        }
                        
                    </p>
                    <p className="text-white-smoke opacity-90 text-lg mb-5">
                        <span className="opacity-80">City:</span> 
                        {customer.cityId ?
                            customer.cityId
                        :
                            <span className="ml-2">-</span>
                        }
                        
                    </p>
                    {missingDataError && 
                        <p className="text-2xl text-accent mb-5">Delivery info is required.</p>
                    }
                    <Link to={"/profile"} className="bg-white-smoke rounded-md py-2 px-6 mt-10">
                        Edit Delivery Info
                    </Link>

                </div>

                <div className="mt-10 w-2/3 pl-10">
                    <h3 className="text-5xl text-secondary font-dorsa">
                        Order Details
                    </h3>
                    <p className="text-white-smoke text-xl mt-5">Total: ${total.toFixed(2)}</p>
                    <form className="mt-5">
                        <h3 className="text-white-smoke text-xl mb-2">
                            Payment Method
                            <span className="text-accent text-sm align-super ml-2">
                                *Only Cash on delivery payment method available at the moment.
                            </span>
                        </h3>
                        <input type="radio" checked/>
                        <label className="text-white-smoke ml-2">Cash on Delivery</label>
                        <input type="radio" disabled className="ml-10"/>
                        <label className="text-white-smoke ml-2">Credit Card</label>
                        <input type="radio" disabled className="ml-10"/>
                        <label className="text-white-smoke ml-2">Stripe</label>
                    </form>

                    <h3 className="text-white-smoke text-xl mb-2 mt-5">Additional Note</h3>
                    <textarea value={note} onChange={(ev) => setNote(ev.target.value)}
                            placeholder="Note" 
                            className="w-full p-2 rounded-md outline-none bg-white-smoke resize-none"></textarea>
                    <button onClick={createOrder} className="w-full p-2 rounded-md uppercase bg-secondary mt-5">Finish Order</button>
                </div>
            </div>


        </div>
    </div>
  )
}

export default Checkout