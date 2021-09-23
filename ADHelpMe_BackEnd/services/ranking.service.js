const db = require('../_helpers/database');
const Ranking = db.Ranking;

module.exports = {
    getAllRankings
}

async function getAllRankings(){
    return await Ranking.find().select('-hash');
}
