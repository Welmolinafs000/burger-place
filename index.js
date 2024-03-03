const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000
app.use(express.json())

const checkID = (request, response, next) => {
    const {id} = request.params

    const index = orders.findIndex(order => order.id === id)
    if (index < 0) return response.status(404).json({ message: "ID not found" })

    request.orderIndex = index
    request.orderID = id

    next()
}


const orders = []

app.post("/orders",  (request, response) => {
    const { order, clientName, price } = request.body
    const status = " em preparação"
    const newOrder = { id: uuid.v4(), order, clientName, price, status }
    orders.push(newOrder)
    return response.status(201).json(newOrder)
})

app.get("/orders", (request, response) => {
    return response.json(orders)
})

app.put("/orders/:id", checkID, (request, response) => {
    const { order, clientName, price, status } = request.body
    const id = request.orderID
    const index = request.orderIndex

    const uptadeOrder = {id, order, clientName, price, status }
   
    orders[index] = uptadeOrder

    return response.json(uptadeOrder)
})

app.delete('/orders/:id',checkID, (request, response) => {
    const index = request.orderIndex

    orders.splice(index, 1)

    return response.status(204).json()
})

app.patch('/orders/:id', checkID, (request, response) => {
    const id = request.params
    const index = request.orderIndex
    const {status} = request.body

    orders[index].status = status

    return response.json(orders[index])
})


app.listen(port, () => {
    console.log(`🚀 Server started on port 3000`)
})