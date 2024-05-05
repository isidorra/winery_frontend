import axios from "axios";
import { useEffect, useState } from "react";

const SalesProducts = () => {
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceInput, setPriceInput] = useState(10);

  //const [editForm, setEditFrom] = useState(false);
  const [zeroPriceError, setZeroPriceError] = useState(false);


  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5257/api/products");
      setProducts(response.data.map(product => ({
        ...product,
        isEditing: false // Add an isEditing property to track edit state
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

  const getPriceById = (pricingId) => {
    const price = prices.find(price => price.id === pricingId);
    return price ? price.price : ''; 
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
  
  
  useEffect(() => {
    getProducts();
    getPrices();
    getCategories();
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
                      <button onClick={() => approveProduct(product.id, getPriceById(product.pricingId))} className="bg-green-500 text-white-smoke p-2 rounded-md">Approve</button>}</td>
                </tr>
              ))}
          </tbody>
          
        </table>
      </div>

    </div>

    
  )
}

export default SalesProducts