



//API for adding venue

const addVenue = async (req, res) => {

    try {
        const {name, number, speciality, experience, about, available, location} = req.body
        
// Checking for all data to add venue
        if(!name || !number || !speciality || !experience || about || !available || !location){
//we excluded the image upload code
            return res.json({success:false, message:"Missing Details"})
        }



        

    } catch (error) {
        
    }
}

export {addVenue}