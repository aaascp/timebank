const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const auth = require("../../middlewares/requireLogin");

const Service = mongoose.model("service");

//Index
router.get("/", async (req, res) => {
  const services = await Service.find({});

  res.send(services);
});

//Show
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findOne({ _id: req.params.id });
    if (service) {
      return res.send(service);
    } else {
      return res.redirect(req.baseUrl + "/");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

//Create
router.post("/", async (req, res) => {
  const { category, description, neighborhood } = req.body;
  const userName = req.user.name || "Test Andre";

  const service = new Service({
    userName,
    category,
    description,
    neighborhood
  });

  try {
    const savedService = await service.save();
    return res.redirect(`service/${savedService._id}`);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//Update
router.put("/:id", async (req, res) => {
  const { category, description, neighborhood } = req.body;
  const query = { _id: req.params.id };
  const newData = {};
  if (category) newData.category = category;
  if (description) newData.description = description;
  if (neighborhood) newData.neighborhood = neighborhood;

  try {
    const service = Service.find({ _id: req.params.id });
    if (service && service.userName == req.user.name) {
      const updatedService = await Service.findOneAndUpdate(query, newData, {
        upsert: true
      });
      return res.redirect(`service/${updatedService._id}`);
    } else {
      return res.status(401).send({
        error: "Can't delete service from another user."
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    const service = Service.find({ _id: req.params.id });
    if (service && service.userName == req.user.name) {
      await Service.findByIdAndRemove(req.params.id);
      return res.redirect("service/");
    } else {
      return res.status(401).send({
        error: "Can't delete service from another user."
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
