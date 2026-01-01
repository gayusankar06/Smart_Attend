import api from "../api/api";
import { useState } from "react";


export default function FacultyDashboard() {
const [qr, setQr] = useState(null);
const generate = async () => {
const res = await api.post("/qr/generate");
setQr(res.data.qrImage);
};
return (
<div>
<button onClick={generate}>Generate QR</button>
{qr && <img src={qr} />}
</div>
);
}