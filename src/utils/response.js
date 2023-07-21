function buildFailureResponse(message, statusCode) {
  return {
    status: "failure",
    message,
    statusCode,
  };
}

module.exports = { buildFailureResponse };
