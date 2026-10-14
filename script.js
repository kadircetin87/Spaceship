// 1. Variablennamen

let spaceship = "Bambam 13";
let spaceshipHealth = 100;
let spaceshipCredits = 500;
// let spaceshipRepairKits = 2; Array oldu*//
// Artık 'spaceshipRepairKits = 2' değişkeni yok!
// Onun yerine tüm eşyaları koyacağımız dinamik, boş sırt çantamız var:*//
let spaceshipInventory = ["Schild", "Reparaturkit", "Laser", "Kristall"]; //*Array */

//Neu İtems Arrray verdim yukarıda/// "Schild", "Reparaturkit", "Laser", "Kristall" İtemler.

//* 2. Status des Raumschiffs anzeigen *//
// Geminin temel durum bilgilerini HTML'e yazar
function renderStatus() {
  document.getElementById("statusName").innerText = spaceship;
  document.getElementById("statusHealt").innerText = spaceshipHealth;
  document.getElementById("statusCredits").innerText = spaceshipCredits;
  // document.getElementById("statusReapair").innerText = spaceshipRepairKits; /*array oldu*//
}

renderStatus();

//* 3. Reparaturset benutzen *//

function reparatursetBenutzen() {
  if (spaceshipRepairKits <= 0) {
    // console.log yerine ekrana hata basan zeigeFehler fonksiyonunu koyduk *//
    zeigeFehler("Fehler: Keine Reparatursets mehr vorhanden!");

    return;
  }

  zeigeFehler("");

  spaceshipRepairKits = spaceshipRepairKits - 1;
  spaceshipHealth = spaceshipHealth + 20;
}

let benutzKopf = document.getElementById("benutzButton");

benutzKopf.addEventListener("click", function () {
  reparatursetBenutzen(); // .indexOf ve .splice ile kiti harcar, canı artırır
  renderStatus(); // Canı günceller
  showInventory(); // Kiti envanterden silinmiş olarak gösterir
});

// 4. Reparaturset kaufen == ırt çantamızı tarayıp içindekileri HTML'deki <ul> listesine basar

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
  let anzahlZuKaufen = Number(inputFeld.value); // Inputtan gelen sayıyı alır

  reparatursetKaufen(anzahlZuKaufen); // Döngüyle girilen adet kadar kiti ekler
  renderStatus();
  showInventory();
  inputFeld.value = ""; // Sayı yazılan kutuyu temizler
});

//* 5 ** Schaden/////

function schadenNehmen(schadenshoehe) {
  // Envanter Schild kontrolu
  if (spaceshipInventory.includes("Schild")) {
    schadenshoehe = schadenshoehe * 0.5; // Damage -%50
    console.log("Schild aktiv! Schaden um 50% reduziert.");
  }

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

  schadenNehmen(eingeTragenerSchaden); // kalkan kontrolü yapar
  renderStatus();
  showInventory();
  inputFeld.value = "";
});

// Ekranda hata mesajlarını göstermemi sağlayan yardımcı fonksiyon
function zeigeFehler(nachricht) {
  document.getElementById("fehlerMeldung").innerText = nachricht;
}
//** Schild Function tanımladım  */ ---
function schildKaufen() {
  let schildPreis = 100; // Fiyatı 100

  // 1. Kontrol: Oyuncunun parası bu kalkana yetiyor mu?
  if (spaceshipCredits < schildPreis) {
    zeigeFehler("Fehler: Nicht genug Währung für ein Schild!");
    return; // Parası yetmiyorsa fonksiyonu burada durdur
  }

  // 2. İŞLEM: Parayı düşüyoruz
  spaceshipCredits = spaceshipCredits - schildPreis;

  // 3. ARRAY KULLANIMI: Çantaya ekliyoruz
  spaceshipInventory.push("Schild");

  // Başarılı olunca eski hataları siliyoruz
  zeigeFehler("");
} // <-- 129. SATIRA BU PARANTEZİ KOYMALISIN! schildKaufen fonksiyonunu kapatır.

// --- 2. BUTONU BAĞLAMA VE TETİKLEME ---
let schildKaufKnopf = document.getElementById("schildButton");

// addeventlistener değil, tek 'd' ile addEventListener yazmalısın:
schildKaufKnopf.addEventListener("click", function () {
  schildKaufen(); // Array'e schild ekler
  renderStatus(); // Yeni parayı ekranda gösterir
  showInventory(); // Yeni envanter listesini ekrana basar
}); // <-- 137. SATIRDA BU PARANTEZ VE NOKTALI VİRGÜLÜ UNUTMA!
// Envanteri HTML'de gösterme fonksiyonu

function showInventory() {
  let content = "";
  // Döngü (for) sırt çantasındaki tüm elemanları tek tek gezer*//
  for (let index = 0; index < spaceshipInventory.length; index++) {
    content += `<li>${spaceshipInventory[index]}</li>`;
  }

  // HTML sayfamdaki listenin içine yazdırıyor
  document.getElementById("spaceshipInventoryList").innerHTML = content;
}

// Sayfa ilk yüklendiğinde geminin adını, canını, parasını
// ve envanterini ekrana hemen bassın diye en sona koyuyoruz:
renderStatus();
showInventory();

// Bu fonksiyonda çok kritik iki yazılım mantığı öğreniyoruz:
// 1. return Kelimesinin Gücü (Guard Clause):
// Yazılımda return sadece bir değer döndürmek için kullanılmaz. Fonksiyonun içine koyduğun bir kontrol (if) başarısız olursa, return yazarak "Hey bilgisayar, burada bir hata var, fonksiyonu hemen şimdi bitir ve aşağıdaki kodları çalıştırma!" demiş olursun. Eğer return koymasaydık, paranız eksiye düşerdi ve yine de kalkan satın alırdınız.
// 2. .push() Fonksiyonunun Gerçek Hayattaki Karşılığı:
// Diziler (Array) dinamik yapılardır. Başlangıçta en üstte let spaceshipInventory = []; diyerek boş bir sırt çantası açmıştık. .push("Schild") komutu, o boş çantayı açıp içine üzerinde "Schild" yazan bir karton bırakmak gibidir. Çantanın boyutu otomatik olarak 0'dan 1'e yükselir. // ARRAY Mantığını öğrenmek çok önemli..!!




// Bu fonksiyon envanterdeki (0. sıradakini "Schild'i") siler ve uzaya fırlatır.
function notfallAbwurf() {
   // Kontrol: Çantada fırlatacak eşya var mı? (Uzunluğu 0'dan büyük mü?)
  if (spaceshipInventory.length > 0) {
    
    zeigeFehler(""); // Eski hataları temizle

    // .shift() dizinin en başındaki elemanı koparır ve 'abgeworfenesItem' içine yazar
    let abgeworfenesItem = spaceshipInventory.shift();
    
    console.log("Notfall! Folgendes Item wurde im Weltall abgeworfen: " + abgeworfenesItem);

  } else {
    // Çanta boşsa fırlatacak bir şey yoktur, hatası basacak!!!!!!!

    zeigeFehler("Fehler: Das Inventar ist komplett leer!");
  }
}

// Bu fonksiyon, parametre olarak gelen eşyayı envanterin en BAŞINA (0. sıraya) ekler.
function vipLagerung(wertvollesItem) {
  
  // .unshift() belirtilen elemanı dizinin en önüne sıkıştırır, diğer elemanlar bir arkaya kayar
  spaceshipInventory.unshift(wertvollesItem);
  
  console.log("VIP Item am Anfang des Inventars hinzugefügt: " + wertvollesItem);
}
