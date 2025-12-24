const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/about", (req, res) => {
    console.log(req?.body)
  res.send({ data: req?.body });
});
// app.get('/user', (req, res) => {
//     res.sendFile('..')
// })

app.listen(9000, () => {
  console.log("listen to me");
});
