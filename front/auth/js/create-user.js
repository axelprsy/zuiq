document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    // RECUP FORMULAIRE
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    if (password !== confirm_password) {
        console.log("Les mots de passe ne correspondent pas");
        document.getElementById("error_message").innerText = "Les mots de passe ne correspondent pas";
    }else{
        // ADD BDD
        const formdata = new FormData();
        formdata.append("username", username);
        formdata.append("email", email);
        formdata.append("password", password);

        const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
        };

        fetch("http://127.0.0.1:5000/user", requestOptions)
        .then((response) => {
            if (!response.ok) {
            throw new Error('La réponse réseau était');
            }
            window.location.replace("profile.html");
            return response.text();
        })
        .then((result) => console.log(result))
        .catch((error) => {
            console.error('Erreur :', error);
            document.getElementById("error_message").innerText = "Le nom d'utilisateur ou l'email est déjà utilisé";
        })
        
    }


});


