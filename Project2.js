// Write a message to the console.
console.log('hello Console!');

// select all elements
const start = document.getElementById("start");
const inline = document.getElementById("inline");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const totalScoreContainer = document.getElementById("totalScoreContainer");

// create our questions
let questions = [
    {
        question : "In printing, it is the colour black. In chemistry, it is potassium. \
                    <br>In baseball, it is a strikeout. Which letter is it?",
        
        choiceA : "K",
        choiceB : "R",
        choiceC : "T",
        choiceD : "X",
        correct : "A"
    },{
        question : "In Swedish, a skvader is a rabbit with what unusual feature?",
        
        choiceA : "No Ears",
        choiceB : "Spots",
        choiceC : "Large Paws",
        choiceD : "Wings",
        correct : "D"
    },{
        question : "The three actors who starred as Magneto, Iron Man and \
                    Doctor Strange have all played what other character?",
       
        choiceA : "James Bond",
        choiceB : "Basil Fawlty",
        choiceC : "Sherlock Holmes",
        choiceD : "Ebenezer Scrooge",
        correct : "C"
    },{
        question : "Worldwide, which is the most commonly transplanted organ from living donors?",
       
        choiceA : "The colon",
        choiceB : "The kidney",
        choiceC : "The Lung",
        choiceD : "The Heart",
        correct : "B"
    },{
        question : "Who allegedly wrote the song “Golden Years” for Elvis Presley but ended up \
                    recording it himself?",
       
        choiceA : "Elton John",
        choiceB : "Van Morrison",
        choiceC : "David Bowie",
        choiceD : "Marvin Gaye",
        correct : "C"
    },{
        question : "Which country’s flag features an eagle eating a snake?",
       
        choiceA : "Dominican Republic",
        choiceB : "Mozambique",
        choiceC : "Guam",
        choiceD : "Mexico",
        correct : "D"
    },{
        question : "What scientist challenged church dogma but was nevertheless buried in a \
                    Catholic cathedral in Frombork, Poland?",
       
        choiceA : "Leonardo da Vinci",
        choiceB : "Copernicus",
        choiceC : "Bertrand Russell",
        choiceD : "Aristotle",
        correct : "B"
    },{
        question : "Although it freed itself from the United States in 1946, what nation’s \
                    Independence Day celebrates its declaration of independence from Spain in 1898?",
       
        choiceA : "Mexico",
        choiceB : "The Philippines",
        choiceC : "Argentina",
        choiceD : "Guatemala",
        correct : "B"
    },{
        question : "If you order <i>murgh</i> from the menu at an Indian restaurant, what meat will you get?",
       
        choiceA : "Chicken",
        choiceB : "Beef",
        choiceC : "Duck",
        choiceD : "Venison",
        correct : "A"
    },{
        question : "Main-sequence stars fuse hydrogen into helium in their cores. \
                    What’s the closest one to Earth?",
       
        choiceA : "Pollux",
        choiceB : "Sirius",
        choiceC : "Rigel",
        choiceD : "Sol",
        correct : "D"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
let timerScore = 0;
let scoreValue = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    inline.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnswer

function checkAnswer(answer){
    timerScore += count - 1;
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p><br>"+ scorePerCent +"%</p>";
    scoreValue = (150 - timerScore) * scorePerCent / 10;
    totalScoreContainer.innerHTML = "<p><br>"+ "Total Score: " + scoreValue +" points.</p>";
}
