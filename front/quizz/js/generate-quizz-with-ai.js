async function get_ip() {
  const response = await fetch('/get_ip');
  const data = await response.json();
  return data["ip"];
}


document.addEventListener('DOMContentLoaded', async function() {
  await get_ip().then((ip) => {
    url = ip;
  })
  async function createQuizz(quizz) {
    const title = quizz.name
    const questions = JSON.stringify(quizz.questions)
  
    const formdata = new FormData();
      formdata.append("name", title);
      formdata.append("user_id", localStorage.getItem("user_id"));
      formdata.append("questions", questions);
    
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
  
    fetch(`http://${url}:5000/quizz`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        window.location.replace("/my-quizz");
      })
      .catch((error) => {
        console.error(error)
        document.getElementById("error_message").innerText = "Erreur lors de la création du quizz";
      });
  }
  
  async function generateWithAi(theme, public, nbQuestions) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
  
    fetch(`http://${url}:5000/generate_quizz?theme=${theme}&public=${public}&number_of_questions=${nbQuestions}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        createQuizz(result["quizz"]["quizz"])
      })
      .catch((error) => console.error(error));
  }
  
  async function CreateFormToGenerateWithAi() {
    const form_newquizz = document.getElementById('form_newquizz')
    form_newquizz.innerHTML = "";
  
    // Créer une div pour contenir les éléments
    const container = document.createElement('div');
  
    // Créer les labels et les inputs
    const themeLabel = document.createElement('label');
    themeLabel.textContent = 'Thème :';
    const themeInput = document.createElement('input');
    themeInput.type = 'text';
    themeInput.id = 'theme';
  
    const publicLabel = document.createElement('label');
    publicLabel.textContent = 'Publique :';
    const publicInput = document.createElement('input');
    publicInput.type = 'text';
    publicInput.id = 'public';
  
    const nbQuestionsLabel = document.createElement('label');
    nbQuestionsLabel.textContent = 'Nombre de questions :';
    const nbQuestionsInput = document.createElement('input');
    nbQuestionsInput.type = 'number';
    nbQuestionsInput.id = 'nbQuestions';
  
    // Créer le bouton
    const generateButton = document.createElement('button');
    generateButton.textContent = 'Générer';
    generateButton.id = 'generateButton';
    generateButton.classList.add('btn-create-quizz')
    generateButton.addEventListener("click", function (event) {
      event.preventDefault();
      generateButton.style.backgroundColor = "darkgrey";
      generateButton.style.cursor = "not-allowed";
      generateButton.style.transition = "none";
      generateButton.style.transform = "none";
      generateButton.style.boxShadow = "none";
      const loader_contenair = document.createElement("div");
      loader_contenair.classList.add("loader-container");
  
      const loader = document.createElement("div");
      loader.classList.add("loader");
  
      for (let i = 1; i <= 3; i++) {
          let div = document.createElement("div");
          loader.appendChild(div);
      }
  
      loader_contenair.appendChild(loader);
      container.appendChild(loader_contenair);
      generateWithAi(themeInput.value, publicInput.value, nbQuestionsInput.value);
    });
  
    // Ajouter les éléments à la div
    container.appendChild(themeLabel);
    container.appendChild(themeInput);
    container.appendChild(publicLabel);
    container.appendChild(publicInput);
    container.appendChild(nbQuestionsLabel);
    container.appendChild(nbQuestionsInput);
    container.appendChild(generateButton);
  
    // Ajouter la div au body ou à un autre élément parent
    form_newquizz.appendChild(container);
  }
  
})
