module.exports = (error, req, res, next) => {
    const status = error.status || 500;
    res
      .status(status)
      .send(
        {
          message: error.message,
          timestamp: Date.now(),
          path: req.originalUrl
        });
  }