async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}
get_ip().then((ip) => {
    url = ip;
})

async function connect_user(username) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`http://${url}:5000/user?username=${username}`, requestOptions)
        .then((response) => response.json())
        .then((result) => { 
            const allinfo = result.res;
            localStorage.setItem("username", allinfo.username);
            localStorage.setItem("user_id", allinfo.user_id);
            localStorage.setItem("email", allinfo.email);
            window.location.replace("/profile");
        })    
}

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

        fetch(`http://${url}:5000/user`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                document.getElementById("error_message").innerText = "Une erreur est survenue";
                throw new Error('La réponse réseau était');
            }
            connect_user(username);
            return response.text();
        })
        .catch((error) => {
            console.error('Erreur :', error);
            document.getElementById("error_message").innerText = "Le nom d'utilisateur ou l'email est déjà utilisé";
        })
        
    }


});


