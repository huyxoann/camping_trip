import $ from "jquery";


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

getDocs(usersCol)
    .then((snapshot) => {
        let users = []
        snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id })
        })
        console.log(users)
    })
    .catch(err => {
        console.error(err.message)
    })

// Form submit

const usersForm = document.querySelector("#usersForm")
const username = document.getElementById("username")
const password = document.getElementById("password")


usersForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    try{
        const addUsers = addDoc(usersCol, {
            username: username.value,
            password: password.value
        });
        console.log("Doc's id: ", addUsers.id)
    }catch(e){
        console.err("Error: ", e)
    }

})

