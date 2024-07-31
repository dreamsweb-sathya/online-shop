const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fileURLToPath = require("url");
const userRouter = require('./Routes/UserRoute');
const postRouter = require('./Routes/PostsRoutes')
// const filename = fileURLToPath(meta.url);
// const dirname = path.dirname(filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join('', 'public/assets')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cd(null, file.originalname)
    }
});

const upload = multer({ storage });

app.use('/auth/register', upload.single("picture"), userRouter);
app.use('/auth', userRouter);
app.use('/users', userRouter);
app.use('/post', postRouter)

mongoose.connect(process.env.URI).then(() => {
    console.log('DB connected');
})

app.listen(5000, console.log('app running'))
