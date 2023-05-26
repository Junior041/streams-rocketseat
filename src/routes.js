import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import importCsv from "./importacao/csv.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    patch: buildRoutePath("/task"),
    handler: async (req, res) => {
      const users = database.select("task");
      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    patch: buildRoutePath("/task"),
    handler: async (req, res) => {
      const completed_at = null;
      const updated_at = null;
      const created_at = new Date();
      const { title, description } = req.body;
      const users = { id: randomUUID(), title, description, completed_at, created_at, updated_at };
      database.insert("task", users);
      return res.writeHead(201).end(JSON.stringify(users));
    },
  },
  {
    method: "PUT",
    patch: buildRoutePath("/task/:id"),
    handler: async (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      const updated_at = new Date();

      database.update("task", id, {
        title,
        description,
        updated_at,
      });
      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    patch: buildRoutePath("/task/:id"),
    handler: async (req, res) => {
      const { id } = req.params;
      database.delete("task", id);
      return res.writeHead(204).end();
    },
  },
  {
    method: "POST",
    patch: buildRoutePath("/import"),
    handler: async (req, res) => {
      return res.end();
    },
  },
];
