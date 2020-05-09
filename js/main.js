function QuizItem(question, variants, answer, enabled, replied, selectionOfUser) {
	this.question = question;
	this.variants = variants;
	this.answer = answer;
	this.enabled = enabled;
	this.replied = replied;
	this.selectionOfUser = selectionOfUser;
}

var quizQuestions = [];
quizQuestions[0] = new QuizItem("Javascript has:", 
						["Function scope and block scope",
						 "Just block scope",
						 "Global and function scope",
						 "Only global scope"], 
						 2,
						 false,
						 false,
						 undefined);

quizQuestions[1] = new QuizItem("Which of these is a working object?", 
						["var obj = { car: \"ford\" ; color:green }",
						 "var obj = { car = \"ford\" , color = green }",
						 "var obj = { car: \"ford\" , color:green }",
						 "None of the above"],
						 2,
						 false,
						 false,
						 undefined);

quizQuestions[2] = new QuizItem("Which of these is a working loop?",
						["for( i=0 i<10 i+=1) { console.log(i) }",
						 "for (i=0; i<10; i+=1) {console.log(i)}",
						 "for( i=0, i<10, i+=1) { console.log(i) }",
						 "if (i=0) { i+=1 }"],
						 1,
						 false,
						 false,
						undefined);

quizQuestions[3] = new QuizItem("What does this output:<br>'hello'!=123",
						["false", "true", "neither"],
						1,
						false,
						false,
						undefined);

quizQuestions[4] = new QuizItem("var num = 10+''",
						["typeof num is number",
						"typeof numb is boolean",
						"typeof num is function",
						"typeof num is string"],
						3,
						false,
						false,
						undefined);



var currentIndex = 0, numOfAnswered = 0;
var currentQuestion = quizQuestions[currentIndex];
//second ulTag 
var ulTag = document.getElementsByTagName('ul')[1];
var liTags = ulTag.getElementsByTagName('li');

function showCurrentQuestion() {
	var headerOfDropdow = document.getElementsByClassName('wrapper')[0];
	
	var numQuestion = parseInt(currentIndex)+1;
	headerOfDropdow.getElementsByTagName('span')[0].innerHTML = numQuestion;
	var pTag = document.getElementsByTagName('p')[0];
	// console.log(liTags);
	var ulTag = document.getElementsByTagName('ul')[1];
	var liTags = ulTag.getElementsByTagName('li');
	pTag.innerHTML = currentQuestion.question;
	for (var i=0; i < liTags.length; i++) {
		
		if (currentQuestion.variants[i] == undefined) {
			console.log(currentQuestion.variants[i]);
			liTags[i].className = "doNotDisplay";
		} else {
			console.log(currentQuestion.variants[i]);
			liTags[i].innerHTML = currentQuestion.variants[i];
			liTags[i].className = "";
		}
	}
};

enableLiOnClickEvents();
showCurrentQuestion();

//when a variant is selected it becomes highlighted 
function changeLiStyle() {
	var selectedItem = document.getElementsByClassName('selected')[0];
	
	if (selectedItem) selectedItem.className = "";
	this.className = "selected";
}



function enableLiOnClickEvents() {
	for (var i=0; i < liTags.length; i++) {
		console.log(liTags[i]);
		liTags[i].onclick = changeLiStyle;
	}
};

var button = document.getElementsByClassName('submit')[0];
button.onclick = submitAndCheckAnswer;

function submitAndCheckAnswer() {
	var selectedItem = document.getElementsByClassName('selected')[0];
/*	console.log(selectedItem.innerHTML);*/
 if (selectedItem == undefined)
   		alert("There is no variant selected! Please select any!");
else {
   currentQuestion.enabled = true;
	if (selectedItem.innerHTML == currentQuestion.variants[currentQuestion.answer]) {
		
		console.log("Correct "+ currentQuestion.variants.indexOf(selectedItem.innerHTML));
		changeTheLayoutAccordingTheResult(selectedItem,"correct", true);
		checkIfTheLastQuestion(this);
		numOfAnswered++;
		
	} else {
		
		console.log("Wrong!");
		changeTheLayoutAccordingTheResult(selectedItem,"wrong", false);
		checkIfTheLastQuestion(this);
		liTags[currentQuestion.answer].className = "correct";
	}	
}
}

function changeTheLayoutAccordingTheResult(selectedItem,result,replied) {
	console.log(result);
	currentQuestion.replied = replied;
	//the index corresponding to the selection of user is selectiOfUser
	currentQuestion.selectionOfUser = currentQuestion.variants.indexOf(selectedItem.innerHTML);
	selectedItem.className=result;
	disableLiOnClickEvents();
}


function checkIfTheLastQuestion(button) {
	console.log("currentIndex: ",currentIndex);
	if (currentIndex == quizQuestions.length-1) {
			console.log(currentIndex +" " + quizQuestions.length);
			button.className = "finalize";
			button.innerHTML = "Finalize";
			button.onclick = finalize;
		} else {
			console.log(currentIndex +"fdsf " + quizQuestions.length);
			currentIndex++;
			button.innerHTML = "Next Question";
			button.className = "next";
			button.onclick = goToNextQuestion;
		}
}

function disableLiOnClickEvents() {
	for (var i=0; i < liTags.length; i++) {
		liTags[i].onclick = "";
	}
}

function goToNextQuestion() {
	
	currentQuestion = quizQuestions[currentIndex];
	
	this.innerHTML = "Submit";
	this.onclick = submitAndCheckAnswer;
	this.className = "submit";
	showCurrentQuestion();
	enableLiOnClickEvents();
}

