const express = require('express');
const app = express();
app.use(express.json());

let data = {};
app.post('/', (req, res) => {
    const { data: dataArray, unique } = req.body;

    if (!dataArray || !Array.isArray(dataArray) || dataArray.length === 0 || !unique || !Array.isArray(unique) || unique.length === 0) {
        return res.send({ statuscode: 400, message: 'Invalid request. Data array and unique keys are required.' });
    }

    const duplicates = {};
    let newData = {};
    for (const item of dataArray) {
        const {
            sheetName,
            ...record
        } = item;
        // Check if the sheetName is there or not
        if (!sheetName) {
            res.send({ statuscode: 400, message: "SheetName is compulsory" })
        }

        if (!newData[sheetName]) {
            newData[sheetName] = [];
        }

        const duplicateItems = newData[sheetName].filter(existingRecord => {
            return unique.some(key => existingRecord[key] === record[key]);
        });

        if (duplicateItems.length > 0) {
            duplicates[sheetName] = duplicates[sheetName] ? duplicates[sheetName].concat(item) : [...duplicateItems, item];
        }
        newData[sheetName].push(record);
    }

    if (Object.keys(duplicates).length > 0) {
        return res.send({ statuscode: 400, message: "Duplicate values found", DuplicateValue: duplicates });
    }
    data = newData;
    return res.send({ statuscode: 200, message: "Unique Data Found", data });
});

app.listen(3000, () => {
    console.log("App is running on 3000");
});