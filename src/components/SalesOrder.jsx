import React from 'react'
import {orderStatusMapping} from "../helpers/orderStatusMapping";
import axios from 'axios';
const SalesOrder = ({order}) => {
    const generatePdfInvoice = async() => {
        try {
            const response = await axios.get("http://localhost:5257/api/purchase/invoice-pdf?purchaseId=" + order.id);
            console.log(response.data);
        } catch(error) {
            console.log(error);
        }
    }
  return (
    <tr>
        <td className="border border-neutral-300 p-2">{order.id}</td>
        <td className="border border-neutral-300 p-2">{order.customerId}</td>
        <td className="border border-neutral-300 p-2">${order.total.toFixed(2)}</td>
        <td className="border border-neutral-300 p-2">
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
            <button onClick={generatePdfInvoice} className="bg-white-smoke rounded-md py-2 px-4 border-[0.5px] border-primary mx-auto">
                Download PDF
            </button>
        </td>
    </tr>
  )
}

export default SalesOrder