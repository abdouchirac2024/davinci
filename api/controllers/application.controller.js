// davinci/api/controllers/application.controller.js
import Application from '../models/application.model.js';
import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

export const createApplication = async (req, res, next) => {
  if (!req.user) {
    return next(errorHandler(403, 'You must be logged in to apply'));
  }
  if (!req.body.fullName || !req.body.email || !req.body.phoneNumber || !req.body.resume || !req.body.coverLetter) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const newApplication = new Application({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    next(error);
  }
};

export const getApplications = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see applications'));
  }
  try {
    const posts = await Post.find({ userId: req.user.id });
    const postIds = posts.map(post => post._id);
    const applications = await Application.find({ postId: { $in: postIds } }).populate('postId', 'title');
    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};