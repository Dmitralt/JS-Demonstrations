const {Model, DataTypes, ARRAY, STRING} = require('sequelize');
const sequelize = require('./database')

class Moovie extends Model {}

Moovie.init({
    Title: {
        type:DataTypes.STRING
    },
Release_Year: {
    type:DataTypes.NUMBER
},

Format:{
    type:DataTypes.STRING,
    validate: {
        isIn:  [['VHS', 'DVD','Blu-Ray']]
       
        //isIn:  ['VHS', 'DVD','Blu-Ray']
          
}
},
Stars:{
    type:DataTypes.JSON
}

},{
    sequelize,
    modelName:'moovie',
    timestamps:false
})

module.exports = Moovie;

/*{
"Title": "Casablanca",
"Release_Year": 1942,
"Format": "DVD",
"Stars": {"Humphrey Bogart", "Ingrid Bergman"}}
*/