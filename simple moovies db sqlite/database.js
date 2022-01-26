const {Sequelize} =require ('sequelize')

const sequelize= new Sequelize("cinema-db",'user','password',{
    dialect:'sqlite',
    host:'./dev.sqlite'
})

module.exports=sequelize;