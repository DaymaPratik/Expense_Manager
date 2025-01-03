import { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";

function Register({toggleForm}) {
    const {user,setUser}=useContext(UserContext);
    const handleSubmit = (e) => {
      const { name, value } = e.target;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    };
  
      const registerUserFunction=async(e)=>{
        e.preventDefault();
       try {
        const res=await fetch("https://expense-manager-e0ha.onrender.com/api/user/register",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(user),
        })
        const data=await res.json();
        console.log(data);
        
       } catch (error) {
            console.log("Error whle register frontend",error);
       }
      }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
    <form onSubmit={registerUserFunction}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name || ""}
          onChange={handleSubmit}
          required
          className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email || ""}
          onChange={handleSubmit}
          required
          className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={user.phone || ""}
          onChange={handleSubmit}
          required
          className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter your phone number"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password || ""}
          onChange={handleSubmit}
          required
          className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Register
      </button>
    </form>
    <div className="mt-6 text-center">
          <button
            onClick={toggleForm}
            className="text-blue-500 hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
  </div>
  )
}

export default Register