// Récupère l'adresse IP de l'utilisateur en effectuant une requête vers l'endpoint '/get_ip' pour savoir sur quelle ip envoyé les donnés.
async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}
get_ip().then((ip) => {
    url = ip;
})

// Hash le mot de passe en SHA256 pour vérifier la correspondance avec la base de données
async function hashPassword(password) {
    const hash = CryptoJS.SHA256(password);
    return hash.toString(CryptoJS.enc.Hex);
}

// Lorsque l'utilisateur clique sur le bouton de connexion, vérifie si les informations sont correctes dans la bdd puis l'authentifie
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const password_hash = await hashPassword(password);

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`http://${url}:5000/user?username=${username}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const allinfo = result.res;
            const password_form = result.res.password;
            if (password_hash === password_form) {
                localStorage.setItem("username", allinfo.username);
                localStorage.setItem("user_id", allinfo.user_id);
                localStorage.setItem("email", allinfo.email);
                window.location.replace("/profile");
            } else {
                document.getElementById("loginErrorMessage").innerText = "Le nom d'utilisateur ou le mot de passe est incorrect";
            }
        })
        .catch((error) => {
            console.error(error)
            document.getElementById("loginErrorMessage").innerText = "Le nom d'utilisateur ou le mot de passe est incorrect";
        });
});

