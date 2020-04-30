const cards = document.querySelectorAll('.tile');
const count = document.getElementById('count');
console.log(count);
let hasFlipped= false;
let lock = false;
let first,second;
let counter=0;

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
	}
	//second click
	else
	{
		// hasFlipped = false;
		second = this;
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
		changeScore();	

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

function changeScore()
{
	count.style.transition = "0.5s"; //fade speed

	setTimeout(function () {
		  count.style.opacity = 0; //make text temporarily invisible
		  setTimeout(function() {
		  	if (counter<6)
		  	{
		  		count.innerHTML="Score = " + counter;		    	
		  	}
		  	else
		  	{
		  		count.innerHTML="You Win!!";
		  	}

		  	count.style.opacity = 1; //fade back in

		  }, 500); //this timeout needs to be the same as the transition speed   
	})
}

