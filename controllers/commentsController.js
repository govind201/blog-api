const Comment = require("../models/Comment");

module.exports = {
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createComment: async (req, res) => {
    try {
      const { content, author, post } = req.body;
      if (!content || !author || !post) {
        return res
          .status(400)
          .json({ error: "Content, author, and post are required fields" });
      }
      const comment = await Comment.create({ content, author, post });
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getCommentById: async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is a required field" });
      }
      const comment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await Comment.findByIdAndDelete(id);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
