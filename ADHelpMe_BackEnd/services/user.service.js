const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;
const Ranking = db.Ranking;



module.exports = {
    authenticate,
    getAllUsers,
    getByUsername,
    addUser,
    setGoals,
    getGoals
}

async function authenticate({ username, password }) {

    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAllUsers() {
    //Returning the result of the promise.
    return await User.find().select('-hash');
}



async function getByUsername(username) {

    return await User.find({username:username});
}

async function addUser(userParam) {

    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // create ranking for new user
    const ranking = new Ranking({
        username: userParam.username,
        first: userParam.firstName,
        last: userParam.lastName,
        avgcalories: 0,
        avgminutes: 0,
        caloriegoal: 2000,
        minutegoal: 65,
        createdBy: user
    });

    // save user
    await user.save();

    // save ranking
    await ranking.save();

}


// TODO: complete this function. It takes in calories and minute goal values in 'values' and saves it for a given userid (_id). Hint: use 'updateOne' from mongoose.
async function setGoals(values, username){
    const qInfo = await User.updateOne({_id: username}, {caloriegoal: values.caloriegoal, minutegoal: values.minutegoal})

    if (qInfo.nModified === 0) {
        throw 'Setting goals failed.'
    } else {
        const oldRanking = await Ranking.findOne({createdBy: username})

        // the mongoose documentation says this is best practice
        if (oldRanking instanceof Ranking) {
            oldRanking.caloriegoal = values.caloriegoal;
            oldRanking.minutegoal = values.minutegoal;
        }

        // save the record
        await oldRanking.save();
    }
}


// TODO: complete this function. It should return calorie and minute goals for a given user.
async function getGoals(username){
    const user = await User.findOne({_id: username}, ('caloriegoal minutegoal username'));
    if (!user) {
        throw 'Error getting goals.'
    }
    return {minutegoal: user.minutegoal, caloriegoal: user.caloriegoal, username: user.username};
}

