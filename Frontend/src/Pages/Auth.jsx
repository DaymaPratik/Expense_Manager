import { useState } from "react"
import Login from "../Components/Login"
import Register from "../Components/Register"
function Auth() {


 const [isLogin,setIsLogin]=useState(true);
 const toggleForm=()=>{
    setIsLogin(!isLogin);
 }
  return (
    <div
      className="h-fit min-h-[90vh] py-[50px] flex items-center justify-center 
    bg-cover bg-center bg-no-repeat"
    >
      {isLogin ? (
        <Login
          toggleForm={toggleForm}
        />
      ) : (
        <Register
          toggleForm={toggleForm}
        />
      )}
    </div>
  )
}

export default Auth