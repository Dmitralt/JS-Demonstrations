const sqlite3 = require("sqlite3").verbose();
const {Sequelize} =require ('sequelize')
const express = require("express");
const User=require('./User')
const Moovie=require('./moovie')
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const SessionStore = require('express-session-sequelize')(expressSession.Store);
 const upload =require('express-fileupload')
const sequelize = require('./database')
var session = require("express-session");
const { signedCookie } = require("cookie-parser");

var md5 = require('md5');



const MESSAGES={

   ACCSESSERROR:"accsess error",
    DO_AUTORISATION:"pls, do autorisation"
}

/*
const myDatabase = new Sequelize('database', 'username', 'password', {
    dialect:'sqlite',
    host:'./dev.sqlite'
});
 
const sequelizeSessionStore = new SessionStore({
    db: myDatabase,
});









sequelize.sync().then(()=> console.log('db is ready'))
const app = express();
app.use(cookieParser());
app.use(expressSession({
    secret: 'keep it secret, keep it safe.',
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
}));*/







/************************************************** */


sequelize.sync().then(()=> console.log('db is ready'))
const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(upload({}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


this.store = new SessionStore({
    db: sequelize
});

async function Onstart()
{
    
    let su=await User.findOne({where:{id:777}})
    if(su==null)
    {
        
        //console.log("superuser=",await User.findOne({where:{id:777}}))
        await User.create(
            {
               "username":"superuser","password":md5("password"),id:777
            }
        );
    }
}

Onstart();

/*
this._express.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false
    },
    store: this.store,
    expires: new Date(Date.now() + (60 * 60 * 24 * 7 * 1000)),
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    sameSite: true
}));*/

app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false
    },
    store: this.store,
    expires: new Date(Date.now() + (60 * 60 * 24 * 7 * 1000)),
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    sameSite: true
}));


app.use(function (req, res, next) {

    let myreq= req

    //console.log("====================",req.body)
   // next()

    
    if (myreq.url == "/login"||myreq.url == "/logoff"||myreq.url == "/login.html"
    ||myreq.url == "/index.js"
    ||myreq.url == "/tested.js") {

        next();
    }
    
    else if (myreq.session.userid != undefined) { 
        
        
        next(); }
    else {
        //next();
        res.sendFile(__dirname+"/login.html")
    }


});


app.get('/login.html',(req,res)=>{
    console.log("Getfile")
    res.sendFile(__dirname+"/login.html")
   
})

app.get('/index.html',(req,res)=>{
    console.log("Getfile")
    res.sendFile(__dirname+"/index.html")
   
})

app.get('/tested.js',(req,res)=>{
    console.log("Getfile")
    res.sendFile(__dirname+"/tested.js")
   
})


app.get('/index.js',(req,res)=>{
    console.log("Getfile")
    res.sendFile(__dirname+"/index.js")
   
})
/************************************************** */

//sequelize.sync().then(()=> console.log('db is ready'))
//const app = express();
//app.use(express.json())





app.post('/login',async (req,res)=>{
    

    console.log("--------------------",req.session)
    let username = req.body.username;
    let password = md5(req.body.password)

   
    
    
    let curentuser=await User.findOne({where:{username:username,password:password}})

    

    console.log("session=",curentuser,username,password)
    if(curentuser!=null)
    {
        req.session.userid=curentuser.id
        //req.session.save();
        //res.send(curentuser)
        res.sendFile(__dirname+"/index.html")
    }
    else
    {
        res.send(MESSAGES.DO_AUTORISATION)
    }

})
app.get('/login',async (req,res)=>{

    console.log("--------------------",req.session)
    if( req.session.userid!=undefined){

    let curentuser=await User.findOne({where:{id: req.session.userid}})
    if(curentuser!=null)
    {res.send(curentuser)}}
    else
    {
        res.send("MESSAGES.ACCSESSERROR")
    }
})

app.post('/logoff',async (req,res)=>{
    req.session.userid=undefined
    res.sendFile(__dirname+"/login.html")

})









/********************USERS REQUESTS********************* */


app.post('/users',async(req,res)=>{

    req.body.password=md5(req.body.password)
    await User.create(req.body);
    res.send("user is insert")
})

app.get('/users',async (req,res)=>{

    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&",req.body)
    const users= await User.findAll();
    
    res.send(users)
})

app.get('/users/:id',async (req,res)=>{
    const requestedid =req.params.id;
    const user= await User.findOne({where:{id:requestedid}});
    res.send(user)
})
app.put('/users/:id',async (req,res)=>{

    

    const requestedid =req.params.id;
    const user= await User.findOne({where:{id:requestedid}});

    if(req.body.username!=undefined){user.username = req.body.username;}
    if(req.body.username!=undefined){user.password = md5(req.body.password);}
    await user.save()
    
    const newuser= await User.findOne({where:{id:requestedid}});
    res.send(newuser)
})

