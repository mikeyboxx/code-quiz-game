// DEPENDENCIES (DOM ELEMENTS)
// View high scores -  link - top left corner  
//    - displays High scores section
// Timer countdown box - Timer: 75 - top right corner

// Intro Screen 
//  heading
//  desription box
// Start Quiz - button - center with Title and description on top

// End of Game stats
//   title - All Done!
//    Your final score is: 22
//    -final score is time remaining
//
//    Enter initials input/label box 
//     submit button 
//
//  High scores section
//   title - High Scores
//   orldered list of initials/score boxes   
//      go back button
//      clear high scores button
//   - hide link and timer

// Question section 
//   question box
//   ordered list of answer boxes (must be clickable)
//        - when clicked change color
//        - display (Wrong! or Correct!) in message box
//        - display next question section  
//
// Answer Message section
//   line break
//   message box (Wrong! or Correct!)

// DATA / STATE
// need two dimensional array containing a question and 4 answers
// need a timer
// need to store the score
// need two dimensional array containing initials and score

// FUNCTIONS


// USER INTERACTIONS
// click on High Scores link
// click on start quiz button
// click on answer box
// click on Submit initials button 
// click on Go Back button
// click on Clear High Scores button
// close browser

// INITIALIZATION
// hide all parent sections, 
// display only timer and intro sections
// 

// bind DOM elements to variables
var timerContainer = document.getElementById('timer-container');
var introContainer = document.getElementById('intro-container');
var questionContainer = document.getElementById('question-container');
var finalScoreContainer = document.getElementById('final-score-container');
var highScoresContainer = document.getElementById('high-scores-container');
var answerMessageContainer = document.getElementById('answer-message-container');

// user interaction elements
var highScoresLink = document.querySelector('header a');
var startQuizButton = document.getElementById('start-quiz-button');
var submitScoreButton = document.getElementById('submit-score-button');
var goBackButton = document.getElementById('go-back-button');
var clearScoresButton = document.getElementById('clear-scores-button');

// display elements
var timerText = document.getElementById('timer-text');
var questionText = document.getElementById('question-text');
var questionChoicesList = document.getElementById('question-choices-list');
var finalScoreText = document.getElementById('final-score-text');
var answerMessageText = document.getElementById('answer-message-text');

// global variables
var timerObj = {};
const START_SECS = 75;
var secsRemaining = START_SECS;
var currentQuestionIdx = -1;
var highScores = [];   // an array of score objects
var scoreObj = {
        initials: '',
        score: 0,   
    };

// event listeners
var highScoresLinkCallback = function (){};
var submitScoreButtonCallback = function (){};
var goBackButtonCallback = function (){};
var clearScoresButtonCallback = function (){};


// hide all children of the <main> tag
function hideAllSections(){
    for (var i = 0; i < document.body.children[0].children.length; i++)
    document.body.children[0].children[i].style.visibility = 'hidden'
}

function loadNextQuestion(){
    currentQuestionIdx++;

    // reached the end of questions
    if (currentQuestionIdx === quiz.length){
        clearInterval(timerObj);
        hideAllSections();
        timerContainer.style.visibility = 'visible';
        finalScoreContainer.style.visibility = 'visible';
        finalScoreText.textContent = secsRemaining;
        return;
    }

    questionText.textContent = quiz[currentQuestionIdx].question;
    questionChoicesList.innerHTML = '';
    // generate <li> tags for every answer choice in the quiz object array
    for (var i = 0; i < quiz[currentQuestionIdx].choices.length; i++){
        var el = document.createElement('li');
        el.id = 'l' + i;
        el.textContent = quiz[currentQuestionIdx].choices[i];
        el.addEventListener('mouseup', questionChoiceMouseUp);  // add click callback
        el.addEventListener('mousedown', questionChoiceMouseDown);  // add click callback
        questionChoicesList.appendChild(el);
    }
}




var startQuizButtonClick = function (event){
    event.stopPropagation();
    // initialize diplay state
    hideAllSections();
    timerContainer.style.visibility = 'visible';
    questionContainer.style.visibility = 'visible';

    loadNextQuestion();
    
    //  display on page and decrement seconds remaining 
    // launch timer and display on page
    timerText.textContent = secsRemaining;
    timerObj = setInterval(() => { 
        secsRemaining--;
        timerText.textContent = secsRemaining;
        if (secsRemaining === 0) clearInterval(timerObj);
    },1000);
};



var questionChoiceMouseUp = function (event){
    event.stopPropagation();

    var el = event.target;
    var elIdx = (el.id[el.id.length-1]);
    
    if (quiz[currentQuestionIdx].answer !== Number(elIdx)){
        answerMessageContainer.style.visibility = 'visible';
        answerMessageText.textContent = 'Wrong!';
        if (secsRemaining - 10 < 0){
            clearInterval(timerObj);
            secsRemaining = 0;
            timerText.textContent = secsRemaining;
        } else {
            secsRemaining -= 10;
        }
    } else {
        answerMessageContainer.style.visibility = 'visible';
        answerMessageText.textContent = 'Correct!';
        loadNextQuestion();
    }
};


var questionChoiceMouseDown = function (event){
    event.stopPropagation();

    var el = event.target;
    answerMessageContainer.style.visibility = 'hidden';
}

// set initial display state
hideAllSections();
timerContainer.style.visibility = 'visible';
introContainer.style.visibility = 'visible';

startQuizButton.addEventListener('click',startQuizButtonClick);








