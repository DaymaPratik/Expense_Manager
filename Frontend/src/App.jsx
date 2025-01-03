import { Route,BrowserRouter, Routes } from "react-router-dom";
import Auth from "./Pages/Auth";
import ExpenseManager from "./Pages/ExpenseManager";
import Navbar from "./Components/Navbar";
import UserContextProvider from "./Context/UserContextProvider";
function App() {

  return (
    <>
    <BrowserRouter>
    <UserContextProvider>
    <Navbar/>
     <Routes>
      <Route element={<Auth/>} path="/"/>
      <Route element={<ExpenseManager/>} path="/manager"/>
     </Routes>
    </UserContextProvider>
    </BrowserRouter>
    </>
  )
}

export default App
