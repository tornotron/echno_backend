import asyncHandler from "express-async-handler";
import {
  PuserFindDuplicate,
  PuserCreate,
} from "../db/relational_domain/user_postgres_database.js";
import bcrypt from "bcrypt";

const userCreate = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).json({ message: "All fields are required" });
  }
  //find duplicate
  const duplicate = await PuserFindDuplicate(userName);
  if (duplicate) {
    res.sendStatus(409);
  }
  //password management
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = { username: userName, salt: salt, password: hashedPassword };
  //store the new user
  const createStatus = await PuserCreate(user);
  if (createStatus) {
    res.status(201).json({ message: `User ${userName} created` });
  } else {
    res.status(400).json({ message: `Error creating user ${userName}` });
  }
});

export { userCreate };
