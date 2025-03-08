// FONCTION POUR HASH LE PASSWORD
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
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
    fetch(`http://127.0.0.1:5000/user?username=${username}`, requestOptions)
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

