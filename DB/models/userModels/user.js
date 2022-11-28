import pkg from 'mongoose';
const { Schema, model } = pkg;
import { hash } from 'bcrypt';

const phoneSchema = new Schema({ phoneCode: String,phoneNumber :String });
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
    ,
    password: {
        type: String,
    },
    image:  {
        type: String,
    },
    isSocailLogin:{type:Boolean,required: true,default:false},
    gender: {
        type: String,
        enum : ['0','1'],
        required:false
    },
    deviceToken: {
        type: String,
        required: false
    },
    countryId:  {type: Schema.Types.ObjectId, ref: 'Country'} ,
    cityId:  {type: Schema.Types.ObjectId, ref: 'City'} ,
    dealsNumber:{type:Number,required: true,default:0},
    tripsNumber:{type:Number,required: true,default:0},
    avarageRating:{type:Number,required: true,default:0},
    totalRating:{type:Number,required: true,default:0},
    totalTravellerRating:{type:Number,required: true,default:0},
    shipmentOwnerRating:{type:Number,required: true,default:0},
    isVerified:{type:Boolean,required: true,default:false},
    role: { type: String, default: 'User' },
    follower: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    code: String,
    phoneNumbers:[{ type: phoneSchema}]
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (this.password != null &&this.password != undefined) {
        this.password = await hash(this.password, parseInt(process.env.saltRound))
    }
    next()
})

const userModel = model('User', userSchema)
export default userModel