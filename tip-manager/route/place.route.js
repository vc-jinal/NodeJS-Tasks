const express = require('express');
const client = require('../db/connection');
const { ObjectId } = require('mongodb');
const placeRouter = express.Router();
const verifyToken = require('../jwt');
const db = client.db('tip-manager');
const place = db.collection('places');
const user = db.collection('users');

// create
placeRouter.post('/', verifyToken, async (req, res) => {
    const { placeName, billAmount, tipAmount } = req.body;

    const userExist = await user.findOne({ _id: new ObjectId(req.user.id) });
    if (!userExist) {
        return res.send({ statusCode: 404, message: "user not found" })
    }

    const addPlaceDetails = {
        user_id: new ObjectId(req.user.id),
        placeName: placeName,
        billAmount: billAmount,
        tipAmount: tipAmount,
        totalAmount: billAmount + tipAmount,
        tipPercentage: Math.round(tipAmount / billAmount * 100),
        created_At: new Date(new Date(Date.now())),
        updated_At: new Date(new Date(Date.now()))
    }

    const savedPlace = await place.insertOne(addPlaceDetails);
    return res.send({ statusCode: 200, message: "Place details added Successfully", user: savedPlace })
})

// repeated tip percentage by user
placeRouter.get('/tipPercentage', verifyToken, async (req, res) => {
    const query = await place.find({ user_id: new ObjectId(req.user.id) }).toArray();

    const tipPercentage = [];
    for (let i = 0; i < query.length; i++) {
        tipPercentage.push(query[i].tipPercentage);
    }

    function mostRepeatedTipPercentage(arr) {
        let maxCount = 0;
        let repeatedTipPercentage;
        for (let i = 0; i < arr.length; i++) {
            let count = 0;
            for (let j = 0; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    count++;
                }
            }
            if (count > maxCount) {
                maxCount = count;
                repeatedTipPercentage = arr[i];
            }
        }
        return { repeatedTipPercentage, maxCount };
    }

    let maxTipPercent = mostRepeatedTipPercentage(tipPercentage);
    return res.send({ statusCode: 200, message: "Most repeated tip percentage", tipPercentage: maxTipPercent });
})

// most visited place by user
placeRouter.get('/visitPlaces', verifyToken, async (req, res) => {
    const query = await place.find({ user_id: new ObjectId(req.user.id) }).toArray();

    const placeName = [];
    for (let i = 0; i < query.length; i++) {
        placeName.push(query[i].placeName);
    }
    let maxPlace = mostFrequentPlace(placeName);

    function mostFrequentPlace(arr) {
        let maxCount = 0;
        let maxVisitedPlace;
        for (let i = 0; i < arr.length; i++) {
            let count = 0;
            for (let j = 0; j < arr.length; j++) {
                if (arr[i] == arr[j])
                    count++;
            }
            if (count > maxCount) {
                maxCount = count;
                maxVisitedPlace = arr[i];
            }
        }
        return { maxVisitedPlace, maxCount };
    }

    return res.send({ statusCode: 200, message: "Most visited Places by user", data: maxPlace })
})

// list of total amount
placeRouter.get('/:placeName', verifyToken, async (req, res) => {
    const placeName = req.params.placeName;

    const query = await place.find({ user_id: new ObjectId(req.user.id), placeName: placeName }).toArray();

    return res.send({ statusCode: 200, message: "List of total amount", data: query });
})

module.exports = placeRouter;