/**
 * Récupère l'adresse IP de l'utilisateur en effectuant une requête vers l'endpoint '/get_ip' pour savoir sur quelle ip envoyé les donnés.
 */
async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}
get_ip().then((ip) => {
    url = ip;
})

document.getElementById('id').innerText = `ID : ${localStorage.getItem('user_id')}`;
document.getElementById('username').innerText = `Nom d'utilisateur : ${localStorage.getItem('username')}`;
document.getElementById('email').innerText = `Email : ${localStorage.getItem('email')}`;
document.getElementById('nav-username').innerText = `${localStorage.getItem('username')}`;

function logout() {
    localStorage.clear();
    window.location.href = '/';
    window.location.replace("/login");
}

async function delete_my_account() {
    const formdata = new FormData();
    formdata.append("user_id", localStorage.getItem('user_id'));

    const requestOptions = {
        method: "DELETE",
        body: formdata,
        redirect: "follow"
    };

    await fetch(`https://api.zuiq.tech/user`, requestOptions)
        .then((response) => response.text())

    localStorage.clear();
    window.location.replace("/signup");
}

async function modal_modify_account() {

    const modal = document.getElementById("modal");
    const span = document.getElementsByClassName("close")[0];

    modal.style.display = "flex";

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};