const Cliente = require('../model/Cliente_Model')
const database = require('../config/db')


module.exports = {
    async findAll(req, res) {
        try {
            const cliente = await Cliente.findAll()
            res.json(cliente)
        } catch (error) {
            res.json(error)
        }

    },
    async findOne(req, res) {
        try {
            const { id } = req.params
            console.log(id)
            const cliente = await Cliente.findByPk(id)
            if (cliente) {
                res.json(cliente)
            } else {
                res.json({ messagem: "cliente não encontrado!" })
            }
        } catch (error) {
            res.json(error)
        }


    },
    async create(req, res) {
        try {
            const sqlscript = await database.sync();
            if (sqlscript) {
                console.log("DataBase Criado!")
            }
            const obj = req.body
            const cliente = await Cliente.create(obj)
            if (cliente) {
                res.json({ messagem: 'cliente salvo com sucesso!' })
            } else {
                res.json({ messagem: 'Erro ao salvar cliente!' })
            }

        } catch (error) {
            res.json(error)
        }

    },
    async update(req, res) {
        const { id, nome, telefone, email } = req.body

        const dados = { nome, telefone, email }

        const cliente = await Cliente.findByPk(id)

        if (cliente) {

            cliente.nome = dados.nome
            cliente.telefone = dados.telefone
            cliente.email = dados.email

            const updateSalve = await cliente.save()

            res.json(updateSalve)

        } else {
            res.json({ messagem: "Alteração não realizada!" })
        }

    },
    async delete(req, res) {
        try {
            const { id } = req.params
            const cliente = await Cliente.findByPk(id)
            if (cliente) {
                cliente.destroy();
                res.json({ data: { cliente }, messagem: "cliente excluido com sucesso" })
            }
        } catch (error) {
            res.json(error)
        }

    }
}