import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.css";
import { useCounterStore } from "./store";

const App = () => {
  // const [count, setCount] = useState(0);

  const count = useCounterStore((store) => store.count); //? ✅

  // const {count} = useCounterStore() //? ❌

  //* Instead of destructure elements like this 👆 , u should be very specific like line no.9 , because App component going to re-render if any of the variables in the store changes , in this example we have only count variable, but if lots were present , if any one of them chenges , the App Component will re-render. So You Should be specific like [useCounterStore((store) => store.count)] , so App component will render only when count variable will change

  // useEffect(() => {
  //   const countGet = localStorage.getItem("countValue");
  //   console.log(countGet);

  //   if (countGet) {
  //     setCount(Number(countGet));

  //   }else{

  //     localStorage.setItem("countValue", count.toString());

  //   }

  //   return () => { //? cleanup function is important
  //     localStorage.removeItem("countValue")
  //   }

  // }, [count]);

  return <OtherComponent count={count} />;
};

const OtherComponent = ({ count }: { count: number }) => {
  const increment = useCounterStore((store) => store.increment);
  const decrement = useCounterStore((store) => store.decrement);
  const incrementAsync = useCounterStore((store) => store.incrementAsync);

  return (
    <div
      style={{
        fontSize: "20px",
      }}
    >
      <h2>{count}</h2>
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "10px",
        }}
      >
        <p>
          Access count state directly from store 👇
          <br />
          <h3>{useCounterStore.getState().count}</h3>
        </p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={incrementAsync}>Increment After 2 second</button>
        <button onClick={() => useCounterStore.setState({ count: 1 })}>
          Directly set count variable of store to 1{" "}
        </button>
      </div>
    </div>
  );
};

export default App;

//* setCount: Dispatch<SetStateAction<number>>;
//* useCounterStore.getState().count -->>  Access the count variable directly from store
