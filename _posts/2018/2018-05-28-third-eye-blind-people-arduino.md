---
layout:     post
title:      "Third eye for blind people"
date:       2018-05-28 12:31:19
summary:    "Aplicatie ce identifica obstacolele cu Arduino, senzori ultrasonici pentru persoane cu dizabilitati de vedere."
categories: research
redirect_from: /research/2018/05/28/third-eye-for-blind-poeple-arduino/
---

## Senzori ultrasonici - Arduino

## Pentru depistarea obstacolelor, in supervizarea

## motricitatii persoanelor cu dizabilitati

Militaru Bogdan Alexandru
Facultatea de Electronica Calculatoare si Telecomunicatii
Specializarea Inginerie Electrica si Sisteme Inteligente
Disciplina Senzori Inteligenti


## Cuprins

#### Senzori ultrasonici - Arduino 	1


##### 1. Cerinte de proiectare 	3


##### 2. Introducere 	4


##### 3. Sisteme existente 	5


##### 4. Aspecte teoretice 	5


##### 4.1. Arduino Pro Mini 	5


##### 4.2. Senzor Ultrasonic 	6


##### Tipurile de senzori ultrasonici Microsonic: 	6


##### 5. Proiectare 	11


##### 5.1. Diagrama de circuit 	12


##### 5.2. Montaj 	13


##### 5.3. Programarea microcontrolleruli Arduino 	14


##### Bibliografie 	


## 1. Cerinte de proiectare

Se doreste realizarea unei aplicatii capabile sa identifice obstacolele aparute in calea unei
persoane cu dizabilitati de vedere cu ajutorul unui microcontroler, Arduino si senzori ultrasonici
pentru masurarea distantei fata de obstacole.

Conceptul de utilizare consta in utilizarea a 6 module, plasate pe corpul persoanei in zonele
cu un grad de accidentare ridicat:

- Umeri
- Genunchi
- Palme

Utilizarea unui modul pe una din palme este vitala deoarece, de obicei persoanele cu
dizabilitati incearca sa identifice prin atingere, posibilele obstacole aflate in cale, astfel senzorii vor
identifica obstacolul inainte de contactul fizic al persoanei cu obiectul.


## 2. Introducere

Proiectul ce va fi descris in randurile urmatoare se doreste a fi o tehnologie portabila pentru
oamenii cu dizabilitati de vedere. Ideea din spatele acestei tehnologii o reprezinta nevoile tot mai mari
ale acestor oameni in zilele noastre, deoarece tehnologia avanseaza insa adaptarea la noile conditii
poate fi dificila chiar si pentru cei fara probleme vizuale, masinile electrice nu produc zgomot, la
supermaket avem usi ce se deschid pe senzor, usile liftului pot pune mari dificultati chiar si oamenilor
fara un handicap vizual. Astfel un proiect de o asemenea anvergura se considera necesar.

Proiectul propune crearea unor dispozitive portabile ce pot fi montate in mai putin de 1 minut
de oricine si se bazeaza pe unde cu ultrasunete pentru a depista obstacolele din jur, in cazul in care
unul dintre echipamente depiseazata un obstacol, soneria acestuia va produce un sunet asemanator
senzorilor de parcare utilizati in industria auto, pentru a atentiona individul ca se apropie de un
pericol. Modalitatea de prindere este una foarte simpla cu ajutorul unei bande elastice, se introduce pe
mana sau picior.

Conform statisticilor aproximativ 39 de milioane de oameni sufera ce aceasta boala pe glob.
Aceste persoane sufera foarte mult in timpul unei zile, din cauza problemelor de deplasare ingreunate.
Pana acum, persoanele foloseau celebrul baston alb, despre care se poate spune ca a fost unul foarte
eficient pentru o perioada lunga de timp, insa cu toate acestea, prezinta o multime de dezavantaje. O
alternativa era utilizarea animalelor de companie, precum cainii, insa costurile de intretinere sunt
destul de mari. Astfel principalul obiectiv in dezvoltarea acestui proiect consta in realizarea unui
dispozitiv ieftin si eficient care sa ofere un comfort in plimbari, viteza si incredere.

