var firebaseConfig = {
    apiKey: "AIzaSyBkwaL-ecxbdG3XewyXOGRSJTDV2SGwJZU",
    authDomain: "medcart-9d8bb.firebaseapp.com",
    databaseURL: "https://medcart-9d8bb.firebaseio.com",
    projectId: "medcart-9d8bb",
    storageBucket: "medcart-9d8bb.appspot.com",
    messagingSenderId: "986337751125",
    appId: "1:986337751125:web:dc9ffcdff3e2b0be9e64dc",
    measurementId: "G-RRKQMKBG62"
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
    var serial = $("#serial").val();
    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);
    var MedRef = firebase.database().ref().child("Pharmacies").child(pharmacyname); 
    var ltlng=" ";
    
    if (phone != "" && bio != "" && fname != "" && lname != "" && serial != "" && pharmacyname != "" && ltlng!="" ) {
        var userData = {
            "FirstName": fname,
            "LastName": lname,
            "Pharmacy": pharmacyname,
            "Phone": phone,
            "Bio": bio,
            "Serial": serial,
            "latlng":ltlng
        };

        usersRef.set(userData, function(error) {
            if (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Message : " + errorMessage);
            } else {
                window.location.href = "index.html";
            }
        })

    } else {
        window.alert("Please fill out your Data first.");

    }
    if (pharmacyname != "") {
        MedRef.set(pharmacyname, function(error) {
            if (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Message : " + errorMessage);
            } else {
                window.location.href = "index.html";
            }
        })

    } else {
        window.alert("Please fill out your Data first.");

    }
});



 $("#btn-del").click(function() {
            //var pvalue = $("#phar").val();
            var Medicine = $("#Medicine").val();

            var userId = firebase.auth().currentUser.uid;
            var pharmacyname = firebase.database().ref().child("Users").child(userId);
            pharmacyname.child("Pharmacy").on('value', function(snapshots) {
                var pvalue = snapshots.val();

                var rootRef = firebase.database().ref().child('/Pharmacies/' + pvalue).child(Medicine);

                if (Medicine != "") {


                    rootRef.remove();
                      
                    

                } 
            }); });

        


function switchView(view) {
    $.get({
            url: view,
            cache: false,
        })
        .then(function(data) {
            $("#container").html(data);
        });
}
