import $ from "jquery";
import Swal from "sweetalert2";

import "bootstrap";

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

const usersCol = collection(db, 'orders')

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



var usersForm = document.querySelector("#bookingForm")

var fullname = document.getElementById('nameInput');
var phoneNumber = document.getElementById('phoneNumberInput');
var campingDate = document.getElementById('datePicker');
var adultAmounts = document.getElementById('adultAmounts');
var childAmounts = document.getElementById('childAmounts');
var note = document.getElementById('note');



function createBookingOrder() {
  var bookingOrder = {}
  return bookingOrder = {
    fullname: fullname.value,
    phoneNumber: phoneNumber.value,
    campingDate: campingDate.value,
    adultAmounts: adultAmounts.value,
    childAmounts: childAmounts.value,
    note: note.value
  };
}
function showConfirmInfo(bookingOrder) {
  document.querySelector('.fullnameText').innerHTML = bookingOrder.fullname
  document.querySelector('.phoneNumberText').innerHTML = bookingOrder.phoneNumber
  document.querySelector('.campingDateText').innerHTML = bookingOrder.campingDate
  document.querySelector('.adultsText').innerHTML = bookingOrder.adultAmounts
  document.querySelector('.childText').innerHTML = bookingOrder.childAmounts ? bookingOrder.childAmounts : "0"
  document.querySelector('.noteText').innerHTML = bookingOrder.note ? bookingOrder.note : "Không có"
}

var bookingModalE = document.querySelector('#bookingModal')

var confirmFormE = document.querySelector('#confirmForm')
confirmFormE.addEventListener('submit', function (e) {
  e.preventDefault()
  var xacNhanSubmitBtnE = document.querySelector('#xacNhanSubmitBtn')
  var cancelConfirmBtnE = document.querySelector('#cancelConfirmBtn')
  var loadingBtnE = document.querySelector('#loadingBtn')

  cancelConfirmBtnE.classList.add('disabled')
  xacNhanSubmitBtnE.parentNode.replaceChild(loadingBtnE, xacNhanSubmitBtnE);
  loadingBtnE.classList.remove('d-none')
  if (addOrder(createBookingOrder())) {
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 5000)
    Swal.fire({
      title: 'Đăng kí thành công!',
      text: 'Chúng tôi sẽ liên hệ bạn sớm với bạn sớm thôi. Thời gian liên hệ có thể ngoài giờ hành chính.',
      icon: 'success',
      confirmButtonText: "Ok!!!"
    })

    //  $('confirmModal').modal('hide')
  }
})

function addOrder(bookingOrder) {
  var docRef = null
  return docRef = addDoc(collection(db, "orders"), bookingOrder)
}

// Validate form
function Validator(options) {

  var formElement = document.querySelector(options.form)

  var selectorRules = {}

  function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
    var errorMessage
    var rules = selectorRules[rule.selector]

    for (var i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value)
      if (errorMessage) break
    }

    if (errorMessage) {
      showError(errorElement, errorMessage)
    } else {
      showNotError(errorElement)
    }

    return !errorMessage
  }

  function showError(errorElement, errorMessage) {
    errorElement.innerText = errorMessage
  }
  function showNotError(errorElement) {
    errorElement.innerText = ''
  }


  if (formElement) {

    formElement.onsubmit = function (e) {
      e.preventDefault()

      var isFormValid = true

      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector)
        var isValid = validate(inputElement, rule)

        if (!isValid) {
          isFormValid = false
        }
      })

      if (isFormValid) {
        if (typeof options.onSubmit === 'function') {
          formElement.onsubmit = options.onSubmit
        }
      } else {
      }
    }


    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector)
      var errorElement = inputElement.parentElement.querySelector('.form-message')

      // Lưu rules cho mỗi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test)
      } else {
        selectorRules[rule.selector] = [rule.test]
      }

      if (inputElement) {
        inputElement.onblur = function () {
          validate(inputElement, rule)
        }

        inputElement.oninput = function () {
          showNotError(errorElement)
        }
      }
    })

  }

}

Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : 'Vui lòng nhập trường này'
    }
  }
}

Validator.isRequiredWithMessage = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message
    }
  }
}

Validator.isPositive = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      value = Number(value)
      return value > 0 ? undefined : 'Số người phải là số dương'
    }
  }
}

Validator.isValidatedDate = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return Date.parse(value) > Date.now() ? undefined : 'Vui lòng nhập ngày hợp lệ'
    }
  }
}
// Validator của form Booking
Validator({
  form: '.bookingForm',
  errorSelector: '.form-message',
  rules: [
    Validator.isRequiredWithMessage('#nameInput', 'Vui lòng nhập đầy đủ tên'),
    Validator.isRequiredWithMessage('#phoneNumberInput', 'Vui lòng nhập số điện thoại'),
    Validator.isRequired('#datePicker'),
    Validator.isValidatedDate('#datePicker'),
    Validator.isRequiredWithMessage('#adultAmounts', 'Vui lòng nhập trường này'),
    Validator.isPositive('#adultAmounts'),
  ],
  onSubmit: function (e) {
    e.preventDefault()
    const submitBtnE = document.querySelector('#submitBtn')
    submitBtnE.setAttribute('data-bs-toggle', 'modal')
    submitBtnE.setAttribute('data-bs-target', '#confirmModal')
    submitBtnE.click()
    var bookingOrder = createBookingOrder()
    showConfirmInfo(bookingOrder)
  }
})

// Select all elements with the "i" tag and store them in a NodeList called "stars"
const stars = document.querySelectorAll(".stars i");

// ---- ---- Stars ---- ---- //
stars.forEach((star, index1) => {
  star.addEventListener('click', () => {
    console.log("")
    stars.forEach((star, index2) => {
      // ---- ---- Active Star ---- ---- //
      index1 >= index2
        ? star.classList.add('active')
        : star.classList.remove('active');
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Select all elements with the "i" tag and store them in a NodeList called "stars"
  const stars = document.querySelectorAll(".stars i");

  // ---- ---- Stars ---- ---- //
  stars.forEach((star, index1) => {
    star.addEventListener('click', () => {
      console.log("")
      stars.forEach((star, index2) => {
        // ---- ---- Active Star ---- ---- //
        index1 >= index2
          ? star.classList.add('active')
          : star.classList.remove('active');
      });
    });
  });
});

var viewDVElement = document.querySelector('.view_dich_vu')
viewDVElement.addEventListener('click', function () {
  const liveToastE = document.getElementById('liveToast')
  var toast = new bootstrap.Toast(liveToastE)
  toast.show()
})