Acest tip de proiect reprezinta un concept destul de nou, neabordat de foarte multe persoane,
insa pe internet exista cateva reverinte [1], [2]. Exista cu siguranta o multitudine de sisteme pe piata,
in acest moment care incearca sa rezolve acest handicap vizual, insa cele mai multe dintre ele au
deficiente precum: greutate prea mare in transport sau necesitatea unui instructaj amanuntit in
prealabil.

![general concept](/images/Page-3-Image-1.png)

O particularitate a acestui proiect o reprezinta faptul ca este accesibila tuturor, costurile de
productie fiind sub 100lei ( 20€ ). Iar avantajul particular il reprezinta faptul ca este usor de montat,
transportat si utilizat.

## 3. Sisteme existente

Asa cum am prezentat anterior in intorducere, exista cateva posibile modalitati de a rezolva
problema persoanelor cu dizabilitati de vedere, precum basoton, caine de companie sau dispozitive
smart.

**Bastonul**

Acesta este cu siguranta unul dintre cele mai utilizate dispozitive de catre nevazatori, insa exista
foarte multe dezavantaje in utilizarea unui astfel de dispozitiv. Unul dintre principalele sale
dezavantaje o constutie faptul ca aria de detectie este foarte restransa, campul senzorial fiind detectat
doar in fata utilizatorului si doar pe o zona restransa, in care se afla varful bastonului, ceea ce face ca
utilizatorul sa fie nevoit sa miste continuu bastonul pentru a acoperi o arie suficienta pentru o
deplasare sigura. Un alt dezavantaj il constituie faptul ca intotdeauna una din maini este ocupata cu
bastonul si astfel utilizatorului nu ii este oferita o libertate de care are nevoie. Alte probleme ce pot
aparea sunt fisurile sau ruperea acestuia, blocarea bastonului in tufisuri, boscheti, gropi, etc.

**Caine de companie**
Cainii sunt cu siguranta o modalitate foarte buna de depalsare si ajutor pentru persoanele cu
dizabilitati vizuale, insa costurile de intretinere si chiar achizitonare sunt destul de mari, deoarece
dresajul pentru ca animalul sa fie capabil sa ofere incredere si suport este foarte scump.

## 4. Aspecte teoretice

### 4.1. Arduino Pro Mini

Arduino este o companie open-source care produce atât plăcuțe de dezvoltare bazate
pe microcontrolere, cât și partea de software destinată funcționării și programării acestora. Pe lângă
acestea include și o comunitate uriașă care se ocupă cu creația și distribuirea de proiecte care au ca
scop crearea de dispozitive care pot sesiza și controla diverse activități sau procese în lumea reală.

Aceasta este versiunea Arduino Mini produsa de Sparkfun. Este proiectata special pentru a
obtine performanta la cost redus. Platforma Arduino Pro Mini este identica cu Arduino Mini din punct


de vedere al pinilor, doar ca dispune de un procesor ATMEGA 328 (in loc de 168). Pentru programare
este necesar un conector FTDI.[5]

**Specificatii**

- ATMega328 la 16 MHz
- suporta auto-reset
- regulator 5V
- suporta maxim 150 mA in curent de iesire
- protectie la supracurent
- protectie la inversarea polaritatii

### 4.2. Senzor Ultrasonic

Senzorii ultrasonici emit pulsatii acustice scurte, de inalta frecventa, la intervale de timp
regulate. Acestea se propaga prin aer cu viteza sunetului. Daca lovesc un obiect, acestea sunt
reflectate inapoi ca semnale ecou la senzor, care calculeaza distanta pana la obiect pe baza intervalului
de timp dintre emiterea semnalului si receptarea ecoului.

Deoarece distanta pana la obiect este determinata prin masurarea timpului de deplasare a undelor si nu
prin intensitatea sunetului, senzorii ultrasonici sunt excelenti pentru eliminarea interferentelor de
fundal.
In principiu, toate materialele care reflecta sunetul pot fi detectate, indiferent de culoarea lor. Chiar si
materialele transparente sau folii subtiri nu reprezinta nicio problema pentru un senzor ultrasonic.
Senzorii ultrasonici Microsonic sunt potriviti pentru distante de la 30 mm pana la 10 m si deoarece
masoara timpul de deplasare, ei pot efectua o masuratoare cu precizie ridicata. Unii dintre senzorii
nostri pot sa determine semnalul cu o precizie de mai putin de 0.18 mm.
Senzorii ultrasonici pot sa vada prin aer plin de praf si prin vapori de cerneala. Chiar si depuneri
subtiri pe membrana senzorului nu afecteaza functionarea acestuia.
Senzori cu o zona fara vizibilitate de doar 30 mm si o dispersie a undelor foarte ingusta gasesc astazi
aplicatii complet noi: masurarea nivelurilor in cutiile de iaurt si eprubete precum si scanarea sticlelor
mici in sectorul de ambalare - nicio dificultate pentru senzorii nostri. Sunt detectate chiar si firele
subtiri.

