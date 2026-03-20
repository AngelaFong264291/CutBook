const hairstyleService = require("../services/hairstyleService");
const parseId = require("../utils/parseId");

async function getHairstyles(req, res) {
  const hairstyles = await hairstyleService.getAllHairstyles();
  res.json(hairstyles);
}

async function getHairstyle(req, res) {
  const id = parseId(req.params.id, "Hairstyle");
  const hairstyle = await hairstyleService.getHairstyleById(id);

  res.json(hairstyle);
}

async function createHairstyle(req, res) {
  const hairstyle = await hairstyleService.createHairstyle(req.body);
  res.status(201).json(hairstyle);
}

async function updateHairstyle(req, res) {
  const id = parseId(req.params.id, "Hairstyle");
  const hairstyle = await hairstyleService.updateHairstyle(id, req.body);

  res.json(hairstyle);
}

async function updatePublishStatus(req, res) {
  const id = parseId(req.params.id, "Hairstyle");
  const hairstyle = await hairstyleService.updateHairstylePublishStatus(
    id,
    req.body.published,
  );

  res.json(hairstyle);
}

async function deleteHairstyle(req, res) {
  const id = parseId(req.params.id, "Hairstyle");
  const result = await hairstyleService.deleteHairstyle(id);

  res.json(result);
}

module.exports = {
  getHairstyles,
  getHairstyle,
  createHairstyle,
  updateHairstyle,
  updatePublishStatus,
  deleteHairstyle,
};
