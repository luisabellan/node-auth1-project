const express = require("express")
const Users = require("./users-model")
const { restrict } = require("../middleware/restrict")

const router = express.Router()


router.get("/", restrict(),  async (req, res, next) => {
	try {
		res.status(200).json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
	res.status(204).json(Users.deleteUser())
	} catch (err) {
		next(err)
	}
})


module.exports = router