// Express middleware and polling timer

function middleware(req, res, next) {
  console.log("middleware", req);
  // fire verify
  // emitter.rehashing(req.baseUrl);
  next();
}

function poll(queries, emitter) {
  // TODO: Implement timer
}

module.exports = {
  middleware,
  poll
};
