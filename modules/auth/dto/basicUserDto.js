let BasicUserData =class  {
    id
    firstName="";
    lastName="";
    email="";
    deviceToken;
    image;
    constructor(id,firstName, lastName, email,deviceToken,image) {
       this.id=id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.deviceToken = deviceToken; 
        this.image=image; 
    }
}
export default BasicUserData