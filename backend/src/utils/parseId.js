const createHttpError = require("./httpError");

function parseId(rawValue, resourceName = "Resource") {
  const id = Number(rawValue);

  if (!Number.isInteger(id) || id <= 0) {
    throw createHttpError(400, `${resourceName} id must be a positive integer.`);
  }

  return id;
}

module.exports = parseId;
