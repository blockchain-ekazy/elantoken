import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Home />
      <ToastContainer autoClose={1000} hideProgressBar theme="colored" />
    </>
  );
}

export default App;
