
// import fs from 'node:fs/promises'
// import path from 'node:path';
const fs = require("node:fs/promises");
const path = require("node:path");
var { nanoid } = require("nanoid");

const { write, writeFile } = require("node:fs");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// TODO: задокументувати кожну функцію
 async function listContacts() {
    const allContacts = await fs.readFile(contactsPath);
	return JSON.parse(allContacts);
}

  async function getContactById(contactId) {
    const contacts = await listContacts();
	const getContact = contacts.find(
		(contact) => contact.id == contactId
	);
	return getContact || null;
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(
		(contact) => contact.id === contactId
	);
	if (index === -1) return null;

	const [result] = contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return result;
  }
  
  async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
};