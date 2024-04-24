const form = document.getElementById('form');
const username = document.getElementById('username');
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
const dob = document.getElementById('birthday');
const gender = document.querySelector('input[name="Gender"]:checked');
const address = document.getElementById('address');
const state = document.getElementById('state');
const city = document.getElementById('inputDistrict');
const pincode = document.getElementById('pincode');


//add event
form.addEventListener('submit', (event) => {
    event.preventDefault();
    validate();
})

const sendData = (sRate, count) => {
    if (sRate === count) {
        Swal.fire({
            title: "Welcome!",
            text: "Registration Successful!",
            icon: "success"
        });
    }
}


//for final data valiadtion
const successMsg = () => {
    let inGroup = document.getElementsByClassName('input-group');
    let count = inGroup.length - 1;
    for (var i = 0; i < inGroup.length; i++) {
        if (inGroup[i].className === "input-group success") {
            let sRate = 0 + i;
            sendData(sRate, count);
        }
        else {
            return false;
        }
    }
}


//define the validate function
const validate = () => {
    const usernameVal = username.value.trim();
    const nameVal = fullname.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();
    const addressVal = address.value.trim();
    const stateVal = address.value.trim();
    const pincodeVal = pincode.value.trim();


    //validate username
    if (usernameVal === "") {
        setErrorMsg(username, 'Username cannot be emtpy!')
    }
    else if (usernameVal.length <= 3) {
        setErrorMsg(username, 'Username should contain minimum 3 characters.')
    }
    else {
        setSuccessMsg(username);
    }

    //full name validation
    const fullNameRegex = /^[a-zA-Z\s]+$/;
    if (nameVal === "") {
        setErrorMsg(fullname, 'Full name cannot be empty!');
    }
    else if (!fullNameRegex.test(nameVal)) {
        setErrorMsg(fullname, 'Full name can\'t contain digits or special characters!')
    }
    else {
        setSuccessMsg(fullname);
    }

    //email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailVal === "") {
        setErrorMsg(email, 'Email cannot be empty!');
    }
    else if (!emailRegex.test(emailVal)) {
        setErrorMsg(email, 'Not a valid Email!');
    }
    else {
        setSuccessMsg(email);
    }

    //password validation
    if (passwordVal === "") {
        setErrorMsg(password, 'Password cannot be empty!');
    }
    else if (passwordVal.length < 6) {
        setErrorMsg(password, 'Password should be of minimum 6 digits!');
    }
    else {
        setSuccessMsg(password);
    }

    //cpassword validation
    if (cpasswordVal === "") {
        setErrorMsg(cpassword, 'Confirm Password cannot be empty!');
    }
    else if (cpasswordVal != passwordVal) {
        setErrorMsg(cpassword, 'Confirm password and password are not equal!');
    }
    else {
        setSuccessMsg(cpassword);
    }

    //address validation
    if (addressVal === "") {
        setErrorMsg(address, 'Address cannnot be empty!');
    }
    else {
        setSuccessMsg(address);
    }

    //pincode validation
    if (pincodeVal === "") {
        setErrorMsg(pincode, 'Pincode cannot be empty!');
    }
    else if (pincodeVal.length != 6) {
        setErrorMsg(pincode, 'Pincode should be of 6 digits!');
    }
    else if (isNaN(pincodeVal)) {
        setErrorMsg(pincode, 'Pincode should contain only digits!');
    }
    else {
        setSuccessMsg(pincode);
    }
    successMsg();

}

function setErrorMsg(input, errorMsg) {
    const inputGroup = input.parentElement;
    const small = inputGroup.querySelector('small');
    inputGroup.className = "input-group error";
    small.innerText = errorMsg;
}

function setSuccessMsg(input) {
    const inputGroup = input.parentElement;
    inputGroup.className = "input-group success";
}

const allValidationsSuccessful = () => {
    let inGroup = document.getElementsByClassName('input-group');
    for (var i = 0; i < inGroup.length; i++) {
        if (inGroup[i].className !== "input-group success") {
            return false; // If any validation fails, return false
        }
    }
    return true; // All validations are successful
}

//

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault();

        if (allValidationsSuccessful()) {

            var name = document.getElementById("name").value;
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            var email = document.getElementById("email").value;
            var dob = document.getElementById("birthday").value;
            var gender = document.querySelector('input[name="Gender"]:checked') ? document.querySelector('input[name="Gender"]:checked').value : "";
            var address = document.getElementById("address").value;
            var city = document.getElementById("inputDistrict").value;
            var pincode = document.getElementById("pincode").value;
            var state = document.getElementById("state").value;


            var user = {
                name: name,
                username: username,
                password: password,
                email: email,
                dob: dob,
                gender: gender,
                address: address,
                city: city,
                pincode: pincode,
                state: state
            };


            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://127.0.0.1:5500", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {

                    console.log(xhr.responseText);
                }
            };


            var userJSON = JSON.stringify(user);

            // Send the POST request with user data
            xhr.send(userJSON);


            var users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));


            window.location.href = "data-list.html";
        }
    });
});