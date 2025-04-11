const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const oauthRoutes = require("./routes/oauth");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const { auth, requiresAuth } = require('express-openid-connect');
const { default: axios } = require("axios");

dotenv.config();

const app = express();
app.use(express.json());  // middleware to pass json object

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: process.env.ClientID,
  issuerBaseURL: 'https://accounts.google.com',
  // issuerBaseURL: 'https://google.com',
  secret: process.env.ClientSecret,
  // secret: process.env.AUTH_SECRET,
};
if (!config.secret) {
  console.error("❌ AUTH_SECRET is missing in .env!");
  process.exit(1);
}
// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  )
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

// app.use(express.bodyParser());
// app.use(express.urlencoded({extended: true}))

// Routes
app.use("/auth", authRoutes);
app.use("/newAuth", oauthRoutes);
// app.use("/profile", profileRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

// app.use(
//   auth({
//     afterCallback: (req, res, session) => {
//       const claims = jose.JWT.decode(session.id_token); // using jose library to decode JWT
//       if (claims.org_id !== 'Required Organization') {
//         throw new Error('User is not a part of the Required Organization');
//       }
//       return session;
//     },
//   })
// );
app.get("/redirect", async (req, res) => {
  const code = req.query.code;

  const { data } = await axios.post(
    `https://oauth2.googleapis.com/token`,
    {
      code,
      client_id: process.env.ClientID,
      client_secret: process.env.ClientSecret,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    }
  );

  const userInfo = await axios.get(
    `https://www.googleapis.com/oauth2/v2/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${data.access_token}`
      }
    }
  );

  const user = userInfo.data;

  // Now either save user to DB or find existing
  // Then generate JWT and send it to frontend
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, user });
});


// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("DB connection failed", err));

