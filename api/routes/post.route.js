import express from "express"

const router = express.Router();

router.get("/test", (req,res) => {
    console.log("Get router")
    res.send("HEYYYYYYYYY");
});

export default router;