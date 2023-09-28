import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import bodyParser from 'body-parser';
const app = express();

const firebaseConfig = {
    apiKey: "AIzaSyC6Ch4_1iDUXU7rx-UoBtf_W2ZaPepz5EI",
    authDomain: "remainder-bot-82d2d.firebaseapp.com",
    projectId: "remainder-bot-82d2d",
    storageBucket: "remainder-bot-82d2d.appspot.com",
    messagingSenderId: "173867350381",
    appId: "1:173867350381:web:b32c26acae5ea3d56a8264",
    measurementId: "G-B63KVZD99E"
};

const app1 = initializeApp(firebaseConfig);
const auth = getAuth(app1);
const db = getFirestore(app1);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.get('/welcome', (req, res) => {
  res.sendFile(__dirname + '/public/' + 'welcome.html');
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/' + 'signup.html');
});

app.post('/signupSubmit', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed up:', user);
      res.sendFile(__dirname + '/public/' + 'login.html');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Signup error:', errorCode, errorMessage);
    });
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/' + 'login.html');
});

app.post('/loginSubmit', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed in:', user);
      res.sendFile(__dirname + '/public/' + 'index.html');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Login error:', errorCode, errorMessage);
    });
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/' + 'index.html');
});

app.listen(3001, () => {
  console.log("Listening at port 3001");
});
