const md5 = require("md5");

/**
 * TYPE - Request (Query)
 * @typedef {Object} Query
 * @property {string} path
 * @property {Object} params
 * @property {Object} headers
 */

class Engine {
  constructor(schema) {
    this.requests = Object.create(null);
    this.schema = schema;
  }

  _equals(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  _emit(query) {
    console.log("emit", query);
    return this;
  }

  _createHash(response) {
    // re-fetch query and create hash
    md5(JSON.stringify(response));
  }

  subscribe(query, client) {
    if (!this.requests[query.path]) {
      this.requests[query.path] = [{ req: query, subscribers: [], hash: null }];
    }
    let subscribers = this.requests[query.path].find(q =>
      this._equals(q.req, query)
    );
    //subscribers.push(client);
    console.log("requests", this.requests);
    return this;
  }

  rehashing(path) {
    console.log("rehashing", path);
    // Get array of queries of path
    this.requests[path].forEach(query => {
      console.log(`verifying ${query}`);
      const newHash = this._createHash(query);
      if (newHash !== query.hash) {
        query.hash = newHash;
        this._emit(query);
      }
    });
  }
}

module.exports = Engine;
