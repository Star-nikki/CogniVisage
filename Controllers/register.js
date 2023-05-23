export default (logger) => ({
  handleRegister: (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;

    //Form validation.
    if (!name || !email || !password) {
      return res.status(400).json("incorrect form submission");
    }

    //Hash password with bcryptjs.
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    //Add new user to login and user tables from our database.
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users").returning("*").insert({
            name: name,
            email: loginEmail[0].email,
            joined: new Date(),
          });
        })
        .then((user) => {
          trx.commit();
          res.json(user[0]);
        })
        .catch((err) => {
          logger.error(err);
          trx.rollback();
        });
    }).catch((err) => {
      logger.error(err);
      res.status(400).json("unable to register");
    });
  },
});