#### Tipurile de senzori ultrasonici Microsonic:

- Senzori ultrasonici de tip reflexiv;


Reprezinta metoda clasica de detectie. Prin aceasta metoda contactul este activat, imediat ce obiectul
este localizat în aria de detecţie presetată.

- Senzori ultrasonici de tip fereastra;

Prin acest mod contactul este activat, cand obiectul este localizat intr-o fereastra (zona) definita prin
doua limite. Acest mod poate fi folosit pentru a monitoriza, de exemplu, marimea sticlelor de pe o
banda rulanta (sticlele mai mari sau mai mici pot fi inlaturate). Contactul se activeaza in momentul in
care obiectul depaseste limitele definite.

- Senzori ultrasonici de tip bariera reflexiva;

In acest mod se seteaza o fereastra, definita de doua limite, in care se introduce un reflector. Orice
reflector, de exemplu si o foaie de metal. Contactul se activeaza in momentul in care obiectul de
detectat acopera reflectorul. Acest mod de detectie este adecvat pentru a detecta materiale spumoase
sau alte materiale ce au suprafete neregulate.


- Senzori ultrasonici cu iesire analogica;

Acesti senzori transmit masuratoarea ca o tensiune proporţionala (0-10V) sau curent (4...20mA).
Pentru senzorii cu iesire analogica se poate seta: fereastra apropiata si cea indepartata si respectiv
caracteristica lor daca este crescatoare sau descrescatoare. In functie de tipul senzorului si marimea
ferestrei, rezolutia se încadrează undeva între 0,025 şi 0,36 mm.

- Senzori ultrasonici de margine;

Au o constructie de tip furca si au un principiu asemanator cu senzorii de tip bariera. Sunt folositi
pentru monitorizarea de tipar si emit semnal analogic de 0-10V sau 4...20mA.

- Senzori ultrasonici de control multistrat;

Metoda de functionare este asemanatoare cu barierele uni-directionale si detecteaza una sau mai multe
straturi de obiecte care se suprapun din greseala. Sistemul de emitator-receptor poate detecta: foi,
filme, carton sau coli subtiri de metal. Iesirile de semnal sunt valabile pentru a indica straturile
multiple sau lipsa obiecteleor de detectat.


Senzorul utilizat pentru realizarea acestui proiect este HC-SR04 oferit de Sparkfun,
devoltatorii care ofera si microcontrollerul Arduino.

Acesta este un senzor de masurare cu ultrasunete. Acest senzor economic ofera functii de masurare
non-contact de la 2 cm la 400 cm, cu o precizie de actiune care poate ajunge pana la 3 mm. Fiecare
modul HC-SR04 include un transmitator cu ultrasunete, un receptor si un circuit de comanda.

Exista doar patru pini pe care trebuiesc conectati la HC-SR04: VCC (Power), Trig (Trigger), Echo
(Receive) si GND (Ground). Este foarte usor de configurat si utilizat.



## 5. Proiectare

Asa cum prezinta si titlul proiectul va fi realizat pe baza unui microcontroller Arduino si
senzori cu ultrasunete, insa pe langa aceste elemente esentiale, va nevoie de urmatoarele componente:

- Arduino Pro Mini 328 - 5V/16MHz
- Senzor cu ultrasunete HC-SR
- Hartie de prototipare
- Motoras vibrator
- Buzzer
- Led rosu 5mm
- Switch
- Conector mama 8 pozitii, o linie 0.1”
- Conector tata 40 de pozitii 1 linie 0.1”
- Fire jumber
- Baterie 3.7V
- Elastice sau abtipilduri^


### 5.1. Diagrama de circuit

Pentru inceput trebuiesc realizate conexiunile precum in figura urmatoare pentru conexiunea
microcontrolerului Arduino cu senzorii cu ultrasunete, buzzer, motorasul de vibratie, led-ul indicator
si switch-ul.

