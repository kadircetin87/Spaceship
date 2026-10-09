// 3. Variablennamen
let spaceship = "Bambam 13";
let spaceshipHealth = 100;
let spaceshipCredits = 500;
let spaceshipRepairKits = 2;

// 4.a. Status des Raumschiffs anzeigen
function renderStatus() {
  document.getElementById("statusName").innerText = spaceship;
  document.getElementById("statusHealt").innerText = spaceshipHealth;
  document.getElementById("statusCredits").innerText = spaceshipCredits;
  document.getElementById("statusReapair").innerText = spaceshipRepairKits;
}

renderStatus();

// 4.b. Reparaturset benutzen
function reparatursetBenutzen() {
  if (spaceshipRepairKits <= 0) {
    // console.log yerine ekrana hata basan zeigeFehler fonksiyonunu koyduk
    zeigeFehler("Fehler: Keine Reparatursets mehr vorhanden!");
    return;
  }

  zeigeFehler("");

  spaceshipRepairKits = spaceshipRepairKits - 1;
  spaceshipHealth = spaceshipHealth + 20;
}

let benutzKopf = document.getElementById("benutzButton");

benutzKopf.addEventListener("click", function () {
  reparatursetBenutzen();
  renderStatus();
});

// 4.c. Reparaturset kaufen
function reparatursetKaufen(anzahlZuKaufen) {
  let preis = 50;
  let gesamtPreis = anzahlZuKaufen * preis;

  if (spaceshipCredits < gesamtPreis) {
    // console.log yerine ekrana hata basan zeigeFehler fonksiyonunu koyduk
    zeigeFehler("Fehler: Nicht genug Währung vorhanden!");
    return;
  }

  // İşlem başarılı olduğu için ekrandaki eski hatayı temizliyoruz
  zeigeFehler("");

  spaceshipCredits = spaceshipCredits - gesamtPreis;
  spaceshipRepairKits = spaceshipRepairKits + anzahlZuKaufen;
}

// 3. Madde: 
let kaufKnopf = document.getElementById("kaufButton");
kaufKnopf.addEventListener("click", function () {
  let inputFeld = document.getElementById("kaufInput");
  let anzahlZuKaufen = Number(inputFeld.value);

  reparatursetKaufen(anzahlZuKaufen);
  renderStatus();
  inputFeld.value = "";
});

function schadenNehmen(schadenshoehe) {
  spaceshipHealth = spaceshipHealth - schadenshoehe;
  
  if (spaceshipHealth <= 0) {
    spaceshipHealth = 0;
    console.log("Das Raumschiff wurde zerstört!");
        document.body.classList.add("game-over");
  }
}

let schadenKopf = document.getElementById("schadenButton");

schadenKopf.addEventListener("click", function () {
  let inputFeld = document.getElementById("schadenInput");
  let eingeTragenerSchaden = Number(inputFeld.value);

  schadenNehmen(eingeTragenerSchaden);
  renderStatus();
  inputFeld.value = "";
});

function zeigeFehler(nachricht) {
  document.getElementById("fehlerMeldung").innerText = nachricht;
}

