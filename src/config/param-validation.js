import Joi from 'joi';

export default {
  // POST /api/xxxxx
  createUser: {
    body: {
      username: Joi.string().required(),
      email: Joi.string().email().trim().required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required()
    }
  },
  createmapTalk: {
    body: {
      user_id: Joi.number().required(),
      subject: Joi.string(),
      content: Joi.string(),
      imageUrl: Joi.string(),
      lon: Joi.string(),
      lan: Joi.string(),
      status: Joi.string()
    }
  }
};
