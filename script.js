let photos = [
    "https://images.unsplash.com/photo-1583160247711-2191776b4b91?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1593196651558-2b5de57eb149?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1591561582301-7ce6588cc286?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1726401580158-58e64c00f518?auto=format&fit=crop&w=500&q=80",
    "https://plus.unsplash.com/premium_photo-1673709359598-db2868b023f6?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1619148189616-013b06952c04?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1496070242169-b672c576566b?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1597953601374-1ff2d5640c85?auto=format&fit=crop&w=500&q=80",
];

let cards = [...photos, ...photos]
cards.sort(()=> {
    return Math.random() - 0.5;
});

let board = document.getElementsByClassName("board")[0];
let flippedCards = [];
let matchedCount = 0;
let timeLeft = 120;
let timerInterval;

cards.forEach((photo) => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <div class="container">
            <img src="https://cdn-icons-png.flaticon.com/512/1191/1191121.png" class="logo" alt="Logo">
            <img src= ${photo} class="icon" alt="Board game icon">
        </div>
    `;
    board.insertAdjacentElement("beforeend",div);
    div.addEventListener("click", () => flipCard(div, photo));
})

flipCard = (div,photo)=> {
    let container = div.getElementsByClassName("container")[0];
    if(container.classList.contains("flipped") || flippedCards.length == 2) {
        return;
    }
    container.classList.add("flipped");
    flippedCards.push({container,photo})
    if(flippedCards.length == 2){
        checkCards(flippedCards[0],flippedCards[1]);
    }
}

checkCards = (first,second)=> {
    if (first.photo === second.photo) {
        matchedCount += 2;
        flippedCards = [];

        if(matchedCount == 18) {
            clearInterval(timerInterval);
            alert("🎉 Congratulation 🎉")
        }
    }
    else {
        setTimeout(() => {
            first.container.classList.remove("flipped");
            second.container.classList.remove("flipped");
            flippedCards = [];
        },1000);
    }
}

timmer = () => {
    let time = document.getElementById("time");
    
    timerInterval = setInterval(() => {
        timeLeft--;
        time.textContent = timeLeft;

        if(timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Time's up, Try again");
        showAll();
    }
    },1000);
}

showAll = () => {
    let a = document.getElementsByClassName("card");
    Array.from(a).forEach((ele) => {
        ele.querySelector(".container").classList.add("flipped");
        ele.style.pointerEvents = "none";
    });
}

timmer();