import axios from "axios";

export default axios.create({
  baseURL: "https://staging-blockchain-payment.livaat.com/api",
});
