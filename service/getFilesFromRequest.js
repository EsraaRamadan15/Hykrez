

 function getMultipleFilesUrlsFromRequest (req) {
    let imagesURL = [];
    if (req.files) {
      req.files.forEach((file) => {
        imagesURL.push(`${req.finalDestination}/${file.filename}`);
      });
     }
     return imagesURL;
 }

 function getFileUrlFromRequest (req) {
  let imagesURL = [];
  if (req.file) {
    imagesURL.push(`${req.finalDestination}/${req.file.filename}`);
   }
   return imagesURL;
}
    
export  {getMultipleFilesUrlsFromRequest,getFileUrlFromRequest};