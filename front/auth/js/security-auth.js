// Vérifie si l'user est connecté, si oui il est redirigé vers le dashboard
if (localStorage.user_id !== undefined) {
    window.location.replace("/dashboard");
}