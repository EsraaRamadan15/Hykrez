import pkg from 'joi';
const Joi = pkg;
const addProfileImage = {

    body: Joi.object().required().keys({
        image: Joi.string(),
    })
}



export  {
    addProfileImage
}