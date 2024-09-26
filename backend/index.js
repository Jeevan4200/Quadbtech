const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcryptjs');

const cors = require("cors");
app.use(express.json());
app.use(cors());
const JWT_SECRET = 'your_jwt_secret_key';

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

app.get("/", (req, res) => {
  res.send("Express app is running");
});

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    // Corrected file reference
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// Serve static images
app.use("/images", express.static("upload/images"));

// Corrected POST route (removed extra space)
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`, // Corrected req.file reference
  });
});
 //schema for creating products
 const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
     new_price:{
        type:Number,
        required:true,
     }
     ,
     old_price:{
        type:Number,
        required:true,
     },
     date:{
        type:Date,
        default:Date.now,
     },
     available:{
type:Boolean,
default:true,

     },
 })
 const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures unique email addresses
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model('User', userSchema);

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
app.post("/addproduct",async (req,res)=>{
    let products = await Product.find({});
    let id ;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id =last_product.id+1;
    }else{
        id=1;
    }
const product = new Product({
    id:req.body.id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
}); 
await product.save();
console.log("saved");
res.json({
    success:true,
    name:req.body.name,

})
})
app.post('/removeproduct',async (req,res)=>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed");
  res.json({
    success:true,
    name:req.body.name
  })
}
)
app.get('/allproducts',async (req,res)=>{
  let products =  await Product.find({});
  console.log("All products Fetched");
  res.send(products);
})
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
    });

    // Save user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Log values for debugging
    console.log('User from database:', user);
    console.log('Password from request:', password);
    console.log('Hashed password from database:', user.password);

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on Port " + port);
  } else {
    console.log("Error: " + error);
  }

});
