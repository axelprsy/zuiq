// Récupère l'adresse IP de l'utilisateur en effectuant une requête vers l'endpoint '/get_ip' pour savoir sur quelle ip envoyé les donnés.
async function get_ip() {
  const response = await fetch('/get_ip');
  const data = await response.json();
  return data["ip"];
}

const user_id = localStorage.getItem("user_id");
document.getElementById('nav-username').innerText = `${localStorage.getItem('username')}`;

// Rediriige l'utilisateur vers la page de lancement de session de quiz
function startSession(quizz_id) {
  window.location.href = `/start-my-quizz?quizz_id=${quizz_id}`;
};

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

// Quand la fenetre est chargée, récupère les quiz de l'utilisateur connecté
window.onload = async function () {
  await get_ip().then((ip) => {
    url = ip;
  })
  fetch(`http://${url}:5000/quizz?user_id=${user_id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const allQuizz = result.quizz;

      function trunkText(text) {
        if (text.length > 40) {
          return text.substring(0, 40) + "...";
        }
        return text;
      }

      for (let i = 0; i < allQuizz.length; i++) {
        const quizzTemplate = `
        <div class="bg-[#DBE2EF] p-6 rounded-lg mb-6 shadow-md fade-in">
          <div class="flex flex-col sm:flex-row items-center sm:justify-between mb-4">
              <h2 class="text-xl sm:text-2xl font-semibold text-[#112D4E] w-full sm:w-auto">
                  ${trunkText(allQuizz[i].name)}
              </h2>
              <span class="text-[#3F72AF] mt-2 sm:mt-0 sm:text-lg">
                  ${allQuizz[i].questions.length} Questions
              </span>
          </div>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
              <button onclick="window.location.href='/modify?quizz_id=${allQuizz[i].quizz_id}';"
                  class="bg-[#3F72AF] text-white px-4 py-2 rounded hover:bg-[#112D4E] flex items-center justify-center">
                  <!-- Icone Modifier -->
                  <i class="fa-solid fa-pen mr-2"></i>
                  Modifier
              </button>
              <button onclick="deleteQuizz(${allQuizz[i].quizz_id})"
                  class="bg-[#3F72AF] text-white px-4 py-2 rounded hover:bg-[#112D4E] flex items-center justify-center">
                  <!-- Icone Supprimer -->
                  <i class="fa-solid fa-trash mr-2"></i>
                  Supprimer
              </button>
              <button onclick="startSession(${allQuizz[i].quizz_id})"
                  class="bg-[#3F72AF] text-white px-4 py-2 rounded hover:bg-[#112D4E] flex items-center justify-center">
                  <!-- Icone Lancer -->
                  <i class="fa-solid fa-play mr-2"></i>
                  Lancer
              </button>
          </div>
        </div>

      `;

        const quizzContainer = document.getElementById("quizz-container");
        quizzContainer.insertAdjacentHTML("beforeend", quizzTemplate);
      }

    })
    .catch((error) => console.error(error));
};



