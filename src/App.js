import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);

  // const debouncing = (cb, delay) => {
  // 	let timer;
  // 	return (...args) => {
  // 		console.log('herer')
  // 		if (timer) {
  // 			clearTimeout(timer);
  // 		}
  // 		timer = setTimeout(() => {
  // 			cb(...args);
  // 		}, delay);
  // 	}
  // };

  const getData = async (search = null) => {
    try {
      let res = {};
      if (search) {
        res = await axios(
          `https://jsonplaceholder.typicode.com/todos?q=${search}`
        );
      } else {
        res = await axios("https://jsonplaceholder.typicode.com/todos");
      }
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log("Error:-" + error);
    }
  };

  let timer;
  const handleSearch = (value) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        getData(value);
      }, 2000);
}

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <input type="text" className="inputBar" onChange={e=>handleSearch(e.target.value)} />
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};

export default App;
