const express = require("express");
const app = express();
const lib = require("./lib");

// Init observer

const sampleQuery = request => {
  // here return data to client
  return request.baseUrl;
};

const sampleMutator = request => {
  // here insert data to database
  return request.baseUrl;
};

const schema = {
  // name of method is for subscribe on client -> lib.subscribe('method_name', query, callback);
  user: {
    queries: {
      "/": sampleQuery,
      "/admins": sampleQuery
    },
    mutators: {
      // if is emty use polling method
      "/": { method: "post", handler: sampleMutator },
      "/admin": { method: "put", handler: sampleMutator }
    }
  }
};

lib.observe(app, schema);

app.listen(3000);
