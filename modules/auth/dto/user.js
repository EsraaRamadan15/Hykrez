let User =class  {
    id
    firstName="";
    lastName="";
    email="";
    deviceToken;
    image;
    isSocialLogin;
    gender;
    countryId;
    dealsNumber=0
    tripsNumber=0;
    avarageRating=0;
    totalRating=0;
    totalTravellerRating=0;
    shipmentOwnerRating=0;
    followersNumber=0;
    followingsNumber=0;
    phoneNumbers;
    isVerified;
    constructor(id,firstName, lastName, email,deviceToken,image,isSocialLogin,gender,countryId,dealsNumber,
        tripsNumber,avarageRating,totalRating,totalTravellerRating,shipmentOwnerRating,followersNumber,
        followingsNumber,isVerified,phoneNumbers) {
        this.id=id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.image =  image;
        this.isSocialLogin = isSocialLogin;
        this.deviceToken = deviceToken;
        this.gender = gender== null?null: gender;
        this.countryId =  countryId== null?null: countryId; 
        this.dealsNumber =dealsNumber;
        this.tripsNumber =tripsNumber;     
        this.avarageRating = avarageRating;
        this.totalRating = totalRating;
        this.totalTravellerRating = totalTravellerRating;
        this.shipmentOwnerRating = shipmentOwnerRating;     
        this.followersNumber = followersNumber;
        this.followingsNumber = followingsNumber;
        this.isVerified =  isVerified;
        this.phoneNumbers =phoneNumbers;
        
    }
}
export default User