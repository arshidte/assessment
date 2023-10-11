import Header from "./Components/Header";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
