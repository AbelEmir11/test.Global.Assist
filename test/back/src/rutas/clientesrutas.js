const express = require('express');
const clientController = require('../controladores/clientecontrol');
const router = express.Router();

router.get('/clients', clientController.getAllClients);
router.get('/clients/:id', clientController.getClientById);
router.post('/clients', clientController.createClient);
router.put('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);

router.get('/datos', (req, res) => {
    const data = require('../data/datos.json');
    res.json(data);
});

module.exports = router;