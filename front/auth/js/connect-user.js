async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}
get_ip().then((ip) => {
    url = ip;
})

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
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
                document.getElementById("loginErrorMessage").innerText = "Le nom d'utilisateur ou le mot de passe est incorrect";
            }
        })
        .catch((error) => {
            console.error(error)
            document.getElementById("loginErrorMessage").innerText = "Le nom d'utilisateur ou le mot de passe est incorrect";
        });
});

