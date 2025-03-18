async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}
get_ip().then((ip) => {
    url = ip;
})

// FONCTION POUR HASH LE PASSWORD
async function hashPassword(password) {
    const hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hash;
  }
  
document.getElementById("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // Hash le password recupéré par le form
    const password_hash = await hashPassword(password);

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    // Recupere l'user avec son username
    fetch(`http://${url}:5000/user?username=${username}`, requestOptions)
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
                document.getElementById("error_message").innerText = "Le nom d'utilisateur ou le mot de passe est incorrect";
            }
        })
        .catch((error) => {
            console.error(error)
            document.getElementById("error_message").innerText = "Le nom d'utilisateur ou le mot de passe est incorrect";
        });
});

