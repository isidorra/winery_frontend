import axios from "axios";
import { orderStatusMapping } from "../helpers/orderStatusMapping"
const CustomerOrder = ({order}) => {

    const cancelOrder = async() => {
        try {
            const response = await axios.post("http://localhost:5257/api/purchase/cancel?purchaseId=" + order.id);
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
        
        <td className="border border-neutral-300 p-2 text-center">
            {(order.purchaseStatus == 0 || order.purchaseStatus == 1) ? 
                    <button onClick={cancelOrder} 
                            className="bg-red-500 rounded-md py-2 px-4 text-white-smoke mx-auto">
                        Cancel Order
                    </button>
                :
                (order.purchaseStatus == 3) ? 
                    <button>Review</button>
                :
                (order.purchaseStatus == 4) ? 
                    <p className="uppercase text-red-500">Canceled</p>
                :
                (order.purchaseStatus == 5) ?
                    <p>Reviewed</p>
                :
                    <p></p>
            }
        </td>
    </tr>
  )
}

export default CustomerOrder