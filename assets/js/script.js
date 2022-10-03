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




// set initial display state
timerContainer.style.visibility = 'visible';
introContainer.style.visibility = 'visible';
questionContainer.style.visibility = 'hidden';
finalScoreContainer.style.visibility = 'hidden';
highScoresContainer.style.visibility = 'hidden';
answerMessageContainer.style.visibility = 'hidden';


