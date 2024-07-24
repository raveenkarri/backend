const express = require("express");
const router = express.Router();

const {
  updateContact,
  getContacts,
  deleteContact,
  createContact,
  getContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

router.route("/").get(getContacts).post(createContact);

module.exports = router;
