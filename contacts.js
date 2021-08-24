const fs = require("fs");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const contacts = JSON.parse(data);
    const contactById = contacts.filter((contact) => contact.id == contactId);
    console.table(contactById);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const contacts = JSON.parse(data);
    const contactById = contacts.filter((contact) => contact.id == contactId);
    const appdateContacts = contacts.filter(
      (contact) => contact != contactById
    );

    fs.writeFile(contactsPath, JSON.stringify(appdateContacts), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`contact ${JSON.stringify(contactById)} was delete`);
      console.table(appdateContacts);
    });
  });
}

function addContact(name, email, phone) {
  const newContact = {
    id: uid(),
    name: name,
    email: email,
    phone: phone,
  };

  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const contacts = JSON.parse(data);
    const content = [...contacts, newContact];

    fs.writeFile(contactsPath, JSON.stringify(content), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.table(content);
      console.log(`file was appdate by ${JSON.stringify(newContact)}`);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
