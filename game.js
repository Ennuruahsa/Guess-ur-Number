//* =====================================
//*  GUESS MY NUMBER
//*  Game Logic
//*======================================

//? 1-100 arasinda rastgele bir sayi tut
let randomNumber = Math.round(Math.random() * 100);
console.log(randomNumber);

//? Variables
let score = 10;
// let topScore = 0;

//? localStorage'da topScore adiyla bir degisken olustur
let topScore = localStorage.getItem("topScore") || 0;


//? DOM'daki top-score degerini localStorage'dan okuyarak guncelle.
document.querySelector(".top-score").textContent = topScore;

document.querySelector(".check-btn").addEventListener("click", () => {
  //? Gerekli degiskenleri tanimla
  const guessInput = Number(document.querySelector(".guess-input").value);
  const message = document.querySelector(".message");
  const body = document.querySelector("body");
  const checkBtn = document.querySelector(".check-btn");

  //? eger input girilmediyse kullaniciya uyari ver
  if (!guessInput) {
    message.innerText = "Please enter a number";
  }
  //? eger rastgeleSayi == input.value
  else if (randomNumber === guessInput) {
    message.innerHTML = `Congrats You Win <i class="fa-solid fa-face-grin-hearts fa-2x"></i> `;
    body.className = "bg-success";
    checkBtn.disabled = true;

    if (score > topScore) {
      //? localStorage'daki topScore degiskenini guncelle
      localStorage.setItem("topScore", score);
      //? DOM'daki top-score degerini guncelle
      document.querySelector(".top-score").textContent = score;
    }
    document.querySelector(".secret-number").textContent = randomNumber;
  } //? eger rastgeleSayi != input.value
  else {
    score--;

    if (score > 0) {
      guessInput > randomNumber
        ? (message.innerHTML = `<i class="fa-solid fa-arrow-trend-down fa-2x"></i> DECREASE `)
        : (message.innerHTML = `<i class="fa-solid fa-arrow-trend-up fa-2x"></i> INCREASE `);
    } else {
      message.innerHTML = `You Lost <i class="fa-regular fa-face-sad-tear fa-2x"></i>`;
      body.className = "bg-danger";
      checkBtn.disabled = true;
      document.querySelector(".secret-number").textContent = randomNumber;
    }

    document.querySelector(".score").textContent = score;
  }
});

//? Again butonuna basildiginda oyunu yeniden baslangic degerlerine getir
document.querySelector(".again-btn").addEventListener("click", () => {
  score = 10;
  document.querySelector(".score").textContent = score;
  document.querySelector(".check-btn").disabled = false;
  randomNumber = Math.round(Math.random() * 100);
  console.log(randomNumber);
  document.querySelector(".secret-number").textContent = "?";
  document.querySelector(".message").innerText = "Starting...";
  document.querySelector(".guess-input").value = "";
  document.querySelector("body").classList.remove("bg-success", "bg-danger");
});

document.querySelector(".guess-input").addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    document.querySelector(".check-btn").click();
  }
});
