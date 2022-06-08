const routes = require('express').Router();
const req = require('express/lib/request');
const multer = require('multer');

const multerConfig = require('./config/multer')


const Imagens = require('./models/Imagens');

routes.get('/imagens', async (req, res) => {
    const imagens = await Imagens.find();
    return res.json(imagens);

});

routes.get('/imagens/:id', async (req, res) => {
    const imagens = await Imagens.findById(req.params.id);
    return res.send();
})


routes.post('/imagens', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, key, location: url = "" } = req.file;

    const imagens = await Imagens.create({
        name,
        size,
        key,
        url

    });

    return res.json(imagens)

})

routes.delete('/imagens/:id', async (req, res) => {
    const imagens = await Imagens.findById(req.params.id);
    await imagens.remove();
    return res.send();
})

module.exports = routes;