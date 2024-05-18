const express = require("express")
const { getInventory, createInventory, getaInventory, updateInventory, deleteInventory } = require("../controller/inventoryController")
const router = express.Router()

router.route('/').get(getInventory)

router.route('/:id').get(getaInventory)

router.route('/').post(createInventory)

router.route('/:id').put(updateInventory)

router.route('/:id').delete(deleteInventory)

module.exports = router