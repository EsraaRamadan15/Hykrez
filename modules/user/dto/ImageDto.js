const ImageDto =class  {
    url;
    createdAt;

    constructor(url,createdAt) {
        this.url=url;
        this.createdAt=createdAt;      
    }
}


export  { ImageDto}