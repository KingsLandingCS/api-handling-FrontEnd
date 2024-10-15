import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ; (async () => {
      try {
        setLoading(true)
        setError(false)
        const response = await axios.get("/api/products")
        console.log(response.data);
        setProducts(response.data);
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    })()
  }, [])

  // loading
  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  // error
  if (error) {
    return (
      <h1>There is an error please try again later.</h1>
    )
  }



  return (
    <>
      <h1>Hello World!</h1>
      <h2>Number of Products are: {products.length}</h2>
    </>
  )
}

export default App