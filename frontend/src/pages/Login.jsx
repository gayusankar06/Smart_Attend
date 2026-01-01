import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    if (res.data.role === "STUDENT") navigate("/student");
    if (res.data.role === "FACULTY") navigate("/faculty");
    if (res.data.role === "HOD") navigate("/hod");
    if (res.data.role === "PRINCIPAL") navigate("/principal");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Securix Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={login}>Login</button>
    </div>
  );
}
