import Program from '../../models/admin/program.model.js';

//POST
export const createProgram = async (req, res) => {
  try {
    const program = new Program(req.body);
    await program.save();
    res.status(201).json(program);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//GET
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().populate('university');
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProgramById = async (req, res) => {
  try {
    const program = await Program.find(req.params.id).populate('university');
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//UPDATE
export const updateProgram = async (req, res) => {
  try {
    const newProgram = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(newProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE
export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) return res.status(404).json({ message: "Program not found" });
    res.json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
