import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCTNiUqFuDgf7C7i3EH-3I6TkKjiImjgWQ",
  authDomain: "react-application-fd8c7.firebaseapp.com",
  databaseURL: "https://react-application-fd8c7.firebaseio.com",
  projectId: "react-application-fd8c7",
  storageBucket: "react-application-fd8c7.appspot.com",
  messagingSenderId: "226506911832"
};

var fire = firebase.initializeApp(config);

export default fire;
