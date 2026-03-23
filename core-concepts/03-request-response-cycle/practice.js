const express = require("express");

const app = express();

//use to parse the incoming json data (body)\
app.use(express.json());

//creating a get api

app.get("/search", (req, res) => {
  // Extract data from the request object
  const query = req.query.q;
  const name = req.query.name;
  const email = req.query.email;
  const browserAgent = req.headers;

  res.status(200).json({
    success: "true",
    query,
    name,
    email,
    browserAgent,
  });
});

// use req,params in get
app.get("/user/:id", (req, res) => {
  const id = req.params.id;

   if (id === '999') {
        res.status(200).json({ user: 'Ravin', role: 'Admin' });
    } else {
        res.status(404).json({ error: 'User not found in our database.' });
    }
});

//creating a post api
app.post("/create", (req, res) => {
  const body = req.body;

  res.status(201).json(body);
});

//calling server at 4000 port
app.listen(4000, () => {
  console.log("listening at port 4000");
});
