import $ from "jquery";
import { Carousel } from "bootstrap";

// Select all elements with the "i" tag and store them in a NodeList called "stars"
const stars = document.querySelectorAll(".stars i");
// Loop through the "stars" NodeList
stars.forEach((star, index1) => {
  // Add an event listener that runs a function when the "click" event is triggered
  star.addEventListener("click", () => {
    // Loop through the "stars" NodeList Again
    stars.forEach((star, index2) => {
      // Add the "active" class to the clicked star and any stars with a lower index
      // and remove the "active" class from any stars with a higher index
      index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
    });
  });
});



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app'

import {
  getFirestore, collection, getDocs, doc, addDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBbE0MdeaJ3YPTUTD9ziedq84ILqq2v8gg",
  authDomain: "campingtrip-9749d.firebaseapp.com",
  projectId: "campingtrip-9749d",
  storageBucket: "campingtrip-9749d.appspot.com",
  messagingSenderId: "116517977318",
  appId: "1:116517977318:web:587d5f1f48c278635ccf27",
  measurementId: "G-LXYQ209N6E"
};

// init firebase app
initializeApp(firebaseConfig)

// init services

const db = getFirestore()


// collection ref

const usersCol = collection(db, 'users')

// getDocs(usersCol)
//     .then((snapshot) => {
//         let users = []
//         snapshot.docs.forEach((doc) => {
//             users.push({ ...doc.data(), id: doc.id })
//         })
//         console.log(users)
//     })
//     .catch(err => {
//         console.error(err.message)
//     })

// Form submit



var usersForm = document.querySelector("#bookingForm")

var fullname = document.getElementById('nameInput');
var phoneNumber = document.getElementById('phoneNumberInput');
var campingDate = document.getElementById('datePicker');
var adultAmounts = document.getElementById('adultAmounts');
var childAmounts = document.getElementById('childAmounts');
var note = document.getElementById('note');



function createBookingOrder() {

  let bookingOrder = {
    fullname: fullname.value,
    phoneNumber: phoneNumber.value,
    campingDate: campingDate.value,
    adultAmounts: adultAmounts.value,
    childAmounts: childAmounts.value,
    note: note.value
  };
  const dateString = bookingOrder.campingDate;
  const timestamp = Date.parse(dateString);
  console.log(timestamp);
  console.log(bookingOrder);
}


usersForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // try{
  //     const addUsers = addDoc(usersCol, {
  //       fullname: fullname,
  //     });
  //     console.log("Doc's id: ", addUsers.id)
  // }catch(e){
  //     console.err("Error: ", e)
  // }
  createBookingOrder()

})