Se vor conecta la GND de pe microcontroller impantarea (GND) de la led, motorasul vibrator si
buzzer.
+VE de la led si pinul mijlociu al switch-ului se vor conecta la pinul 5
+VE de la buzzer se va conecta la primul pin al switch-ului
+VE al motorasului vibrator se va conecta la ultimul pin al switch-ului

Swtich-ul utilizat, are 2 pozitii ce permite comutarea intre buzzer sau vibrator, deoarece exista cazuri
in care persoanele au si probleme auditive sau mediul inconjurator este unul foarte zgomots.

![Diagrama schema generala](/images/Page-12-Image-15.png)

Pentru conectarea senzorului cu ultrasunete se va proceda in urmatorul mod:

Pentru alimentare se va folosi acumulatorul de 3.7V specificat in lista de necesitati. Pentru
conectivitate. Pinul GND de la microcontroller se va conecta la GND la acumulator, iar pinul +VCC
al acumulatorului se va conecta la pinul de alimentare VCC de pe microcontroller.

Senzor | Arduino
VCC | VCC
GND | GND
PIN Trig | PIN 12
PIN Echo | PIN 12

### 5.2. Montaj

Pornind de la ideea prezentata de la inceput, ca dispzitivul trebuie sa aiba dimensiuni reduse
si sa fie usor de montat si transportat, vom face montajul astfel incat dispozitivele sa ocupe un spatiu
cat mai mic, dupa cum se poate oserva in imaginile urmatoare.

Se vor monta initial pe hartia de prototipare mufele mama, buzzerul si apoi vibratorul, ledul si switch-
ul. Urmand apoi sa se faca pe spatele hartiei de prototipare conexiunile aferente intre circuite,
conform celor mentionate in schema de proiectare. Se vor adauga ulterior senzorii si microcontroller-
ul Arduino.

Acumulatorul va fi adaugat ulterior, putand fi lipit pe spatele dispozitivului cu silicon. In cazul in care
se doreste realizarea acestui proces, este importanta ca in prealabil sa se faca o protectie a circuitelor
pe spatele hartiei de prototipare, pentru a izola aparitia unor contacte nedorite dupa montajul
acumulatorului.
Dimensiunea pentru hartia de prototipare este de 5 x 3 cm.


### 5.3. Programarea microcontrolleruli Arduino

Pentru proiectarea microcontroller-ului se poate utiliza unul din mediile de programare puse
la dispozitie de dezvoltator Arduino IDE. [4]

``` C++
 const int pingTrigPin = 12 ; //Trigger connected to PIN 7

 const int pingEchoPin = 10 ; //Echo connected yo PIN 8

 int buz= 5 ; //Buzzer to PIN 4

 void setup() {
     
 Serial.begin( 9600 );

 pinMode(buz, OUTPUT);

 }

 void loop()

 {

 long duration, cm;

 pinMode(pingTrigPin, OUTPUT);

 digitalWrite(pingTrigPin, LOW);

 delayMicroseconds( 2 );


 digitalWrite(pingTrigPin, HIGH);

 delayMicroseconds( 5 );

 digitalWrite(pingTrigPin, LOW);

 pinMode(pingEchoPin, INPUT);

 duration = pulseIn(pingEchoPin, HIGH);

 cm = microsecondsToCentimeters(duration);

 if(cm<= 50 && cm> 0 )

 {

 int d= map(cm, 1 , 100 , 20 , 2000 );

 digitalWrite(buz, HIGH);

 delay( 100 );

 digitalWrite(buz, LOW);

 delay(d);

 }

 Serial.print(cm);

 Serial.print("cm");

 Serial.println();

 delay( 100 );

 }

 long microsecondsToCentimeters(long microseconds)

 {

 return microseconds / 29 / 2 ;

 }
 ```

## Bibliografie

1. Youtube - <https://youtu.be/t3j2ZW9T8CI>
2. Youtube - <https://youtu.be/_xjXieP_hY>
3. <https://create.arduino.cc/projecthub/muhammedazhar/third-eye-for-the-blind-8c246d?ref=tag&ref_id=sensor&offset=>
4. <https://www.robofun.ro/arduino-pro-mini-328-5v-16mhz.html>
5. <https://www.senzori-ultrasonici.ro/principiul-ultrasonic>
6. <https://www.electromatic.ro/component/content/article/>


