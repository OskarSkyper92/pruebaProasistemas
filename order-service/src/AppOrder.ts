import express from "express";
import * as os from "os";
import orderRoutes from "./routes/order.routes";
import "./queue/order.worker"; // inicializa el worker

const app = express();

const port = 5000;
const Ip_: any = os.networkInterfaces();
let _ipactual: string = "";

app.use(express.json());

app.use("/", orderRoutes);

app.listen(port, () => {
  //_ipactual = Ip_["Wi-Fi"][1].address;
  _ipactual = "0.0.0.0";
  console.log(`order-service en ejecucion por http://${_ipactual}:${port}`);
});
