const db = require('_helpers/db');
const Game = db.Game;
const Developer = db.Developer;
const Publisher = db.Publisher;
const mongoose = require('mongoose');
const developerService = require('../developer/developer.service');
const publisherService = require('../publisher/publisher.service');
module.exports = {
    getAll,
    getById,
    create,
    getImages,
    getByTitle,
    update,
    getAllWithDevs,
    getAllWithPubs
};
async function getAll() {
    return await Game.find().select();
}
async function update(id, gameParam) {
    const game = await Game.findById(id);
    if (!game) throw 'User not found';
    if (game.title !== gameParam.title && await Game.findOne({ title: gameParam.title })) {
        throw 'Game "' + gameParam.title + '" is already exists';
    }
    let dev = {};
    let pub = {};
    if (await Developer.findOne({ developer: gameParam.developer })) {
        dev = await Developer.findOne({ developer: gameParam.developer });
    }
    else{
        await developerService.create({developer:gameParam.developer});
        dev = await Developer.findOne({ developer: gameParam.developer });
    }
    if (await Publisher.findOne({ publisher: gameParam.publisher })) {
        pub = await Publisher.findOne({ publisher: gameParam.publisher });
    }
    else{
        await publisherService.create({publisher:gameParam.publisher});
        pub = await Publisher.findOne({ publisher: gameParam.publisher });
    } 
    gameParam.devId = dev._id;
    gameParam.pubId = pub._id;
    Object.assign(game, gameParam);

    await game.save();
}
async function getAllWithDevs(dev){
    let game = new Game();
    let regex = new RegExp([dev].join(""), "i");
    let games = [];
    game = await Game.aggregate([
        {
              $lookup:
              {
                from: "developers",
               localField: "devId",
                foreignField: "_id",
                as: "developer"
              } 
          }
       ]);
       
       for(let i=0;i<game.length;i++){
           if(regex.test(game[i].developer[0].developer)){
           games.push(game[i])
           }
           else{
           }
        }
    return await games;
}
async function getAllWithPubs(publisher){
    let game = new Game();
    let regex = new RegExp([publisher].join(""), "i");
    let games = [];
    game = await Game.aggregate([
        {
              $lookup:
              {
                from: "publishers",
               localField: "pubId",
                foreignField: "_id",
                as: "publisher"
              } 
          }
       ]);
       for(let i=0;i<game.length;i++){

           if(regex.test(game[i].publisher[0].publisher)){
           games.push(game[i])
           }
           else{
           }
        }
    return await games;
}
async function getByTitle(param){
    let regex = new RegExp([param].join(""), "i");
    return await Game.find({title:  regex})
}
async function create(gameParam) {
    if (await Game.findOne({ title: gameParam.title })) {
        throw 'Game with title "' + gameParam.title + '" is already exists';
    }
    let dev = {};
    let pub = {};
    if (await Developer.findOne({ developer: gameParam.developer })) {
        dev = await Developer.findOne({ developer: gameParam.developer });
    }
    else{
        await developerService.create({developer:gameParam.developer});
        dev = await Developer.findOne({ developer: gameParam.developer });
    }
    if (await Publisher.findOne({ publisher: gameParam.publisher })) {
        pub = await Publisher.findOne({ publisher: gameParam.publisher });
    }
    else{
        await publisherService.create({publisher:gameParam.publisher});
        pub = await Publisher.findOne({ publisher: gameParam.publisher });
    } 
    gameParam.devId = dev._id;
    gameParam.pubId = pub._id;
    let newGame = new Game(gameParam);
    await newGame.save();
}
async function getById(id) {
    return await Game.findById(id).select();
}
function CorrectType(el) {
     return mongoose.Types.ObjectId(el) ;
    }
async function getImages(id){
    id = CorrectType(id);
    return await Game.aggregate([
        { 
            $match : { "_id": id } 
        },
        {
          $lookup:
            {
              from: "images",
             localField: "_id",
              foreignField: "gameId",
              as: "images"
            }
        },
        {
            $lookup:
            {
              from: "developers",
             localField: "devId",
              foreignField: "_id",
              as: "developer"
            } 
        },
        {
            $lookup:
            {
              from: "publishers",
             localField: "pubId",
              foreignField: "_id",
              as: "publisher"
            } 
        }
     ])
}