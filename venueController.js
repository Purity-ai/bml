// backend/controllers/venueController.js

const getAllVenues = async (req, res) => {
    try {
        const venues = [
            { id: 1, name: 'Computer Engineering Lab', capacity: 50, program: 'Computer Engineering' },
            { id: 2, name: 'Cyber Security lab', capacity: 40, program: 'Cyber Security' },
            { id: 3, name: 'ICT-lab', capacity: 45, program: 'Information Communication Technology' },
            { id: 4, name: 'Software Engineering Lab', capacity: 35, program: 'Software Engineering' },
            { id: 5, name: 'Network Degree Lab', capacity: 40, program: 'Network Engineering' },
            { id: 6, name: 'Hardware Engineering Lab', capacity: 30, program: 'Hardware Engineering' }
        ];

        res.json({ success: true, venues });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { getAllVenues };