const Post = require("../models/Post");

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createPost: async (req, res) => {
    try {
      const { title, content, published, author } = req.body;
      if (!title || !content || published === undefined || !author) {
        return res.status(400).json({ error: "Incomplete post data" });
      }
      const post = await Post.create({ title, content, published, author });
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getPostById: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, published } = req.body;
      if (!title || !content || published === undefined) {
        return res.status(400).json({ error: "Incomplete post data" });
      }
      const post = await Post.findByIdAndUpdate(
        id,
        { title, content, published },
        { new: true }
      );
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndDelete(id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
