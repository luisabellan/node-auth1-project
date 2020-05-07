const db = require('../data/config');

// resolves to a promise that resolves to an array of all users in the database.

function find() {
    return db('users')
}

// resolves to  Resolve to a single user object (or null)

function findById(id) {
    return db('users').where({ id }).first();
}




function remove(id) {
    return db('users').where({id}).first().del()

}
/* 
function findSteps(id) {
    /*  SELECT s.id, k.user_name, s.step_number,s.instructions 
     FROM steps AS s
     JOIN [users] AS k
     ON s.id = k.id; */

    //  const steps =  db('steps').where({id}) 

/*     const steps = db('steps as s')
        .join('users as k', 's.id', 'k.id')
        .select('s.id', 'k.user_name', 's.step_number', 's.instructions');



    return db(steps).where({ id });
}  */

async function update(changes,id) {

    
      const user =  await db("users").where({id}).update(changes);
      return user
      
}





module.exports = {
    find,
    remove,
    findById,
    update
}