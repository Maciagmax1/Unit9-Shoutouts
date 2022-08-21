import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import Shoutout from "../models/ShoutOut";
import ShoutOut from "../models/ShoutOut";

const shoutoutRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

shoutoutRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<ShoutOut>("shoutouts").find();
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

shoutoutRouter.post("/", async (req, res) => {
  try {
    const client = await getClient();
    const newShoutout: ShoutOut = req.body;
    await client.db().collection<ShoutOut>("shoutouts").insertOne(newShoutout);
    res.status(200);
    res.json(newShoutout);
  } catch (error) {
    errorResponse(error, res);
  }
});

shoutoutRouter.get("/user/:name", async (req, res) => {
  try {
    const name: string = req.params.name;
    const client = await getClient();
    const query: any = { $or: [{ to: name }, { from: name }] };
    const cursor = client.db().collection<Shoutout>("shoutouts").find(query);
    const results = await cursor.toArray();
    res.status(200);
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

shoutoutRouter.delete("/user/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<ShoutOut>("shoutouts")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404);
      res.send("ID Not Found");
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default shoutoutRouter;
