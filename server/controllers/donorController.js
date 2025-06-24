const Donor = require("../models/Donor")
const creatNewDonor = async (req, res) => {
    const { name, email, numberPhone, commemoratesNames, notes } = req.body
    const donor = await Donor.create({ name, email, numberPhone, commemoratesNames, notes })
    if (donor) {
        return res.status(201).json({ message: 'new donor created' })
    }
    res.status(400).json({ message: 'invalid donor' })

}
const getAllDonors = async (req, res) => {
    const donors = await Donor.find().lean()
    res.json(donors)
}
const getDonorById = async (req, res) => {
    const { id } = req.params
    const donor = await Donor.findById(id).lean()
    if (!donor) {
        return res.status(400).json({ message: 'donor not found' })
    }
    res.json(donor)
}
const getDonorByName = async (req, res) => {
    const { name } = req.params
    const donor = await Donor.find({ name }).lean()
    if (!donor || donor.length === 0) {
        return res.status(400).json({ message: 'donor not exists' })
    }
    res.json(donor)
}
const updateDonor = async (req, res) => {
    const { id, name, email, numberPhone, commemoratesNames, notes } = req.body
    if (!id && (!name || !email || !numberPhone || !commemoratesNames || !notes)) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const donor = await Donor.findById(id).exec()
    if (!donor) {
        return res.status(400).json({ message: 'donor not found' })
    }
    donor.name = name || donor.name
    donor.email = email || donor.email
    donor.numberPhone = numberPhone || donor.numberPhone
    donor.commemoratesNames = commemoratesNames || donor.commemoratesNames
    donor.notes = notes || donor.notes

    const updatedDonor = await donor.save()
    res.json(`The details of '${updatedDonor.name}' updated`)
}
const deleteDonor = async (req, res) => {
    const { id } = req.params
    const donor = await Donor.findById(id).exec()
    if (!donor) {
        return res.status(400).json({ message: 'donor not found' })
    }
    const result = await donor.deleteOne()
    res.json(`'${donor.name}' deleted`)
}
module.exports = {
    creatNewDonor,
    getAllDonors,
    getDonorById,
    getDonorByName,
    updateDonor,
    deleteDonor
}