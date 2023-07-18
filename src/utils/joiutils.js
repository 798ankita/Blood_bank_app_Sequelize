const Joi = require('joi');
 const userUtils = (user) =>
 {
    const schema = Joi.object({
	
        name: Joi.string()
			.min(3)
			.max(40)
			.required(),
			
		username: Joi.string()
				.min(6)
				.max(20)
				.required(),
                
         password: Joi.string()
		.pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),
					
		email: Joi.string()
			.email()
			.min(6)
			.max(50)
			.optional(),

		role: Joi.string()
			.min(3)
			.max(40)
			.required(),

		state: Joi.string()
			.max(15)
			.required(),
			
		city: Joi.string()
			.max(15)
			.required()

	}).options({ abortEarly: false });
	

	return JoiSchema.validate(user)
}
module.exports = userUtils;