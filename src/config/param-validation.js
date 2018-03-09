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
      subject: Joi.string().max(30),
      content: Joi.string(),
      imageUrl: Joi.string(),
      lon: Joi.number(),
      lan: Joi.number(),
      status: Joi.number(),
      category: Joi.number()
    }
  }
};
