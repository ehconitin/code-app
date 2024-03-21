const express = require("express");
const router = require("./routes/route");
const app = express();
const cors = require("cors");
const routerV2 = require("./routes/route_v2");
app.use(express.json());
app.use(cors());
app.use("/api/v1/", router);
app.use("/api/v2/", routerV2);

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});
