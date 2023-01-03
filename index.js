//  pakachegason  можно использовать "type":"module" чтоб нод использовал import
import express from 'express' 

import mongoose from 'mongoose'
import {registerValidathion , loginValidathion , postCreateValidathion} from './validathions/auth.js'
import {UserController,POstController,DataInfoController} from './controllers/index.js'
import cors from 'cors'
import multer from 'multer'
import {handleValidathionErrors,checkAuth} from './utils/index.js'
import fs from 'fs'


mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.fv0b65d.mongodb.net/userList?retryWrites=true&w=majority',
).then(() => {
    console.log('DB OKEJ')
}).catch((err)=>console.log('Db error',err))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
          fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
      },
      filename: (_, file, cb) => {
        cb(null, file.originalname);
      },
})

const upload = multer({ storage })
app.use(express.json())
app.use(cors())
app.options('*' , cors())




app.get('/text' ,DataInfoController.getInfo)

app.get('/tags' , POstController.getLastTags)

app.post('/auth/login', loginValidathion, handleValidathionErrors, UserController.login  )

app.post('/auth/register',registerValidathion,handleValidathionErrors  , UserController.register)

app.get('/auth/me', checkAuth, UserController.getMe )

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});
app.use('/uploads' , express.static('uploads'))


app.get('/posts/tags' , POstController.getLastTags)
app.get('/posts', POstController.getAll)
app.get('/posts/:id', POstController.getOne)
app.post('/posts',checkAuth ,postCreateValidathion,handleValidathionErrors,POstController.create)
app.delete('/posts/:id', checkAuth, POstController.remove)
app.patch('/posts/:id',
    checkAuth,
    handleValidathionErrors ,
    POstController.update)


app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("Server OK")
});




