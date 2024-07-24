const ayncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//get contacts
// route -GET /api/contacts
//public
const getContacts = ayncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});
//get contact
// route -[GET] /api/contacts/:id
//public
const getContact = ayncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//create contact
// route -[POST] /api/contacts
//public
const createContact = ayncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(200).json(contact);
});

//delete contact
// route -[DELETE] /api/contacts/:id
//public
const deleteContact = ayncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("u cant delete  this contact");
  }
  const deletedcontact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedcontact);
});

//update contacts
// route -[PUT] /api/contacts/:id
//public
const updateContact = ayncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("u cant update  this contact");
  }
  const updatedcontact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedcontact);
});

module.exports = {
  updateContact,
  getContacts,
  deleteContact,
  createContact,
  getContact,
};
