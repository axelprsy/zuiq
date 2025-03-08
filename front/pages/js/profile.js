document.getElementById('id').innerText = `ID : ${localStorage.getItem('user_id')}`;
document.getElementById('username').innerText = `Nom d'utilisateur : ${localStorage.getItem('username')}`;
document.getElementById('email').innerText = `Email : ${localStorage.getItem('email')}`;

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

    await fetch("http://127.0.0.1:5000/user", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

    localStorage.clear();
    window.location.replace("/signup");
}

// MODAL

async function modal_modify_account() {

    const modal = document.getElementById("modal");
    const span = document.getElementsByClassName("close")[0];
    
    // Ouvrir le modal
    modal.style.display = "flex";

    // Fonction pour fermer le modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Fonction pour fermer le modal lorsque l'utilisateur clique en dehors de celui-ci
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};