function cleanUpTheLayout() {
	var mainDiv = document.getElementsByClassName('main')[0];
	
	while (mainDiv.hasChildNodes()) {
		mainDiv.removeChild(mainDiv.firstChild);
	}
	console.log("clean UPP!!");
}

function finalize() {
	cleanUpTheLayout();
	var mainDiv = document.getElementsByClassName('main')[0];
	var tHeader = document.createElement("p");
	tHeader.appendChild(document.createTextNode("Review your answers"));
	tHeader.setAttribute("class","pAboveTable");
	mainDiv.appendChild(tHeader);
	var table = document.createElement("table");
	
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var heading = ["Questions", "Your results", "Correct option"];
	
	for (var i = 0 ; i < heading.length ; i++) {
		var th = document.createElement("th");
		th.width = '200px';
		th.appendChild(document.createTextNode(heading[i]));
		tr.appendChild(th);
		console.log(tr);
	}

	for (var i = 0 ; i < quizQuestions.length; i++) {
			
			var tr = document.createElement('tr');
			var td = document.createElement('td');
			td.appendChild(document.createTextNode("Question " + (i+1)));
			td.setAttribute("class","questionCol");
			tr.appendChild(td);
			var td = document.createElement('td');
			
			var answer = quizQuestions[i].replied ? (
				td.className = "correctCol",
				"Correct"
				) : (
				td.className = "wrongCol",
				"Incorrect"
				);
			
			td.appendChild(document.createTextNode(answer));
			tr.appendChild(td);
			var td = document.createElement('td');
			if (!quizQuestions[i].replied) {
				var correctAns = quizQuestions[i].variants[quizQuestions[i].answer];
				td.appendChild(document.createTextNode(correctAns));
				td.setAttribute("class","correctCol");
			}
			tr.appendChild(td);
			
			table.appendChild(tr);

	}
	
	mainDiv.appendChild(table);
	var trAll = document.getElementsByTagName("tr");
	console.log(trAll);
	for (var i = 1; i < trAll.length; i++) {
		trAll[i].onclick = returnToQuestion;
		console.log("Assigned!");
	}
	
}

function createQuestionLayout() {
			var mainDiv = document.getElementsByClassName('main')[0];
			var wrapperDiv = document.createElement('div');
			wrapperDiv.className = "wrapper";
			wrapperDiv.onclick = "showDropdown";
			mainDiv.appendChild(wrapperDiv);
			for (var j = 0 ; j < 2; j++) {
				var span = document.createElement('span');
				wrapperDiv.appendChild(span);
			}
			span.innerHTML = "/ "+quizQuestions.length;
			var ulDdown = document.createElement('ul');
			ulDdown.className = "dropdown";
			mainDiv.appendChild(ulDdown);
			var pTag = document.createElement('p');
			pTag.className = "question";
			var ulTag = document.createElement('ul');
			mainDiv.appendChild(pTag);
			mainDiv.appendChild(ulTag);
			for (var i = 0 ; i < 4; i++) {
				var liTag = document.createElement('li');
				ulTag.appendChild(liTag);
				var liTag1 = document.createElement('li');
				ulDdown.appendChild(liTag1);
			}
			var button = document.createElement('button');
			button.innerHTML = "Back";
			button.className = "back";
      
			button.onclick = finalize;
			mainDiv.appendChild(button);
}

function returnToQuestion() {
	console.log(this);
	var questionTitle = this.getElementsByClassName("questionCol")[0].innerHTML;
	var questionNum = questionTitle[questionTitle.length -1];
	
 
 			cleanUpTheLayout();
			createQuestionLayout();
			currentQuestion = quizQuestions[questionNum -1];
			
			currentIndex = questionNum-1;
			showCurrentQuestion();
			var correctLiNum = quizQuestions[questionNum-1].answer;
  if (quizQuestions[questionNum-1].enabled) {
	 	if (quizQuestions[questionNum-1].replied) {
	 		
			document.getElementsByTagName("li")[correctLiNum+4].className="correct";
		} else {
			var selectedLiNum = quizQuestions[questionNum-1].selectionOfUser;
			document.getElementsByTagName("li")[selectedLiNum+4].className="wrong";
			document.getElementsByTagName("li")[correctLiNum+4].className="correct";
		
	 }
}
}

function showDropdown() {
	var dropdown = document.getElementsByClassName("dropdown")[0];
	 var dropdownItems = dropdown.getElementsByTagName("li");
	 console.log(dropdownItems);
	 for (var i = 0 ; i < dropdownItems.length; i++)
	 	dropdownItems[i].onclick = clickOnAnyQuestionFromDropdown;
	var display = dropdown.style.display;
	if (display=="") {
		dropdown.style.display = "block";
	} 
	else {
		dropdown.style.display ="";
	};
}

function hideDropdown() {
	var dropdown = document.getElementsByClassName("dropdown")[0];
	var dropdownItems = dropdown.getElementsByTagName("li");
	var display = dropdown.style.display;
	if (display=="") {
		dropdown.style.display = "block";
	} 
	else {
		dropdown.style.display ="";
	};
}


function clickOnAnyQuestionFromDropdown() {
	console.log(this);
	var questionNum = this.getElementsByTagName('span')[0].innerHTML;
	currentQuestion = quizQuestions[questionNum-1];
	hideDropdown();
	currentIndex = questionNum-1;
	showCurrentQuestion();
}