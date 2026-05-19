import express from "express";
import redis from "./redis/redisClient.js";

const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 3000;
app.use(express.json());

// Get endpoint just to check if the server is running
app.get("/", (req, res) => {
    res.json({ message: "Redis Practice" });
});


app.get("/redis-health", async (req, res) => {
    try {
        await redis.ping();
        res.json({ message: "Redis is running" });
    } catch (error) {
        res.status(500).json({ message: "Redis is not running" });
    }
});

// setting key in redis
app.post("/set-key", async (req, res) => {
    const { key, value } = req.body;
    await redis.set(key, value);
    res.json({ message: `Key ${key} set successfully` });
});


// Getting a key from redis
app.get("/get-key/:key", async (req, res) => {
    const { key } = req.params;
    const value = await redis.get(key);
    res.json({ message: `Key ${key} get successfully`, value });
});

// Starting the server
app.listen(BACKEND_PORT, () => {
    console.log(`Server is running on port ${BACKEND_PORT}`);
});
