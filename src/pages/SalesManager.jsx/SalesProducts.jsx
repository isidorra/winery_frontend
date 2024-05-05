import axios from "axios";
import { useEffect, useState } from "react";

const SalesProducts = () => {
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [priceInput, setPriceInput] = useState(10);
  const [discountInput, setDiscountInput] = useState(5);

  //const [editForm, setEditFrom] = useState(false);
  const [zeroPriceError, setZeroPriceError] = useState(false);


  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5257/api/products");
      setProducts(response.data.map(product => ({
        ...product,
        isEditing: false, // Add an isEditing property to track edit state
        isEditingDiscount: false
      })));
    } catch (error) {
      console.log(error);
    }
  }
  
  const getPrices = async() => {
    try {
      const response = await axios.get("http://localhost:5257/api/product/pricing");
      setPrices(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  const getCategories = async() => {
    try {
      const response = await axios.get("http://localhost:5257/api/product/category");
      setCategories(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  const getDiscounts = async() => {
    try {
      const response = await axios.get("http://localhost:5257/api/discounts");
      setDiscounts(response.data);
    } catch(error) {
      console.log(error);
    }
  }
  const getDiscountById = (discountId) => {
    const discount = discounts.find(discount => discount.id === discountId);
    return discount ? discount.percentage : '';
  }

  const getDiscountByPriceId = (pricingId) => {
    // Find the price corresponding to the pricing ID
    const price = prices.find((price) => price.id === pricingId);
    if (price) {
      // If the price is found, get the discount ID from the price
      const discountId = price.discountId;
      // Find the discount corresponding to the discount ID
      const discount = discounts.find((discount) => discount.id === discountId);
      if (discount) {
        // If the discount is found, return the discount percentage
        return discount.percentage;
      }
    }
    return '-'; // Return empty string if discount is not found
  };
  const getDiscountIdByPriceId = (pricingId) => {
    const price = prices.find((price) => price.id === pricingId);
    if (price) {
      const discountId = price.discountId;
      
      return discountId
    }
    return 0;
  }
  
  const getPriceById = (pricingId) => {
    const price = prices.find(price => price.id === pricingId);
    const discountPercentage = price ? getDiscountById(price.discountId) : 0;
    const discountedPrice = price ? price.price * (1 - discountPercentage / 100) : 0;
    return discountedPrice.toFixed(2); // Adjust the number of decimal places as needed
};

  const getCategoryById = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  }

  const approveProduct = async(id, price) => {
    if(price === 0){
      setZeroPriceError(true);
      return;
    }
    try {
      await axios.post("http://localhost:5257/api/products/approve?productId=" + id);
      getProducts();
    } catch(error) {
      console.log(error);
    }
  }

  const disapproveProduct = async(id) => {
    try {
      await axios.post("http://localhost:5257/api/products/disapprove?productId=" + id);
      getProducts();
    } catch(error) {
      console.log(error);
    }
  }

  const editPrice = async (event, priceInput, productId, pricingId, currentPrice) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    if (currentPrice == 0) {
      try {
        await axios.post("http://localhost:5257/api/product/pricing/create-price", { price: priceInput, productId });
        
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post("http://localhost:5257/api/product/pricing/update", { id:pricingId, price: priceInput });
        
      } catch (error) {
        console.log(error);
      }
    }
  }
  const editDiscount = async (event, discountInput, pricingId) => {
    event.preventDefault(); 
    
    try {
      await axios.post("http://localhost:5257/api/discounts/create", { percentage: discountInput, pricingId: pricingId });
      getDiscounts();
      getPrices();
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }
  const removeDiscount = async (event, id, pricingId) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5257/api/discounts/delete?id=" + id + "&pricingId=" + pricingId);
      getDiscounts();
      getPrices();
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }
  
  
  useEffect(() => {
    getProducts();
    getPrices();
    getCategories();
    getDiscounts();
  }, [])
  return (
    <div className="max-container">
      <div className="py-24 px-10">
        <h2 className="font-dorsa text-6xl text-primary mt-10">Products</h2>
        {zeroPriceError && <p className="block text-red-500">You can not approve the product without previously adding the price.</p>}
        <table className="table-auto w-full mt-5 mx-auto">
          <thead className="table-auto">
            <tr className="text-left">
              <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2 text-center">Photo</th>
              <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Name</th>
              <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Quantity</th>
              <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Category</th>
              <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2">Price</th>
              <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2 text-center">Approved</th>
              <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2 text-center">Discount</th>
              <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2"></th>
              <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2"></th>
              <th className="border border-neutral-300 bg-primary text-secondary font-normal p-2"></th>
            </tr>
          </thead>
          <tbody className="table-fixed">
            {products.map((product, index) => (
                <tr key={index}>
                  <td className="border border-neutral-300 p-2"><img src={"src/assets/products/" + product.photo} className="w-5 mx-auto" alt={product.name}/></td>
                  <td className="border border-neutral-300 p-2">{product.name}</td>
                  <td className="border border-neutral-300 p-2">{product.quantity}</td>
                  <td className="border border-neutral-300 p-2">{getCategoryById(product.productCategoryId)}</td>
                  <td className="border border-neutral-300 p-2">${getPriceById(product.pricingId)}</td>
                  <td className="border border-neutral-300 p-2">{product.isApproved ? <p className="text-green-500 font-semibold text-center">YES</p> : <p className="text-red-500 font-semibold text-center">NO</p>}</td>
                  <td className="border border-neutral-300 p-2 text-center">
                  {getDiscountByPriceId(product.pricingId) > 0 ? 
                    getDiscountByPriceId(product.pricingId) + "%" 
                    : 
                    "-"
                  }
                </td>

                  <td className="border border-neutral-300 p-2 text-center">
                  {product.isEditing ? (
                    <div className="flex items-center justify-center gap-2 mx-auto w-full">
                      <form onSubmit={() => editPrice(event, priceInput, product.id, product.pricingId, getPriceById(product.pricingId))} className="flex items-center gap-2">
                        <input value={priceInput} onChange={e => setPriceInput(e.target.value)} type="number" min={10} className="p-2 rounded-md w-20 border border-neutral-400 outline-none"/>
                        <button type="submit" className="p-2 bg-green-500 rounded-md text-white-smoke">Edit</button>
                      </form>
                      <button onClick={() => setProducts(prevProducts => prevProducts.map(p => p.id === product.id ? { ...p, isEditing: false } : p))} className="border border-neutral-400 rounded-md p-2">Cancel</button>
                    </div> 
                  ) : (
                    <button onClick={() => setProducts(prevProducts => prevProducts.map(p => p.id === product.id ? { ...p, isEditing: true } : p))} className="bg-white-smoke border border-neutral-400 p-2 rounded-md mx-auto">
                      Edit Price
                    </button>
                  )}
                    
                  </td>
                  <td className="border border-neutral-300 p-2 text-center">
                    {product.isApproved ? 
                      <button onClick={() => disapproveProduct(product.id)} className="bg-red-500 text-white-smoke p-2 rounded-md">Dissapprove</button> 
                      : 
                      <button onClick={() => approveProduct(product.id, getPriceById(product.pricingId))} className="bg-green-500 text-white-smoke p-2 rounded-md">Approve</button>}
                  </td>
                  <td className="border border-neutral-300 p-2 text-center">
                  {getDiscountByPriceId(product.pricingId) > 0 ? (
                    <button onClick={(event) => removeDiscount(event, getDiscountIdByPriceId(product.pricingId),product.pricingId)} className="bg-red-500 text-white-smoke p-2 rounded-md">Remove Discount</button>
                    
                  ) : (
                    product.isEditingDiscount ? ( // Check if editing discount
                      <div className="flex items-center justify-center gap-2 mx-auto w-full">
                        <form onSubmit={(event) => editDiscount(event, discountInput, product.pricingId)} className="flex items-center gap-2">
                          <input value={discountInput} onChange={e => setDiscountInput(e.target.value)} type="number" min={0} max={100} className="p-2 rounded-md w-20 border border-neutral-400 outline-none"/>
                          <button type="submit" className="p-2 bg-green-500 rounded-md text-white-smoke">Edit</button>
                        </form>
                        <button onClick={() => setProducts(prevProducts => prevProducts.map(p => p.id === product.id ? { ...p, isEditingDiscount: false } : p))} className="border border-neutral-400 rounded-md p-2">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setProducts(prevProducts => prevProducts.map(p => p.id === product.id ? { ...p, isEditingDiscount: true } : p))} className="bg-white-smoke border border-neutral-400 p-2 rounded-md mx-auto">
                        Edit Discount
                      </button>
                    )
                  )}
                </td>

                </tr>
              ))}
          </tbody>
          
        </table>
      </div>

    </div>

    
  )
}

export default SalesProducts