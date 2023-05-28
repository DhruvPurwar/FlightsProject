const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();

// Before using API routes, we need to setup few middlewares
//  In incoming requests, if we have a req body, pls read it like a json. Earlier, we used 'body-parser' for the same. But now express has it inbuilt.
app.use(express.json());
//  Sometimes, In URL, there a few terms like %20 , etc. SO to understand them, we use below middleware.
// The extend option is helpful in choosing the parsing library. We can keep it either true/false.
// Querystring libraay cant parse nested objects whereas qs library can.
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(ServerConfig);
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
