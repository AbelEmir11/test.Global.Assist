const fs = require('fs');
const path = require('path');

const clientsFilePath = path.join(__dirname, '../data/datos.json');

function getClients() {
  const data = fs.readFileSync(clientsFilePath);
  return JSON.parse(data);
}

function saveClients(clients) {
  fs.writeFileSync(clientsFilePath, JSON.stringify(clients, null, 2));
}

module.exports = {
  getClients,
  saveClients
};