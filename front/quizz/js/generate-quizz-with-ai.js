async function generateWithAi(theme, public, nbQuestions) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch(`http://127.0.0.1:5000/generate_quizz?theme=${theme}&public=${public}&number_of_questions=${nbQuestions}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result)
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
    generateButton.onclick = function(event) {
      event.preventDefault(); // Empêche le rechargement de la page
      generateWithAi(themeInput.value, publicInput.value, nbQuestionsInput.value);
  };

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