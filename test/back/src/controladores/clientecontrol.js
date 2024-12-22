const clientModel = require('../modelos/clientemodelo');

function getAllClients(req, res) {
  const clients = clientModel.getClients();
  res.json(clients);
}

function getClientById(req, res) {
  const clients = clientModel.getClients();
  const client = clients.find(c => c.id === parseInt(req.params.id));
  if (client) {
    res.json(client);
  } else {
    res.status(404).send('Cliente no encontrado');
  }
}

function createClient(req, res) {
  const clients = clientModel.getClients();
  const newClient = req.body;
  newClient.id = clients.length ? clients[clients.length - 1].id + 1 : 1;
  clients.push(newClient);
  clientModel.saveClients(clients);
  res.status(201).json(newClient);
}

function updateClient(req, res) {
  const clients = clientModel.getClients();
  const index = clients.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    clients[index] = { ...clients[index], ...req.body };
    clientModel.saveClients(clients);
    res.json(clients[index]);
  } else {
    res.status(404).send('Cliente no encontrado');
  }
}

function deleteClient(req, res) {
  let clients = clientModel.getClients();
  const index = clients.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    clients = clients.filter(c => c.id !== parseInt(req.params.id));
    clientModel.saveClients(clients);
    res.status(204).send();
  } else {
    res.status(404).send('Cliente no encontrado');
  }
}

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};