import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Loggin in");

    const userCredential = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };

    axiosInstance.post("/login", userCredential).then((resp) => {
      const data = resp.data;

      console.log("Response from login ", data);
      localStorage.setItem("token", data.token);
      navigate("/");
    });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div>
          <h4>Email</h4>
          <input placeholder="Enter email" />
        </div>
        <div>
          <h4>Password</h4>
          <input placeholder="Enter Password" />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
