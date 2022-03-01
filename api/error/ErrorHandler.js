module.exports = (error, req, res, next) => {
    res
      .status(error.status)
      .send(
        {
          message: error.message,
          timestamp: Date.now(),
          path: req.originalUrl
        });
  }