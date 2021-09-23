const db = require('../_helpers/database');
const PArecord = db.PArecord;
const Ranking = db.Ranking;

module.exports = {
    getAllPArecords,
    addPArecord,
    updatePArecord,
    deletePArecord
}
//TODO: write the necessary functions that will address the needs of parecord.controller. Hint: look at the signatures in the module.exports. Hint2: look at user.service to see how you can interact with the database. Hint3: look at the class material.
async function getAllPArecords(username) {
    let records = await PArecord.find({createdBy: username}).select('-hash');

    // there is probably a better way to do this, but adding a query everytime home is loaded
    // in the angular code seemed just as slow if not slower.
    const oldRanking = await Ranking.findOne({createdBy: username})
    if (oldRanking) {
        let avgCals = 0;
        let avgMins = 0;
        let counter = 0;
        for (let record of records) {
            avgCals = avgCals + record.calories;
            avgMins = avgMins + record.minutes;
            counter++;
        }

        // the mongoose documentation says this is best practice
        if (oldRanking instanceof Ranking && counter > 0) {
            avgCals = avgCals / counter;
            avgMins = avgMins / counter;
            oldRanking.avgcalories = avgCals;
            oldRanking.avgminutes = avgMins;

            // save the record
            await oldRanking.save();
        }
    }
    //Returning the result of the promise.
    return records;
}

async function addPArecord(parecord, username) {
    // validate
    if (await PArecord.findOne({ createdBy: username, createdDate: parecord.createdDate  })) {
        throw 'Parecord created by"' + parecord.createdBy +" on "+ parecord.createdDate +'" already exists';
    } else if(!username){
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }

    //populate missing fields in the parecord object
    let newrecord = parecord;
    parecord.createdBy = username;

    dbrecord = new PArecord(newrecord);

    // save the record
    await dbrecord.save();
}

async function updatePArecord(parecord, username) {
    const record = await PArecord.findOne({ createdBy: username, createdDate: parecord.createdDate  })
    // validate
    if (!record) {
        throw 'Parecord created by"' + parecord.createdBy +" with date "+ parecord.createdDate +'" does not exist';
    } else if(!username){
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }

    // the mongoose documentation says this is best practice
    if (record instanceof PArecord) {
        record.calories = parecord.calories;
        record.minutes = parecord.minutes;
        record.activityType = parecord.activityType;
    }

    // save the record
    await record.save();
}

async function deletePArecord(date, userid) {
    // validate
    const deletionInfo = await PArecord.deleteOne({createdDate: date, createdBy: userid});
    if (deletionInfo.deletedCount === 0) {
        throw 'This PA record does not belong to you.'
    }
}
