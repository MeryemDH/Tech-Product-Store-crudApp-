import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    < >
      <Navbar/>
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/create" element={<CreatePage/>} />
      </Routes>
    </>

  );
}

export default App;
