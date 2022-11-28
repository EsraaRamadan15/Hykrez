import pkg from 'joi';
const Joi = pkg;
const createCateogry = {

    body: Joi.object().required().keys({
        nameEn: Joi.string().required(),
        nameAr: Joi.string().required()
    })
}

const createService = {

    body: Joi.object().required().keys({
        title: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().allow(null, ''),
        images:Joi.array().allow(null, ''),
        cityId: Joi.string().allow(null),
        categoryId : Joi.string().allow(null, '')
    })
}
const editService = {

    body: Joi.object().required().keys({
        id: Joi.string().required(),
        title: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().allow(null, ''),
        images:Joi.array().allow(null, ''),
        cityId: Joi.string().allow(null),
        categoryId : Joi.string().allow(null, '')
    })
}
export  {
    createCateogry,createService
}