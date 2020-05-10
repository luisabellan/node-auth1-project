const bcrypt = require("bcryptjs")
const db = require("../database/config")

async function add(user) {
	// hash the password with a time complexity of 14
	user.password = await bcrypt.hash(user.password, 14)

	const [id] = await db("users").insert(user)
	return findById(id)
}

function find() {
	return db("users").select("id", "username")
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
		.where(filter)
}

function findById(id) {
	return db("users")
		.select("id", "username")
		.where({ id })
		.first()
}

router.delete("/:id", async (req, res, next) => {
	try {
	// translates to `DELETE FROM "cars" WHERE "id" = ?;`
		await db("users").where("id", req.params.id).del()
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})


module.exports = {
	add,
	find,
	findBy,
	findById,
	deleteUser
}
