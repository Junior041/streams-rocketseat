import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  if (req.headers["content-type"].includes("multipart/form-data")) {
    console.log(1);
  } else {
    await json(req, res);
  }

  const route = routes.find((route) => {
    return route.method === method && route.patch.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.patch);
    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};
    return route.handler(req, res);
  }

  return res.writeHead(404);
});
server.listen(3333);
