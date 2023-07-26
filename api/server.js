const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./Routes/auth')
const userRoutes = require('./Routes/user')
const productRoute = require('./Routes/product')
const cartRoute = require('./Routes/cart')
const orderRoute = require('./Routes/order')
const stripeRoute = require('./Routes/stripe')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log('DBconnection successfull')).catch((err) => console.log(err))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../admin/public/upload')
      cb(null, '../ecommercewebsite/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })


const upload = multer({storage})

app.post('/api/upload', upload.single('file'), (req,res) => {
    res.status(200).json(req.file?.filename)
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/checkout', stripeRoute)


app.listen(process.env.PORT || 5000, () => {
    console.log('connected to backend');
})