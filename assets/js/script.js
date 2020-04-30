const cards = document.querySelectorAll('.tile');
const count = document.getElementById('count');
const resetUni = document.getElementById('reset');
let hasFlipped= false;
let lock = false;
let first,second;
let counter=0;
let flipAllowed=21;


(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function flipCard()
{
	if (lock)
	{
		return;
	}
	if (this===first) return;

	this.classList.toggle("flip");
	//first click
	if(!hasFlipped)
	{
		hasFlipped = true;
		first = this;
		flipAllowed-=1;
		flipLeft();
	}
	//second click
	else
	{
		// hasFlipped = false;
		second = this;
		flipAllowed-=1;
		flipLeft();
		checkMatch();
	}
}

function checkMatch()
{
	// are first and second same?

	if (first.dataset.val===second.dataset.val)
	{
		disableCards();
		counter=counter+1;

	}
	else
	{
		unFlip();
	}

}

function disableCards()
{
	first.removeEventListener('click' , flipCard); 
	second.removeEventListener('click' , flipCard)
	resetB();	
}
function unFlip()
{
	lock = true;
	setTimeout(()=> { 
		first.classList.remove('flip');
		second.classList.remove('flip');
		resetB();
	},1500);
}
function resetB()
{
	[hasFlipped,lock] = [false, false];
	[first,second]= [null,null];
}
cards.forEach(card => card.addEventListener("click", flipCard) )

function flipLeft()
{
	count.style.transition = "0.5s"; //fade speed

	setTimeout(function () {
		  count.style.opacity = 0; //make text temporarily invisible
		  setTimeout(function() {
		  	if (flipAllowed>0 && counter<6)
		  	{
		  		count.innerHTML="Flips Left: " + flipAllowed;
		  	}
		  	else if (flipAllowed>0 && counter==6)
		  	{
		  		youWon();
			}
			else
			{
				youLost();
			}


		  	count.style.opacity = 1; //fade back in

		  }, 500); //this timeout needs to be the same as the transition speed   
	})
}


function resetBoardButton()
{
	setTimeout(function () {
		  count.style.opacity = 0; //make text temporarily invisible
		  setTimeout(function() {
		  	document.getElementById("rb").style.display = "flex";
			document.getElementById("board").style.display = "none";
			count.style.opacity = 1; //fade back in

		  }, 500); //this timeout needs to be the same as the transition speed
	}) 

}

resetUni.onclick = function() {
    window.location = window.location;
  };

function youWon()
{
	count.innerHTML="You Won!";
	document.getElementById("heading").innerHTML= "Yay!!"
	resetBoardButton();
}
function youLost()
{
	lock=true;
	count.innerHTML="Aww, Snap!!";
	document.getElementById("heading").innerHTML= "Memory Test Failed"
	resetBoardButton();
}