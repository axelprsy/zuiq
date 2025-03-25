// Vérifie que l'utilisateur est connecté, sinon le redirige vers la page de connexion
if (localStorage.user_id === undefined) {
    window.location.replace("/login");
}