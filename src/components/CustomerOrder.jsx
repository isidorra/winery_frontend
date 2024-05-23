import axios from "axios";
import { orderStatusMapping } from "../helpers/orderStatusMapping"
import { useState } from "react";
const CustomerOrder = ({order}) => {
    const [review, setReview] = useState(1);

    const cancelOrder = async() => {
        try {
            const response = await axios.post("http://localhost:5257/api/purchase/cancel?purchaseId=" + order.id);
            console.log(response.data);
        } catch(error) {
            console.log(error);
        }
    }
    const generatePdfInvoice = async() => {
        try {
            const response = await axios.get("http://localhost:5257/api/purchase/invoice-pdf?purchaseId=" + order.id);
            console.log(response.data);
        } catch(error) {
            console.log(error);
        }
    }
    const createReview = async(ev) => {
        ev.preventDefault();
        try {
            const response = await axios.post("http://localhost:5257/api/purchase-review", {
                purchaseId: order.id,
                review: review
            });
            console.log(response.data);
        } catch(error) {
            console.log(error);
        }
    }
    
  return (
    <tr>
        <td className="border text-white-smoke border-neutral-300 p-2">{order.id}</td>
        <td className="border text-white-smoke border-neutral-300 p-2">${order.total.toFixed(2)}</td>
        <td className="border text-white-smoke border-neutral-300 p-2">
            {new Date(order.createdAt).toLocaleDateString('en-US', 
                                {year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                                })}
        </td>
        {order.purchaseStatus == 4 ? 
            <td className="border border-neutral-300 p-2 uppercase text-red-500">
                {orderStatusMapping[order.purchaseStatus]}
            </td>
            :
            <td className="border border-neutral-300 p-2 uppercase text-green-500">
                {orderStatusMapping[order.purchaseStatus]}
            </td>
        }
        
        <td className="border border-neutral-300 p-2 text-center justify-center">
            {(order.purchaseStatus == 0 || order.purchaseStatus == 1) ? 
                    <button onClick={cancelOrder} 
                            className="bg-red-500 rounded-md py-2 px-4 text-white-smoke mx-auto">
                        Cancel Order
                    </button>
                    
                :
                (order.purchaseStatus == 0) ? 
                <button onClick={generatePdfInvoice}
                        className="bg-white-smoke rounded-md py-2 px-4 border-[0.5px] border-primary mx-auto">
                    Download Invoice
                </button>
                :
                (order.purchaseStatus == 3) ? 
                    <form onSubmit={createReview} className="flex items-center gap-3 mx-auto justify-center">
                        <p className="text-white-smoke text-lg">Selected: {review}</p>
                        <input value={review} 
                                onChange={ev => setReview(ev.target.value)} 
                                type="range" min={1} max={5} step={0.1}/>
                        <button className="bg-green-500 rounded-md py-2 px-4 uppercase text-white-smoke">
                            Review
                        </button>
                    </form>
                :
                (order.purchaseStatus == 4) ? 
                    <p className="uppercase text-red-500">Canceled</p>
                :
                    <p className="text-green-500 uppercase">Reviewed</p>
                
            }
        </td>
    </tr>
  )
}

export default CustomerOrder