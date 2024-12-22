const clientModel = require('../modelos/clientemodelo');

async function getAllClients(req, res) {
  try {
    const clients = await clientModel.getClients();
    res.json(clients);
  } catch (error) {
    res.status(500).send('Error al obtener los clientes');
  }
}

async function getClientById(req, res) {
  try {
    const clients = await clientModel.getClients();
    const client = clients.find(c => c.id === parseInt(req.params.id));
    if (client) {
      res.json(client);
    } else {
      res.status(404).send('Cliente no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al obtener el cliente');
  }
}

async function createClient(req, res) {
  try {
    const clients = await clientModel.getClients();
    const newClient = req.body;
    // Validar datos de entrada
    if (!newClient.name || !newClient.email) {
      return res.status(400).send('Datos de cliente inválidos');
    }
    newClient.id = clients.length ? clients[clients.length - 1].id + 1 : 1;
    clients.push(newClient);
    await clientModel.saveClients(clients);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).send('Error al crear el cliente');
  }
}

async function updateClient(req, res) {
  try {
    const clients = await clientModel.getClients();
    const index = clients.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
      clients[index] = { ...clients[index], ...req.body };
      await clientModel.saveClients(clients);
      res.json(clients[index]);
    } else {
      res.status(404).send('Cliente no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al actualizar el cliente');
  }
}

async function deleteClient(req, res) {
  try {
    let clients = await clientModel.getClients();
    const index = clients.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
      clients = clients.filter(c => c.id !== parseInt(req.params.id));
      await clientModel.saveClients(clients);
      res.status(204).send();
    } else {
      res.status(404).send('Cliente no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al eliminar el cliente');
  }
}

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};