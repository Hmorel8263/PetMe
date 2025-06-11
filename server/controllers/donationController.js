const Pet = require('../Models/petModel');
const Donation = require('../Models/donationModel');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');

//This is the pet function
const PetData = (body) => ({
    name: body.petName,
    type: body.type,
    breed: body.breed,
    color: body.color,
    image: body.image || null,
});

//Now this is the donation information
const UserData = (body, petID) => ({
    name: body.name,
    email: body.email,
    address: body.address,
    city: body.city,
    state: body.state,
    country: body.country,
    phone: body.phone,
});

//Using the previous information from the pet and the owner to make a donation
const makeDonation = catchAsync(async(req, res, next) => {
    const petInfo = PetData(req.body);
    const newPet = await Pet.create(petInfo);

    const userInfo = UserData(req.body, newPet._id);
    const createdDonation = await Donation.create(userInfo);

    res.status(201).json({
        success: true, 
        data: {
            pet: newPet,
            donation: createdDonation
        }
    });
});