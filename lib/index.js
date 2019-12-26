const Engine = require("./engine");
const helper = require("./helper");
const { middleware, poll } = require("./observer");

let engine;

function _createEngineInstance(schema) {
  if (!engine) engine = new Engine();
}

function observe(app, schema) {
  // Create requests emitters
  _createEngineInstance(schema);

  if (!helper.isPolling(schema)) {
    // Use non-polling

    // Add middleware to routes
    const mutators = helper.getMutators(schema);
    app.use(mutators, middleware);
    console.log(mutators);

    // Create routers for queries and mutators
    helper.createRoutes(schema, app);

    // For test
    const query = {
      path: "/user",
      params: { name: "demo", lastName: "demo-l" },
      headers: {}
    };
    engine.subscribe(query, null);
  } else {
    poll(queries, engine);
  }
}

module.exports = {
  observe
};
