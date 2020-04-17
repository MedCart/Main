var firebaseConfig = {
    apiKey: "AIzaSyAZyehPPW19bLeooksrHNkaNLY6woqqcsA",
    authDomain: "rashed-af2bc.firebaseapp.com",
    databaseURL: "https://rashed-af2bc.firebaseio.com",
    projectId: "rashed-af2bc",
    storageBucket: "rashed-af2bc.appspot.com",
    messagingSenderId: "82549544885",
    appId: "1:82549544885:web:844b632ec73e11bc3aebfc",
    measurementId: "G-S92VQXQYLN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL

$("#btn-login").click(function() {
    var email = $("#email").val();
    var password = $("#password").val();
    if (email != "" && password != "") {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Message : " + errorMessage);
        });
    } else {
        window.alert("Please fill out all fields.")
    }

});



$("#btn-signup").click(function() {
    var email = $("#email").val();
    var password = $("#password").val();
    var cpassword = $("#confirmpassword").val();
    if (email != "" && password != "" && cpassword != "") {
        if (password == cpassword) {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password);
            result.catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Message : " + errorMessage);
            });

        } else { window.alert("confirm password doesn't match"); }
    } else {
        window.alert("Please fill out all fields.");
    }

});

$("#btn-resetpassword").click(function() {
    var auth = firebase.auth();
    var email = $("#email").val();
    if (email != "") {
        auth.sendPasswordResetEmail(email).then(function() {
                window.alert("Email has been sent to you, Please check and verify");
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Message : " + errorMessage);
            });
    } else {
        window.alert("Please fill out your Email first.");
    }
});

$("#btn-logout").click(function() {
    firebase.auth().signOut();
});

$("#btn-update").click(function() {
    var phone = $("#phone").val();
    var bio = $("#bio").val();
    var pharmacyname = $("#pharmacyname").val();
    var fname = $("#firstname").val();
    var lname = $("#lastname").val();
    var place = $("#place").val();
    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);
    var n = "";
    if (phone != "" && bio != "" && fname != "" && lname != "" && place != "" && pharmacyname != "") {
        var userData = {
            "FirstName": fname,
            "LastName": lname,
            "Pharmacy": pharmacyname,
            "Phone": phone,
            "Bio": bio,
            "Place": place,
            "Medicine": n,
        };
        usersRef.set(userData, function(error) {
            if (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Message : " + errorMessage);
            } else {
                window.location.href = "MainPage.html";
            }
        })

    } else {
        window.alert("Please fill out your Data first.");

    }
});

$("#btn-add").click(function() {

    var Medicine = $("#Medicine").val();
    var pharmacyname = $("#pharmacyname").val();
    var userID = firebase.auth().currentUser.uid;
    var rootRef = firebase.database().ref().child("Users").child(userID).child("Medicine").child("List").child(Medicine);

    // var deepRef = usersRef.child("Pharmacy");

    if (Medicine != "") {
        var userData = {

            "List": Medicine,
        };

        rootRef.set(Medicine, function(error) {
            if (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Message : " + errorMessage);
            }
        })

    } else {
        window.alert("Please fill out your Data first.");

    }

});
$("#btn-del").click(function() {

    var Medicine = $("#Medicine").val();

    var userID = firebase.auth().currentUser.uid;
    var rootRef = firebase.database().ref().child("Users").child(userID).child("Medicine").child("List").child(Medicine);

    // var deepRef = usersRef.child("Pharmacy");

    rootRef.remove();
});



function switchView(view) {
    $.get({
            url: view,
            cache: false,
        })
        .then(function(data) {
            $("#container").html(data);
        });
}