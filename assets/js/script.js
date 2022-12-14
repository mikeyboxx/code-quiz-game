// section containers
var timerContainer = document.getElementById('timer-container');
var introContainer = document.getElementById('intro-container');
var questionContainer = document.getElementById('question-container');
var finalScoreContainer = document.getElementById('final-score-container');
var highScoresContainer = document.getElementById('high-scores-container');
var answerMessageContainer = document.getElementById('answer-message-container');

// user interaction elements
var highScoresLink = document.querySelector('#timer-container p:first-child');
var startQuizButton = document.getElementById('start-quiz-button');
var submitScoreButton = document.getElementById('submit-score-button');
var goBackButton = document.getElementById('go-back-button');
var clearScoresButton = document.getElementById('clear-scores-button');
var finalScoreInitialsForm = document.getElementById('final-score-initials-form');

// display elements
var timerText = document.getElementById('timer-text');
var questionText = document.getElementById('question-text');
var questionChoicesList = document.getElementById('question-choices-list');
var finalScoreText = document.getElementById('final-score-text');
var answerMessageText = document.getElementById('answer-message-text');
var finalScoreInitialsText = document.getElementById('final-score-initials-text');
var highScoresList = document.getElementById('high-scores-list');

// global variables
var timerObj = {};           // timer object used in setInterval
const START_SECS = 75;       // number of seconds left on the clock
var secsRemaining = START_SECS;
var currentQuestionIdx = -1; 
var highScores = [];   // an array of score objects


// hide all children of the <main> tag
function hideAllSections(){
    for (var i = 0; i < document.body.children[0].children.length; i++)
    document.body.children[0].children[i].style.display = 'none';
}

// change the state of display
function displaySection(section){
    hideAllSections();
    
    switch (section){
        case 'intro-container':{
            timerContainer.style.display = 'flex';
            introContainer.style.display = 'flex';
            highScoresLink.style.visibility = 'visible';
            timerText.textContent = 0;
            break;
        }
        case 'question-container':{
            timerContainer.style.display = 'flex';
            highScoresLink.style.visibility = 'hidden';
            questionContainer.style.display = 'flex';
            break;
        }
        case 'final-score-container':{
            timerContainer.style.display = 'flex';
            highScoresLink.style.visibility = 'hidden';
            finalScoreContainer.style.display = 'flex';
            answerMessageContainer.style.display = 'flex';
            finalScoreInitialsText.value = '';
            finalScoreText.textContent = secsRemaining;
            break;
        }
        case 'high-scores-container':{
            highScoresContainer.style.display = 'flex';
            highScoresList.innerHTML = '';
            break;
        }
    }
}

// generates HTML for each question and answers
function loadNextQuestion(){
    currentQuestionIdx++;
    
    // reached the end of questions
    if (currentQuestionIdx >= quiz.length){
        clearInterval(timerObj);
        hideAllSections();
        displaySection('final-score-container');
        return;
    }

    questionText.textContent = quiz[currentQuestionIdx].question;
    questionChoicesList.innerHTML = '';

    // generate <li> tags for every answer choice in the quiz object array
    for (var i = 0; i < quiz[currentQuestionIdx].choices.length; i++){
        var el = document.createElement('li');
        el.id = 'l' + i;
        el.textContent = quiz[currentQuestionIdx].choices[i];
        el.addEventListener('mouseup', questionChoiceMouseUp);      // add click callback
        el.addEventListener('mousedown', questionChoiceMouseDown);  // add click callback
        questionChoicesList.appendChild(el);
    }
}

// launch the timer and display first question and answers
var startQuizButtonClick = function (event){
    event.stopPropagation();
    
    displaySection('question-container');
    loadNextQuestion();
    
    // launch timer and display on page
    timerText.textContent = secsRemaining;
    timerObj = setInterval(() => { 
        secsRemaining--;
        if (secsRemaining <= 0) {
            secsRemaining = 0;
            clearInterval(timerObj);
            displaySection('final-score-container');
        } 
        timerText.textContent = secsRemaining;
    },1000);
};


// check if the answer is correct
var questionChoiceMouseUp = function (event){
    event.stopPropagation();
    var el = event.target;
    var elIdx = (el.id[el.id.length-1]);
    
    if (quiz[currentQuestionIdx].answer !== Number(elIdx)){
        answerMessageContainer.style.display = 'flex';
        answerMessageText.textContent = 'Wrong!';
        if (secsRemaining - 10 <= 0){
            secsRemaining = 0;
        } else {
            secsRemaining -= 10;
        }
    } else {
        answerMessageContainer.style.display = 'flex';
        answerMessageText.textContent = 'Correct!';
        loadNextQuestion();
    }
};

// hide the answer to prior question
var questionChoiceMouseDown = function (event){
    event.stopPropagation();
    answerMessageContainer.style.display = 'none';
}

// push the results to the high score array of objects, sort and generate HTML 
var finalScoreInitialsFormSubmit = function (event){
    event.preventDefault();

    highScores.push({
        initials: finalScoreInitialsText.value.toUpperCase(),
        score: secsRemaining
    });

    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    // sort in descending order. highest scores show up first
    highScores.sort((a, b)=>{
        if (a.score > b.score){  
            return -1;
        }
        if (a.score < b.score){
            return 1;
        }
        return 0; // a must equal to b
    })

    displaySection('high-scores-container');

    for (var i = 0; i < highScores.length; i++){
        var el = document.createElement('li');
        el.textContent = highScores[i].initials + ' - ' + highScores[i].score;
        highScoresList.appendChild(el);
    }
}

var goBackButtonClick = function (event){
    event.stopPropagation();
    displaySection('intro-container');
    currentQuestionIdx = -1;
    secsRemaining = START_SECS;
};

var clearScoresButtonClick = function (event){
    event.stopPropagation();
    highScores = [];
    highScoresList.innerHTML = '';
    localStorage.removeItem('highScores');
};

var highScoresLinkCallback = function (event){
    event.stopPropagation();
    displaySection('high-scores-container');

    for (var i = 0; i < highScores.length; i++){
        var el = document.createElement('li');
        el.textContent = highScores[i].initials + ' - ' + highScores[i].score;
        highScoresList.appendChild(el);
    }
};

// initialization
function init(){
    // get saved scores array of objects from local storage
    var localStorageItem = JSON.parse(localStorage.getItem('highScores'));
    if (localStorageItem !== null) highScores = localStorageItem;
    
    displaySection('intro-container');

    // add event listeners
    startQuizButton.addEventListener('click',startQuizButtonClick);
    finalScoreInitialsForm.addEventListener('submit',finalScoreInitialsFormSubmit);
    goBackButton.addEventListener('click', goBackButtonClick);
    clearScoresButton.addEventListener('click',clearScoresButtonClick);
    highScoresLink.addEventListener('click', highScoresLinkCallback);
}


init();










