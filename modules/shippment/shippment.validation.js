import pkg from 'joi';
const Joi = pkg;

const addShipment = {

    body: Joi.object().required().keys({
        countryFromId: Joi.string().required(),
        countryToId: Joi.string().required(),
        departureDate: Joi.date().required(),
        shipmentName: Joi.string().required(),
        notes: Joi.string().allow(null),
        shippmentDetails:Joi.array().required().object({
            itemLink: Joi.string().required() ,
            itemName: Joi.string().required() ,
            itemPrice: Joi.number().required() ,
            weight: Joi.number().allow(null),
            quantity: Joi.number().allow(null),
            categoryId: Joi.number().required() ,
            itemImages:Joi.array().allow(null),
            itemsImageUrls:Joi.array().allow(null),
          })
    })
}



export  {
    addShipment
}