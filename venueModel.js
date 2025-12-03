import mongoose from 'mongoose'

const venueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    speciality: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    image: { type: String, required: true },
    location: { type: Object, default: {} }
}, { minimize: false })

const venueModel = mongoose.models.venue || mongoose.model('venue', venueSchema)

export default venueModel