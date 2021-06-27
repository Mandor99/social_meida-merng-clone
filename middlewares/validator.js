import joi from 'joi';

export const registerValidation = (data) => {
	const schema = joi.object({
		username: joi.string().required(),
		email: joi
			.string()
			.email()
			.required()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
		password: joi
			.string()
			.min(6)
			.required()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
		confirmPassword: joi.ref('password'),
	});
	return schema.validate(data);
};

export const logInValidation = (data) => {
	const schema = joi.object({
		email: joi
			.string()
			.email()
			.required()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
		password: joi
			.string()
			.required()
			.min(6)
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
	});
	return schema.validate(data);
};
