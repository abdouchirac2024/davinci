import Application from '../models/application.model.js';
import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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
    
    // Send email to applicant
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Candidature reçue - Davinci',
      text: `Cher/Chère ${req.body.fullName},\n\nVotre dossier de candidature a été envoyé avec succès. Vous recevrez une réponse dans les 14 jours. Si vous ne recevez pas de réponse dans ce délai, veuillez considérer que votre dossier n'a pas été retenu.\n\nCordialement,\nL'équipe Davinci`
    };

    transporter.sendMail(mailOptions);

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

export const getApplicationDetails = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see application details'));
  }
  try {
    const application = await Application.findById(req.params.id).populate('postId', 'title');
    if (!application) {
      return next(errorHandler(404, 'Application not found'));
    }
    res.status(200).json(application);
  } catch (error) {
    next(error);
  }
};

export const reviewApplication = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to review applications'));
  }
  const { applicationId } = req.params;
  const { status } = req.body;
  
  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return next(errorHandler(404, 'Application not found'));
    }
    
    application.status = status;
    application.reviewDate = new Date();
    await application.save();

    // Send email to applicant based on status
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: application.email,
      subject: `Mise à jour de votre candidature - Davinci`,
      text: status === 'accepted' 
        ? `Cher/Chère ${application.fullName},\n\nVotre dossier a été accepté. Vous serez contacté dans les 3 jours pour un entretien via Zoom.\n\nCordialement,\nL'équipe Davinci`
        : `Cher/Chère ${application.fullName},\n\nNous regrettons de vous informer que votre candidature n'a pas été retenue.\n\nCordialement,\nL'équipe Davinci`
    };

    transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Application reviewed successfully' });
  } catch (error) {
    next(error);
  }
};