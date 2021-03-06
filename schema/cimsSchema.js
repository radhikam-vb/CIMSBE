const Joi =require("joi")
//validation

  const cimsSchema = Joi.object()
  .keys({
     designation: Joi.string().required(),
        brandname: Joi.string().required(),
        clientname: Joi.string().min(2).required(),
        domain: Joi.string().required(),
        baselocation: Joi.string().required(),
        addressLine1: Joi.string().required(),
        pincode:Joi.string().min(6),
        country:Joi.string().min(4).required(),
        state:Joi.string().required(),
        district:Joi.string().required(),
        city:Joi.string().required(),
        contacts:Joi.string().min(10),
   
  })

    .options({ abortEarly: false });

module.exports = { cimsSchema };
