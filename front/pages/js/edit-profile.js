document.getElementById('modal_username').value = `${localStorage.getItem('username')}`;
document.getElementById('modal_email').value = `${localStorage.getItem('email')}`;

document.getElementById("form_modifyacount").addEventListener("submit", function (e) {
    e.preventDefault();


    // JE RECUPERE LES INFOS DU FORMULAIRE ET L ID DE LUSER CONNECTÉ
    const user_id = localStorage.getItem('user_id');
    const username = document.getElementById("modal_username").value;
    const email = document.getElementById("modal_email").value;
    const password = document.getElementById("modal_password").value;

    const formdata = new FormData();
    formdata.append("user_id", user_id);
    formdata.append("username", username);
    formdata.append("email", email);

    // VERIF SI LE CHAMPS DU MOT DE PASSE EST VIDE
    if (password !== "") {
        formdata.append("password", password);
    }

    const requestOptions = {
    method: "PATCH",
    body: formdata,
    redirect: "follow"
    };

    fetch(`http://${url}:5000/user`, requestOptions)
    .then((response) => response.text() )
    .then((result) => {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        document.getElementById("modal_error_message").innerText = "Votre compte a bien été modifié";
        document.getElementById("modal_error_message").style.color = "green";
        location.reload()
    })
    .catch((error) => {
        console.error(error)
        document.getElementById("error_message").innerText = "Une erreur est survenue";
    })
});