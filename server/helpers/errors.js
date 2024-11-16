// server/helpers/errors.js
const handleError = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).send({ error: 'Internal Server Error' });
  };
  
  module.exports = { handleError };
  