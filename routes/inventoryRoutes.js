import { Router } from "express"
import { getInventory, createInventory, getaInventory, updateInventory, deleteInventory , createInventoryRequest, forwardInventoryRequest, getInventoryRequestStatus, storeInventoryResponse} from "../controller/inventoryController.js"

const router = Router()

router.route('/fetch').get(getInventory)

// router.route('/fetch/:id').get(getaInventory)

router.route('/create').post(createInventory)

router.route('/update/:id').put(updateInventory)

router.route('/delete/:location/:item').delete(deleteInventory)

router.route('/request').post(createInventoryRequest)

router.route('/:requestId/forward').post(forwardInventoryRequest)

router.route('/requestStatus').get(getInventoryRequestStatus)

router.route('/requestStatus/:requestId/storeInventoryResponse').post(storeInventoryResponse)


export default router