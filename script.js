let symptomForm = document.getElementById('symptomForm');
let symptomsContainer = document.getElementById('symptomsItems');
let diagnosesContainer = document.querySelector('.diagnoses__items');
let symptomsSubmitBtn = document.getElementById('symptomsSubmit');
let symptoms = [];
let symptomsIds = 0;

symptomForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addSymptom();
    symptomForm.reset();

    if (symptoms.length && symptomsSubmitBtn.classList.contains('hidden')) {
        symptomsSubmitBtn.classList.remove('hidden');
    };
    diagnosesContainer.classList.add('hidden');
});

symptomsSubmitBtn.addEventListener('click', symptomsSubmit);

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('symptom__del')) {
        deleteSymptomByIndex(e.target.dataset.id);
    };
});

function addSymptom() {
    let symptom = {};
    symptom.id = ++symptomsIds;
    let symptomHtml = `<div class="symptom" data-id="${symptom.id}">`;
    symptomForm.querySelectorAll('select').forEach(select => {
        symptom[select.name] = select.value;
        let label = select.options[select.selectedIndex].text;
        symptomHtml += `<div class="symptom__param">${label}</div>`
    });

    symptomHtml += `<button data-id="${symptom.id}" class="symptom__del symptom__btn">удалить</button></div>`;
    symptomsContainer.innerHTML += symptomHtml;
    symptoms.push(symptom);
};

function deleteSymptomByIndex(symptomDataId) {
    document.querySelector('.symptom[data-id="' + symptomDataId + '"]').remove();
    let i = symptoms.findIndex(symp => symp.id === +symptomDataId)
    symptoms.splice(i, 1);


    if (!symptoms.length && !symptomsSubmitBtn.classList.contains('hidden')) {
        symptomsSubmitBtn.classList.add('hidden');
    } else if (symptoms.length > 0) {
        symptomsSubmitBtn.classList.remove('hidden');
    }
    diagnosesContainer.classList.add('hidden');
};

function symptomsSubmit() {
    diagnosesContainer.classList.remove('hidden');
    symptomsSubmitBtn.classList.add('hidden');
    document.querySelector('.diagnoses__item-percent').innerHTML = Math.round(Math.random() * 100);
};