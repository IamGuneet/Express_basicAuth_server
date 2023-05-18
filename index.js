const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const USERS =[]

const QUESTIONS = [{
    title:'largest number',
    description:'Give the largest number from the array',
    testCases: [{
        input:"[1,2,3,4,5]",
        output:"5" 
    }]

}]

const SUBMISSION = []


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
// signup page request
app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})
// login page request
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+"/login.html")
})
// signup data storing
app.post('/signup',(req,res)=>{
    let data = {
        name:req.body.name,
        password:req.body.password
                }
    USERS.push(data)
    res.status(200)
    res.redirect('/')
    console.log(USERS);
})
// login data checking and redirecting accordingly
app.post('/login',(req,res)=>{
    let match = false
    const input = {
        name:req.body.name,
        password:req.body.password
                }
    SUBMISSION.push(input)
    console.log(SUBMISSION);
    USERS.forEach(element => {
        if(element.name == input.name && element.password == input.password){
            res.status(200)
            match = true
            res.sendFile(__dirname +"/auther.html")
        }
    });
    if(match == false){
        res.status(404)
        res.redirect("/")
    }
})
app.get('/questions',(req,res)=>{
    res.json({
        'questions':QUESTIONS
    })
})
app.get('/addQuestions',(req,res)=>{
    res.sendFile(__dirname+'/submission.html')
})
app.post('/submission',(req,res)=>{
    const data = res.body
    SUBMISSION.push(data)
    res.json({
        'status':'uploading'
    })
})

app.listen(port,()=>{
    console.log(`running on ${port }`);
})