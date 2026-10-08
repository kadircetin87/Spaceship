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
    if (spaceshipRepairKits <= 0) {
        console.log("Fehler: Keine Reparatursets mehr vorhanden!");
        return;
    }
    spaceshipRepairKits = spaceshipRepairKits - 1;
    spaceshipHealth = spaceshipHealth + 20;
}

reparatursetBenutzen();
statusDesRaumschiffsAnzeigen();



// 4.c. Reparaturset kaufen
function reparatursetKaufen() {
    let preis = 50;
    if (spaceshipCredits < preis) {
        console.log("Fehler: Nicht genug Währung vorhanden!");
        return;
    }
    spaceshipCredits = spaceshipCredits - preis;
    spaceshipRepairKits = spaceshipRepairKits + 1;
}

reparatursetKaufen();
statusDesRaumschiffsAnzeigen();



// 4.d. Schaden nehmen
function schadenNehmen(schadenshoehe) {
    spaceshipHealth = spaceshipHealth - schadenshoehe;
    if (spaceshipHealth <= 0) {
        spaceshipHealth = 0;
        console.log("Das Raumschiff wurde zerstört!");
    }
}

schadenNehmen(30);
statusDesRaumschiffsAnzeigen();
