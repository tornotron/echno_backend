import { Router } from "express"
import { getInventory, createInventory, getaInventory, updateInventory, deleteInventory } from "../controller/inventoryController.js"
const router = Router()

router.route('/').get(getInventory)

router.route('/:id').get(getaInventory)

router.route('/').post(createInventory)

router.route('/:id').put(updateInventory)

router.route('/:id').delete(deleteInventory)

export default router