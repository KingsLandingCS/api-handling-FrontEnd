import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  // const [products, error, loading] = customReactQuery('/api/products');


  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("underwood");

  useEffect(() => {
    const controller = new AbortController()
      ; (async () => {
        try {
          setLoading(true)
          setError(false)
          const response = await axios.get("/api/products? search =" + search, {
            signal: controller.signal
          });
          console.log(response.data);
          setProducts(response.data);
          setLoading(false)
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
            return;
          }
          setError(true)
          setLoading(false)
        }
      })()

    //cleanup
    return () => {
      controller.abort();
    }
  }, [search])

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
      <input type="text" placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}

      />

      {loading && (<h1>Loading...</h1>)}
      {error && (<h1>There is an error please try again later.</h1>)}
      <h2>Number of Products are: {products.length}</h2>
    </>
  )
}

export default App;


