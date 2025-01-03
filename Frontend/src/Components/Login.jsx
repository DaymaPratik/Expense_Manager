import { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";
import { useNavigate } from "react-router-dom";

function Login({ toggleForm }) {
  const { user = {}, setUser } = useContext(UserContext); // Default value for user
   const navigate=useNavigate();
  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const loginUserFunction = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://expense-manager-e0ha.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const data = await res.json();
      setUser(data.user || {});
     if(data.status){
      navigate("/manager")
     }
      console.log(data);
    } catch (error) {
      console.log("Error while logging in", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={loginUserFunction}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
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
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={toggleForm}
          className="text-blue-500 hover:underline"
        >
          Dont have an account? Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
