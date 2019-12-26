const util = require("./util");

/**
 *      Helpers
 */

function isValidSchema(schema) {
  // TODO: check schema structure
}

function isPolling(schema) {
  return !!Object.values(schema).find(sch => util.isEmpty(sch.mutators));
}

function getMutators(schema) {
  const appMutators = [];
  util.getKey(schema).forEach(skey => {
    let mutators = schema[skey].mutators;
    util.getKey(mutators).forEach(mkey => appMutators.push(`/${skey}${mkey}`));
  });
  return appMutators;
}

function getQueries(schema) {
  const appQueries = [];
  util.getKey(schema).forEach(skey => {
    let queries = schema[skey].queries;
    util.getKey(queries).forEach(qkey => appQueries.push(`/${skey}${qkey}`));
  });
  return appQueries;
}

function getAppRoutes(schema) {
  return util.arrayUnique([...getMutators(schema), ...getQueries(schema)]);
}

function getRequestHandler(schema, path, method) {
  const methods = util.methods;
  // const queries = getQueries(schema);
  switch (method) {
    case methods.QUERY:
      break;
    case methods.CREATE:
      break;
    case methods.UPDATE:
      break;
    case methods.DELETE:
      break;
    default:
      break;
  }
}

function requestDriven(schema) {
  return (req, res) => {
    const { params, query, body } = req;
    const handler = getRequestHandler(schema, req.baseUrl, req.method);
    res.json(handler({ params, query, body }));
  };
}

function createRoutes(schema, app) {
  util.getKey(schema).forEach(skey => {
    app.all(getAppRoutes(schema), requestDriven(schema));
    console.log(getAppRoutes(schema));
  });
}

module.exports = {
  isValidSchema,
  isPolling,
  getMutators,
  createRoutes
};
