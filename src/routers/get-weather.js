import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const { search } = req.query;
  try {
    const api = {
      key: "d91e5af2517572deed4392e96dd7c09a",
      base: "https://api.openweathermap.org/data/2.5/"
    }
    const response = await axios.get(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "error making request",
    });
  }
});

export default router;
