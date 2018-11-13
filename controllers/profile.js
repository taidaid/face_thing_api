const handleProfileGet = (req, res, knex) => {
    const { id } = req.params;

    //SELECTs all users atm, not user by id (desired)
    knex.select('*').from('users').where({ id })
        .then(user => {
            console.log(user)
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfileGet: handleProfileGet
}