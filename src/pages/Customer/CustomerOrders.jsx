import { useEffect, useState } from "react"
import axios from "axios";
import useStateContext, { stateContext } from "../../hooks/useStateContext";
import CustomerOrder from "../../components/CustomerOrder";

const CustomerOrders = () => {
  const {context} = useStateContext(stateContext);
  const [customer, setCustomer] = useState({});
  const [orders, setOrders] = useState();

  const getCustomer = async() => {
    try {
        const response = await axios.get("http://localhost:5257/api/customers/username?username=" + context.username);
        console.log(response.data);
        setCustomer(response.data);
        
    } catch (error) {
        console.log(error);
    }
  }

  const getCustomerOrders = async() => {
    try {
        const response = await axios.get("http://localhost:5257/api/purchase/customer-id?customerId=" + customer.id);
        console.log(response.data);
        setOrders(response.data);
    } catch(error) {
        console.log(error);
    }
  }
  useEffect(() => {
    getCustomer();

    
  }, [])
  useEffect(() => {
    if(customer && customer.id)
      getCustomerOrders();
  }, [customer.id])
  return (
    <div className="bg-primary py-16 pb-[700px]">
      <div className="max-container px-10">
          <h2 className="font-dorsa text-6xl text-secondary mt-10">
                My Orders
          </h2>

          <table className="table-auto w-full mt-10 mx-auto">
                <thead className="table-auto">
                    <tr className="text-left">
                        <th className="border border-primary bg-secondary font-normal p-2">Order ID</th>
                        <th className="border border-primary bg-secondary font-normal p-2">Total</th>
                        <th className="border border-primary bg-secondary font-normal p-2">Created At</th>
                        <th className="border border-primary bg-secondary font-normal p-2">Status</th>
                        <td className="border border-primary bg-secondary font-normal p-2"></td>
                    </tr>
                </thead>

                <tbody className="table-fixed">
                    {orders && orders.map((order, index) => 
                      <CustomerOrder key={index} order={order}/>
                    )}
                </tbody>
            </table>
      </div>

    </div>
  )
}

export default CustomerOrders