const profile = require("./profile");
const redis = require("redis");

// Setup Redis
const redisClient = redis.createClient(process.env.REDIS_URL);

const handleLogin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("incorrect form submission");
  }
  return db
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(user => user[0])
          .catch(err => Promise.reject("unable to get user"));
      } else {
        return Promise.reject("wrong credentials");
      }
    })
    .catch(err => Promise.reject("wrong credentials"));
};

const getAuthTokenId = (req, res, db) => {
  const { authorization } = req.headers;
  redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json("Unauthorized");
    }
    req.params = { id: reply };
    return profile.handleProfileGet(req, res, db);
  });
};

const signToken = (email, jwt) => {
  const jwtPayload = { email };
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign(jwtPayload, jwtSecret, { expiresIn: "2 days" });
};

const setToken = (token, value) => {
  return Promise.resolve(redisClient.set(token, value));
};

const createSessions = (user, jwt) => {
  // JWT token, return user data
  const { email, id } = user;
  const token = signToken(email, jwt);
  return setToken(token, id)
    .then(() => {
      console.log('set token success, token id: ', token)
      return { success: "true", userId: id, token: token };
    })
    .catch(console.log);
};

const handleAuth = (req, res, db, bcrypt, jwt) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(req, res, db)
    : handleLogin(req, res, db, bcrypt)
      .then(data => {
        console.log('handleLogin data: ', data);
        return data.id && data.email
          ? createSessions(data, jwt)
          : Promise.reject(data);
      })
      .then(session => res.json(session))
      .catch(err => res.status(400).json(err));
};

module.exports = {
  handleAuth: handleAuth,
  redisClient: redisClient
};
