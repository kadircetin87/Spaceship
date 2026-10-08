// 3. Variablennamen
let spaceship = "Bambam 13";
let spaceshipHealth = 100;
let spaceshipCredits = 500;
let spaceshipRepairKits = 2;



// 4.a. Status des Raumschiffs anzeigen
function statusDesRaumschiffsAnzeigen() {
    console.log("Name: " + spaceship);
    console.log("Leben: " + spaceshipHealth);
    console.log("Währung: " + spaceshipCredits);
    console.log("Reparatursets: " + spaceshipRepairKits);
}

statusDesRaumschiffsAnzeigen();



// 4.b. Reparaturset benutzen
function reparatursetBenutzen() {
    spaceshipRepairKits = spaceshipRepairKits - 1;
    spaceshipHealth = spaceshipHealth + 20;
}

reparatursetBenutzen();
statusDesRaumschiffsAnzeigen()



// 4.c. Reparaturset kaufen
function reparatursetKaufen() {
    spaceshipCredits = spaceshipCredits - 50;
    spaceshipRepairKits = spaceshipRepairKits + 1;
}

reparatursetKaufen();
statusDesRaumschiffsAnzeigen()



// 4.d. Schaden nehmen
function schadenNehmen(schadenshoehe) {
    spaceshipHealth = spaceshipHealth - schadenshoehe;
}

schadenNehmen(30);
statusDesRaumschiffsAnzeigen()
