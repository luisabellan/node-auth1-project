const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")

const { restrict } = require("../middleware/restrict")

const router = express.Router()

router.post("/register", async (req, res, next) => {
	try {
		const { username } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		res.status(201).json(await Users.add(req.body))
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!user || !passwordValid) {
			return res.status(401).json({
				message: "You shall not pass!",
			})
		}
		req.session.user = user

		res.json({
			message: `Logged in`,
		})
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
