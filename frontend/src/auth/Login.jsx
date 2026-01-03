import { useState, useContext } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      login(res.data);

      const role = res.data.user.role;
      navigate(`/${role.toLowerCase()}`);
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Smart Attend Login</h2>
        <input className="input" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />
        <input className="input mt-2" type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <button className="btn w-full mt-4" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
