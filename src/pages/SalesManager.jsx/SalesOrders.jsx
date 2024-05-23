import axios from "axios";
import { useEffect, useState } from "react"
import SalesOrder from "../../components/SalesOrder";

const SalesOrders = () => {
    const [orders, setOrders] = useState();

    const getOrders = async() => {
        try {
            const response = await axios.get("http://localhost:5257/api/purchase");
            setOrders(response.data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrders();
    }, [])
  return (
    <div className="max-container">
        <div className="py-16 px-10">
            <h2 className="font-dorsa text-6xl text-primary mt-10">
                Orders
            </h2>

            <table className="table-auto w-full mt-10 mx-auto">
                <thead className="table-auto">
                    <tr className="text-left">
                        <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Order ID</th>
                        <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Customer</th>
                        <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Total</th>
                        <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Created At</th>
                        <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Status</th>
                        <td className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Invoice</td>
                    </tr>
                </thead>

                <tbody className="table-fixed">
                    {orders && orders.map((order, index) => 
                        <SalesOrder key={index} order={order}/>
                    )}
                </tbody>
            </table>


        </div>

    </div>
  )
}

export default SalesOrders