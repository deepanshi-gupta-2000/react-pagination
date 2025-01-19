import { useEffect, useState } from 'react';
import './App.css';
import Cards from './components/Cards';

function App() {
  const limit = 6;
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  
  // console.log(page);

  let fetchData = async () => {
    const skip = (page - 1) * limit;
    let url = `https://dummyjson.com/products/?limit=${limit}&skip=${skip}`;
    let res = await fetch(url);
    let parsedData = await res.json();

    console.log(parsedData);
    if (parsedData && parsedData.products) {
      setData(parsedData)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  let range = [];
  if (data) {
    range = Math.ceil(data.total / limit);
    // c pages = 
  }

  const handleNextClick = async () => {
    console.log('nex clicked');
    if (page < range) {
      setPage(page + 1);
      const skip = (page) * limit;
      let url = `https://dummyjson.com/products/?limit=${limit}&skip=${skip}`;
      let res = await fetch(url);
      let parsedData = await res.json();

      console.log(parsedData);
      if (parsedData && parsedData.products) {
        setData(parsedData)
      }


    }
  };

  const handlePrevClick = async () => {
    console.log('prev clicked');
    if (page > 1) {
      setPage(page - 1);
      const skip = (page -2) * limit;
      let url = `https://dummyjson.com/products/?limit=${limit}&skip=${skip}`;
      let res = await fetch(url);
      let parsedData = await res.json();

      console.log(parsedData);
      if (parsedData && parsedData.products) {
        setData(parsedData)
      }


    }
  }

  const handleOnPageClick = async (pageNo) => {
    console.log(pageNo);
    
      setPage(pageNo);
      const skip = (pageNo - 1) * limit;
      let url = `https://dummyjson.com/products/?limit=${limit}&skip=${skip}`;
      let res = await fetch(url);
      let parsedData = await res.json();

      console.log(parsedData);
      if (parsedData && parsedData.products) {
        setData(parsedData)
      


    }
  }

  return (
    <>
      {data && (
        <div className='app'>
          <h2 style={{textAlign: 'center'}}>DummY Store</h2>
          <div className='products'>{
            data.products.map((product) => { return <Cards key={product.id} product={product} /> })
          }</div>
          <div className='footer'>
            <span className='cell' onClick={handlePrevClick} aria-disabled={page === 1}>⏮</span>
            {
              [...new Array(range)].map((_, index) => {
                return <span className='cell' key={index} onClick={() => {handleOnPageClick(index + 1)}}>{index + 1}</span>
              })
            }
            <span className='cell' onClick={handleNextClick} aria-disabled={page === range}>⏭</span>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
