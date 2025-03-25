async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}
get_ip().then((ip) => {
    url = ip;
})

async function hashPassword(password) {
    // Hachage SHA-256 avec CryptoJS
    const hash = CryptoJS.SHA256(password);
    // Convertir en chaîne Hexadécimale
    return hash.toString(CryptoJS.enc.Hex);
}
  
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const password_hash = await hashPassword(password);

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    // Recupere l'user avec son username
    fetch(`https://api.zuiq.tech/user?username=${username}`, requestOptions)
        .then((response) => response.json())
        .then((result) => { 
            const allinfo = result.res;
            const password_form = result.res.password;
            if (password_hash === password_form){
                localStorage.setItem("username", allinfo.username);
                localStorage.setItem("user_id", allinfo.user_id);
                localStorage.setItem("email", allinfo.email);
                window.location.replace("/profile");
            }else{
                document.getElementById("loginErrorMessage").innerText = "Le nom d'utilisateur ou le mot de passe est incorrect";
            }
        })
        .catch((error) => {
            console.error(error)
            document.getElementById("loginErrorMessage").innerText = "Le nom d'utilisateur ou le mot de passe est incorrect";
        });
});

