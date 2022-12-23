import express from "express";
import { Contact } from "../db/Schema.js";

const router = express.Router();

// add contact
router.post("/create", async (req, res) => {
  let newContact = new Contact(req.body);
  console.log(newContact);
  try {
    let contactPost = await newContact.save();
    res.status(200).json(contactPost);
  } catch (error) {
    res.status(401).json(error);
  }
});

// update contacts
router.put("/update/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(401).json(error);
  }
});

// delete contact
router.delete("/delete/:id", async (req, res) => {
  try {
    const removeContact = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(removeContact);
  } catch (error) {
    res.status(401).json(error);
  }
});

// get all post
router.get("/", async (req, res) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json(error);
  }
});

export default router;
