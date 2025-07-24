const Content = require('../models/content');

exports.getAll = async (req,res) => {
  const items = await Content.find();
  res.json(items);
};

exports.create = async (req,res) => {
  const data = req.body;
  const item = await Content.create(data);
  res.status(201).json(item);
};
