import Subject from '../../models/admin/subjects.model.js';

//POST
export const createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//GET
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('stream');
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.find(req.params.id);
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//UPDATE
export const updateSubject = async (req, res) => {
  try {
    const newSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE
export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
