import asyncHandler from "express-async-handler";
import {
  inventoryCreate,
  inventoryFetch,
  inventoryRequest,
  inventoryRequestForward,
  inventoryRequestStatus,
  storeResponse,
  inventoryItemDelete,
} from "../db/firestore_database.js";
import {
  PinventoryCreate,
  PinventoryFetch,
  PspecificInventoryFetch,
  PinventoryRequestCreate,
  PinventoryRequestForward,
  PinventoryRequestfetch,
  PspecificInventoryRequestfetch,
  PstoreResponse,
} from "../db/postgres_database.js";
import { v4 as uuidv4 } from "uuid";

//@desc Get all the inventory
//@route GET /api/inventory
//@access public
/**
 * Handles the GET request for fetching all inventory items.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getInventory = asyncHandler(async (req, res) => {
  const { item_id, item_name, location, statusOfItem } = req.query;

  const filteredParams = {};
  if (item_id) filteredParams.item_id = item_id;
  if (item_name) filteredParams.item_name = item_name;
  if (location) filteredParams.location = location;
  if (statusOfItem) filteredParams.statusOfItem = statusOfItem;
  if (Object.keys(filteredParams).length > 0) {
    const specificInevntoryData = await PspecificInventoryFetch(filteredParams);
    res.status(200).json(specificInevntoryData);
  } else {
    const inventoryData = await PinventoryFetch();
    res.status(200).json(inventoryData);
  }
});

//@desc Create new inventory
//@route POST /api/inventory
//@access public
/**
 * Handles the POST request for creating a new inventory item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const createInventory = asyncHandler(async (req, res) => {
  console.log("The request body:", req.body);
  const { item, location, statusOfItem } = req.body;
  if (!item || !location) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const itemJSON = {
    item: item,
    location: location,
    statusOfItem: statusOfItem,
  };
  await PinventoryCreate(item, location, itemJSON);
  res.status(201).json({
    message: `Item added to ${location} inventory: ${item}`,
  });
});

//@dec Create inventory request
//@route POST /api/inventory/request
//@access public
/**
 * Handles the POST request for creating a new inventory request.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const createInventoryRequest = asyncHandler(async (req, res) => {
  console.log("The request body:", req.body);
  const requestId = uuidv4();
  const { requestedItems } = req.body;
  if (!requestedItems) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const newRequest = { requestId, requestedItems, status: "requested" };
  await PinventoryRequestCreate(newRequest);
  res.status(200).json(newRequest);
});

//@desc Forward inventory request
//@route POST /api/inventory/:requestId/forward
//@access public
/**
 * Handles the PUT request for forwarding an inventory request.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const forwardInventoryRequest = asyncHandler(async (req, res) => {
  console.log("The request body:", req.body);
  const { location } = req.body;
  if (!location) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  await PinventoryRequestForward(req.params.requestId, location);
  res
    .status(200)
    .json({
      message: `forwarded requestId: ${req.params.requestId} with location: ${location}`,
    });
});

//@desc Get all inventory requests status
//@route GET /api/inventory/requestStatus
//@access public
/**
 * Handles the GET request for fetching all inventory requests status.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getInventoryRequestStatus = asyncHandler(async (req, res) => {
  const { requestId } = req.query;
  const filteredParams = {};
  if (requestId) filteredParams.requestId = requestId;
  if (Object.keys(filteredParams).length > 0) {
    const specificRequestData =
      await PspecificInventoryRequestfetch(filteredParams);
    res.status(200).json(specificRequestData);
  } else {
    const inventoryRequestStatusData = await PinventoryRequestfetch();
    res.status(200).json(inventoryRequestStatusData);
  }
});

//@desc Response from the store for specific inventory request
//@route POST /requestStatus/:requestId/storeInventoryResponse
//@access public
/**
 * Handles the POST request for storing an inventory response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const centralStoreInventoryResponse = asyncHandler(async (req, res) => {
  console.log("The request body:", req.body);
  const { availableItems } = req.body;
  if (!availableItems) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  await PstoreResponse(req.params.requestId, availableItems);
  res
    .status(200)
    .json({
      message: `store inventory response for reqID: ${req.params.requestId} with availableItems: ${JSON.stringify(availableItems)}`,
    });
});

//@desc Get an inventory
//@route GET /api/inventory/:id
//@access public
/**
 * Handles the GET request for fetching a specific inventory item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getaInventory = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get inventory for ${req.params.id}` });
});

//@desc update an inventory
//@route PUT /api/inventory/:id
//@access public
/**
 * Handles the PUT request for updating a specific inventory item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const updateInventory = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `updated ${req.params.id}` });
});

//@desc delete an inventory
//@route PUT /api/inventory/:id
//@access public
/**
 * Handles the PUT request for deleting a specific inventory item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const deleteInventory = asyncHandler(async (req, res) => {
  const result = await inventoryItemDelete(
    req.params.location,
    req.params.item,
  );
  console.log(result);
  if (result == "No such document") {
    res.status(400);
    throw new Error("No such item exists at inventory");
  }
  res
    .status(200)
    .json({ message: `Delete inventory for ${req.params.location}` });
});

export {
  getInventory,
  createInventory,
  getaInventory,
  updateInventory,
  deleteInventory,
  createInventoryRequest,
  forwardInventoryRequest,
  getInventoryRequestStatus,
  centralStoreInventoryResponse,
};
