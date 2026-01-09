import axios from "axios";

export const scanQr = (token) => {
  return axios.post(
    "http://localhost:5000/api/qr/scan",
    { token },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
