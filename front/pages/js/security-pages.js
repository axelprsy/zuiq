// Si l'utilisateur n'est pas connecté, le redirige vers la page de connexion
if (localStorage.user_id === undefined) {
    window.location.replace("/login");
}