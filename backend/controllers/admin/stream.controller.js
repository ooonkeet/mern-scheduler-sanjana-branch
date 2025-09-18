import Stream from "../../models/admin/stream.model.js";

export const createStream = async (req, res) => {
  try {
    const stream = new Stream(req.body);
    await stream.save();
    res.status(201).json(stream);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getStreams = async (req, res) => {
  try {
    const streams = await Stream.find().populate('program');
    res.json(streams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStreamById = async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.id);
    if (!stream) return res.status(404).json({ message: "Not found" });
    res.json(stream);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStream = async (req, res) => {
  try {
    const stream = await Stream.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stream) return res.status(404).json({ message: "Not found" });
    res.json(stream);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStream = async (req, res) => {
  try {
    const stream = await Stream.findByIdAndDelete(req.params.id);
    if (!stream) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