app.delete('/users/:id',async (req,res)=>{
    const requestedid =req.params.id;
    await User.destroy({where:{id:requestedid}});
    res.send(requestedid.toString()+" was deleted")
})
/********************MOOVIES REQUESTS********************* */



app.post('/moovies',async(req,res)=>{

    let message= "moovie is insert"
    
    let newmovie={

        Title:req.body.Title,
        Release_Year:req.body.Release_Year,
        Format:req.body.Format,
        Stars:req.body.Stars
    }
    console.log("newmovie",newmovie)
    await Moovie.create(newmovie).catch(function(error){
     //console.log("===============\n",error.errors["0"]["value"],error.errors["0"]["validatorArgs"],"\n=========================") 
    
    
     message="Validation ERROR"
})
    
    res.send(message)
})

app.get('/moovies',async (req,res)=>{
    console.log("+++++",req.query)
    let moovies=[]
    if(req.query.Title!=undefined)
    {
        
        moovies= await Moovie.findAll({where:{"Title":req.query.Title}});
    }else if(req.query.Actor!=undefined)
    {
       
        let allmoovies= await Moovie.findAll()    
         


        moovies = allmoovies.filter(element => element.Stars.indexOf(req.query.Actor)!=-1);
       
    }    
    else if(req.query.sortby=="Title")
    {moovies= await Moovie.findAll({order:["Title"]});}
    else
    {
        moovies= await Moovie.findAll();
    }
    
    res.send(moovies)
})

app.get('/moovies/:id',async (req,res)=>{
    const requestedid =req.params.id;
    const moovie= await Moovie.findOne({where:{id:requestedid}});
    
    res.send(moovie)
})
app.delete('/moovies/:id',async (req,res)=>{
    const requestedid =req.params.id;
    await Moovie.destroy({where:{id:requestedid}});
    res.send(requestedid.toString()+" was deleted")
})
app.delete('/moovies_deleteall',async (req,res)=>{
    const requestedid =req.params.id;
    await Moovie.destroy({where:{}});
    res.send(" was deleted")
})


app.put('/moovies/:id',async (req,res)=>{
    const requestedid =req.params.id;
    let validationfailed=false
    const moovie= await Moovie.findOne({where:{id:requestedid}});

    if(req.body.Title!=undefined)
    {
        moovie.Title=req.body.Title
    }
    if(req.body.Release_Year!=undefined)
    {
        moovie.Release_Year=req.body.Release_Year
    }
    if(req.body.Format!=undefined)
    {
        moovie.Format=req.body.Format
    }
    if(req.body.Stars!=undefined)
    {
        moovie.Stars=req.body.Stars
    }

    await moovie.save().catch(function(error){ validationfailed=true })
    
    
    if(validationfailed)
    {
        const answer ="validation failed"
        res.send(answer)
    }
    else
    {
        const answer= await Moovie.findOne({where:{id:requestedid}});
        res.send(answer)
    }
})



app.post('/downloadlist',async(req,res)=>{
    req.setEncoding('utf8')
    console.log("++++++++++++++++",req.files)
    let arr=req.files.file.data.toString().split("\n\n")
    console.log(arr)
    for(let i in arr)
    {
    let obj=arr[i].split("\n")
   
    obj = obj.map(element => {
        let returnable=[]
        let helpobj=element.split(":")

        if(helpobj[0]=="Release Year")
        {
            helpobj[0]="Release_Year"
            helpobj[1]=parseInt(helpobj[1])
        }


        if(helpobj[0]=="Format")
        {
            helpobj[1]= helpobj[1].replace(" ","")
        }
        if(helpobj[0]=="Title")
        {
            if(helpobj[1][0]==" ")
            helpobj[1]=helpobj[1].slice(1)
        }

        returnable[helpobj[0]]=helpobj[1]

        if(helpobj[0]=="Stars")
        {
           
            if(returnable[helpobj[0]][0]==" ")
            {
                
                returnable[helpobj[0]]= returnable[helpobj[0]].slice(1)
            }
            returnable[helpobj[0]]=returnable[helpobj[0]].split(", ")
        }
        return returnable
    })
   console.log("---")
   let newobj=[]
   for(let el of obj)
   {
    
    newobj[Object.keys(el)[0]]=el[Object.keys(el)[0]]
   }
    if(newobj.Title!=undefined)
    {
    let newmovie={

        Title:newobj.Title,
        Release_Year:newobj.Release_Year,
        Format:newobj.Format,
        Stars:newobj.Stars
    }

   await Moovie.create(newmovie).catch(function(error){})

    }


    console.log(newobj)
}

    console.log("++++++++++++++++")


    res.send("list was added")

})





app.get('/*',(req,res)=>{
   
    if (req.session.userid == undefined) 
    {res.sendFile(__dirname+"/login.html")}
    else
    {
        res.sendFile(__dirname+"/index.html")
    }
   
})










app.listen(3000, () => {
    console.log("app is running");
  });

