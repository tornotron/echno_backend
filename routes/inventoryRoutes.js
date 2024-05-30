import { Router } from "express"
import { getInventory, createInventory, getaInventory, updateInventory, deleteInventory , createInventoryRequest, forwardInventoryRequest, checkRequest} from "../controller/inventoryController.js"
const router = Router()

router.route('/fetch').get(getInventory)

// router.route('/:id').get(getaInventory)

router.route('/create').post(createInventory)

router.route('/update/:id').put(updateInventory)

router.route('/delete/:id').delete(deleteInventory)

router.route('/request').post(createInventoryRequest)

router.route('/:requestId/forward').put(forwardInventoryRequest)

router.route('/checkrequest').get(checkRequest)

export default router