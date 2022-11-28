

const createShipment= async (req, res) => {
    try {
        
    const { countryFromId,countryToId, departureDate,shipmentName,notes,shippmentDetails} = req.body
    if (req.fileErr) {
        res.status(400).json(new ResponseModel(req.file,false, req.t('InvalidFormat')  ))
    } else {
        const imageURL = `${req.finalDestination}/${req.file.filename}`;
        const newCategory= new categoryModel({ nameEn,nameAr, image: imageURL})
        const savedCategory = await newCategory.save()
       
    }
    } catch (error) {
        res.status(201).json(new ResponseModel(error,false,""))
    }

}