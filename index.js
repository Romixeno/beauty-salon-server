import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import fileUpload from "express-fileupload";
import session from "express-session";
import flash from "connect-flash";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { mongooseConnect } from "./config/database.js";
import securityRoute from "./ressources/securityRoute.js";
import serviceRoute from "./ressources/serviceRoute.js";
import preferenceRoute from "./ressources/preferenceRoute.js";
import remindRoute from "./ressources/remindRoute.js";
import payementRoute from "./ressources/payementRoute.js";
import employerRoute from "./ressources/employerRoute.js";
import taskRoute from "./ressources/taskRoute.js";
import searchRoute from "./ressources/searchRoute.js";
import statistiqueRoute from "./ressources/statistiqueRoute.js";
import managerRoute from "./ressources/managerRoute.js";
import appointmentRoute from "./ressources/appointmentRoute.js";
import sendEmailRoute from "./ressources/sendEmailRoute.js";

const app = express();

app.use(expressEjsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://salon-beauty-frontend-6qvx.vercel.app",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(fileUpload());
app.use(express.static(path.resolve("public")));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 3600 * 1000,
    },
  })
);
app.use(flash());

//middleware

app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.user = req.user ? req.user : null;

  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://salon-beauty-frontend-6qvx.vercel.app"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//connection a la base de donner

mongooseConnect().then(() => {
  app.use("/", securityRoute);
  app.use("/", sendEmailRoute);
  app.use("/", serviceRoute);
  app.use("/", preferenceRoute);
  app.use("/", remindRoute);
  app.use("/", appointmentRoute);
  app.use("/", managerRoute);
  app.use("/", employerRoute);
  app.use("/", payementRoute);
  app.use("/", employerRoute);
  app.use("/", taskRoute);
  app.use("/", searchRoute);
  app.use("/", statistiqueRoute);
  app.listen(10000, () => {
    console.log("Server listening...");
  });
});
