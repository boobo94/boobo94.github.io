---
title: Conceptul Thread Level Parallelism - Multithreading
date: 2017-12-08 15:00:08
tags:
    - multithreading
    - thread-level-parallelism
    - TLP
category:
    - blog
    - articles
---

## Despre articol

Student: Militaru Bogdan Alexandru

Specializare: IESI (anul I - 2017)

Profesor: Serban Gheorghe

Materie: Mecanisme Avansate in procesoare

## 1.  Introducere

In cadrul acestui articol, am abordat un subiect de actualitate, care a starnit multe interese in ultima perioada, datorita evolutiei tehnologice si al cresterii cerintelor computationale pe pietele internationale. Astfel dorinta, dar in aceiasi masura si necesitatea de a primi mai multa putere computationala intr-un aceiasi carcasa, fie ca vorbim despre o unitate desktop sau un laptop.

Subiectul pe care il voi aborda, asa cum reiese din titlu este despre paralelism la nivel de thread si presupune executia unui sistem, unei aplicatii web, aplicatii mobile sau alt tip de sistem software pe mai multe fire de executie, ruland astfel mai multe task-uri in paralel.

## 2.  Despre paralelism computational. Concept General

Paralelismul computational este un tip de calcul in cadrul caruia mai multe calcule sau mai multe procese sunt executate simultan. Probleme ample, pot fi deseori divizate in unele mai mici, care pot fi rezolvate in acelasi moment de timp. Exista mai multe tipuri de paralelism: bit-level, instruction-level, data si task-parallelism, insa pe parcursul acestei lucrari, voi dezbate intens tipul instruction-level, din apartenenta caruia face parte multithreading-ul.

Paralelismul a fost utilizat pentru multi ani, in mod special, in aplicatii de nivel inalt, dar interesul pentru el a venit mai tarziu datorita constrangerilor fizice de a preveni scalarea frecventei. Asa cum consumul de putere al computerelor a devenit o ingrijorare in ultimii ani, paralelismul computational a devenit o paradigma dominanta in arhitectura calculatoarelor, cea mai intalnita forma fiind procesoare multi-core.

Paralelismul computational este de multe ori asociat concurentei computationale, sunt folosite deseori impreuna, insa nu reprezinta acelasi lucru, cele doua putand fi utilizate si separat.

## 3.  Thread

Termenul thread (fir de executie tradus in limba romana) defineste cea mai mica unitate de procesare, ce poate fi programata spre executie de catre un sistem de operare. Este folosit in programare pentru a eficientiza executia programelor, executand portiuni distincte de cod, in paralel in interiorul unui proces. Cateodata insa, aceste portiuni de cod care constituie corpul thread-urilor, nu sunt complet independente si in anumite momente ale executiei, se poate intampla ca un thread sa necesite resurse ce sunt furnizate ca rezultat al unui alt thread, pentru a putea continua executia sa. Aceasta tehnica prin care un thread asteapta executia altor thread-uri inainte de a continua propria executie se numeste **sincronizarea thread-urilor.**

Exista diferente intre thread-uri si clasicele procese gestionate de sisteme de operare ce suporta multitasking:

-   in principal prin faptul ca toate thread-urile asociate unui proces folosesc acelasi spatiu de adresare. 
-   procesele sunt in general independente, in timp ce thread-urile sunt asociate unui unic proces.
-   procesele stocheaza un numar semnificativ de informatii de stare, in timp ce thread-urile dintr-un proces impart aceiasi stare, memorie sau resurse.
-   procesele pot interactiona numai prin mecanisme de comunicare speciale, oferite de sistemul de operare (semnale, semafoare, cozi de mesaje, etc..).
-   deoarece impart acelasi spatiu de adresare, thread-urile pot comunica prin modificarea unor variabile asociate procesului si se pot sincroniza prin mecanisme proprii
-   in general este mult mai simplu si rapid schimbul de informatii intre thread-uri decat intre procese

###  3.1. Mod de functionare

Thread-urile, precum si procesele au stari ce pot fi sincronizate pentru a evita problemele ce pot aparea datorita faptului ca impart diverse resurse. In general fiecare fir de executie are o sarcina specifica si este programat astfel incat sa optimizeze utilizarea procesului. Principalele stari ale unui fir de executie sunt: Activ, Pregatit si Blocat.

**Schimbarea unei stari**

-   *Crearea*: atunci cand un proces este pornit, se creeaza un thread pentru acel proces. Apoi, acel thread poate crea si gestiona mai multe thread-uri, fiecare avand pointeri catre instructiunile specifice lui.
-   *Blocarea*: atunci cand un thread trebuie sa astepte altul, este salvat in stiva pointerul la acesta. Functia de blocare se poate executa atat din interorul cat si din exteriorul threadului.
-   *Deblocare*: un thread blocat poate fi deblocat un urma unei comenzi externe.
-   *Finalizarea*: momentul in care un thread si-a finalizat ciclul de viata si memoria alocata acestuia este eliberata.

Atat la blocarea cat si la deblocarea thread-urilor, acestea pot primi prioritati de executie, insa aceasta metoda este ineficienta, deoarece procesorul tot va comuta de la un thread la altul, operatie ce va ocupa cicli de procesor. Cu varianta din urma insa, se vor evita mai usor erori de programare prin care doua sau mai multe thread-uri se vor astepta intre ele, blocand un proces intreg - deadlock.

### 3.2. Tipuri de fire de executie

Exista doua tipuri principale de thred-uri:

-   La nivel de utilizator(aplicatie)

Se mai numesc si fibre in sistemele de operare din familia Windows. Acestea sunt gestionate de codul aplicatiei si trecerea de la un thread la Altul nu necesita apeluri la sistemul de operare sau intreruperi ale kernelului. Defapt, kernelul gestioneaza aceste threaduri ca procese diferite cu un singur fir de executie.

**Avantaje**:

-   Pot fi implementate si in sisteme de operare care nu suporta aplicatii multithread
-   Reprezentare si gestionare usoara
-   Trecerea de la un thread la Altul se face printr-un simplu apel al unei proceduri

**Dezavantaje**:

-   Lipsa unei coordonari intre kernel si threaduri, deci nu poate fi controlata prioritatea de procesare a acestora
-   Blocarea unui thread ce apeleaza o functie a kernelului poate duce la blocarea sistemului, chiar daca in kernel exista si alte procese ce pot fi rulate

-   La nivel de kernel

Nucleul sistemului de operare gestioneaza functionarea firelor de executie si in locul unui tabel cu firele de executie pentru fiecare proces in parte, sistemul detine un tabel ce pastreaza toate thread-urile din sistem.

**Avantaje**:

-   Datorita faptului ca sistemul cunoaste toate thread-urile, se va optimiza gestionare acestora, prioritizand acele procese ce au mai multe thread-uri.
-   Thread-urile la nivel de kernel sunt recomandate pentru acele aplicatii ce se blocheaza des.

**Dezavantaje**:

-   Sunt ineficiente si se proceseaza greoi, spre exemplu, operatiile ce tin de gestionarea thread-urilor sunt de o suta de ori mai incete decat cele ale fibrelor.
-   Datorita faptului ca nucleul trebuie sa gestioneze si procesele si threadurile, complexitatea kernelului va creste semnificativ.

O abordare combinata a celor doua se numeste proces de categorie usoara, in care threadurile nucleului sistemului de operare sunt date spre procesare si care, la randul lor, gestioneaza firele de executie ale altor aplicatii.

##  4. Prezentarea modelului TLP (Multithreading)

Thread-Level Parallelism (TLP) este o compatibilitate software care permite programelor de nivel inalt, precum baze de date, sisteme software, aplicatii web sau mobile sa lucreze pe mai multe thread-uri (fire de executie), fiecare avand propria sectiune de timp in care este menit sa lucreze.

Evolutia tehnologica, aflata in plin proces in zilele noastre este cea datorita careia beneficiem de aparitia modelului multithreading, deoarece odata cu cresterea capabilitatilor procesoarelor, au crescut si cererile de performanta, asta ducand la solicitarea maxima a resurselor unui procesor. Fiind vorba de procesoare performante, dorinta dar si necesitatea de a executa taks-uri din ce in ce mai complexe a produs o noua problema ce trebuia rezolvata - timpul mare de asteptare pe care utilizatorul il sesiza, in momentul in care un astfel de proces era in executie si incapacitatea procesorului si implicit a computerului de a raspunde la noi cereri. Foarte repede a fost observat potentialul principiului de paralelizare a unui proces atat la nivel de instructiune cat si la nivel de fir de executie. Firul de executie sau thread-ul este un mic proces sau task, avand propriile instructiuni si date. 

Aceasta importanta acordata multiprocesoarelor a crescut timpul anilor 1990, deoarece proiectantii cautau o modalitate de a construi servere si supercomputere care sa dobandeasca performante mai inalte decat un singur microprocesor, in timp ce exploateaza avantajele extraordinare pret-performanta ale unui singur microprocesor. Aceasta creste importanta a multiprocesoarelor se reflecta asupra catorva factori importanti:

-   Eficienta dramatic de scazuta in utilizarea siliconului si a energiei contorizate intre 2000 si 2005 de proiectanti, care au incercat sa gaseasca si exploateze mai mult paralelismul la nivel de istructiune (ILP), care a aratat de fapt ca este ineficient, deoarece puterea si siliconul cresteau mult mai rapid decat performanta. Pe de alta parte fata de ILP, singura scalabilitate si drum ca scop general pe care il cunoastem este sa creste performanta vitezei, fata de ceea ce accepta tehnologia de baza prin multiprocesare.
-   Cresterea intereselor pentru serverele de nivel inalt precum sisteme cloud si software-as-service a devenit mai semnificativa.
-   Cresterea applicatiilor data-intensive ce duc spre disponibilitatea unei cantitati impresionnte de date pe Internet.
-   O intelegere asupra cresterii performantelor pe desktop este mai putin importanta ( exceptand ramura grafica, cel putin), datorita performantelor existente acceptabile sau datorita aplicatiilor de nivel inalt si cu manipulare intensa de date care sunt rulate in cloud.
-   O intelegere mai buna despre cum sa folosim multiprocesoarele eficient, in special in mediile de tip server, unde exista un paralelism natural, a rasarit pe un domeniu larg.
-   Avantajul de a optimiza investitia proiectarii prin copiere, decat prin design unic; toate multiprocesoarele ofera acelasi design de mecanisme.

### 4.1. Provocari in Procesarea Paralela

Aria aplicatiilor multiprocesor de la taskuri ce ruleaza independent, in special fara comunicare, pana la a rula programe in paralel, unde thread-urile trebuie sa comunice pentru a finaliza task-ul. Doua obstacole importante, ambele explicabile cu legea lui Amdahl, fac din procesarea paralela o provocare. Gradul in care aceste obstacole sunt dificile sau usoare este determinat in ambele cazuri de aplicatii si de arhitectura.

Primul obstacol tine de limitarea ce apare in paralelismul din cadrul programelor, iar al doilea apare din costul relativ ridicat al comunicarii. Limitarile din paralelsimul disponibil fac dificila optinerea unei viteze bune in orice procesor paralel.

*Exemplu*: Daca doresti sa obti o viteza de 80 cu 100 de procesoare.Ce fractie a calculului original poate fi secventiala:

*Raspuns*: Conform legii lui Amdahl :

Pentru a simplifica acest exemplu, asumam ca programul opereaza in ambele moduri: paralel cu toate procesoarele utilizate complet, care este modul imbunatatit sau serial cu un singur procesor in uz. Cu aceasta simplificare, viteza in modul imbunatatit este simplificata de numarul de procesoare utilizat, in timp ce fractia in modul imbunatatit este timpul trecut in modul paralel. Substituind in ecuatia anterioara obtinem:

Simplificand aceasta ecuatie rezulta:

Deci pentru a obtine o viteza de 80 din 100 de procesoare, 0.25% din calculul original poate fi secvential. Bineinteles, pentru a obtine o viteza liniara(vitaza de n cu n proceosoare), intregul program trebuie sa fie de obicei paralel fara portiuni seriale. In pratica, programele nu doar ca opereaza in totalitate in paralel sau secvential, dar deseori folosesc mai putin de complementul intreg al procesoarelor cand ruleaza in modul paralel.

Cea de-a doua mare provocare in procesarea paralela implica o latenta mare a accesului de la distanta intr-un procesor paralel. In multiprocesoarele existente cu memorie distribuita, comunicatia intre nuclee diferite poate costa intre 35 si 50 de cicluri de ceas si printre nuclee, pe chip-uri separate oriunde din 100 de cicluri de ceas la fel de mult ca 500 sau mai multe cicluri de ceas, depinzand de mecanismul de comunicare, tipul retelei interconectate si de scara multiprocesorului. Efectul intarzierii in comunicatie este clar.

*Exemplu*: Sa presupunem ca avem o aplicatie ruland pe un multiprocesor cu 32 de procesoare, care are 20ns timp sa manipuleze referintele la memoria la distanta. Pentru aceasta aplicatie, presupunem ca toate referintele, exceptand pe acelea care implica comunicarea in ierarhia memoriei locale, care este destul de optimista. Procesoarele sunt blocate pe o cerere la distanta si ceasul procesorului are o rata de 3.3GHz. Daca CPI the baza este 0.5, cat de repede este multiprocesorul, daca nu exista comunicatiei versus daca 0.2% din instructiuni implica o referinte la o comunicatie la distanta.

*Raspuns*: Este mai simplu sa calculam la inceput ciclurile de ceas per instructiune. Efectivul CPI pentru multiprocesor cu 0.2% referinte la distanta este:

Costul cererii la distanta este:

Asadar putem calcula CPI

Multiprocesorul cu toate referintele locale este 1.7/0.5=3.4 ori mai rapid. In practica analiza performantei este mult mai complexa.

## 5. Tipuri de Multithreading

### 5.1. Pipeline

In primul paragraf al acestui capitol am facut referire la o tehnica utilizata in modelul paralel, anume pipeline. Conceptul pipeline in design-ul procesoarelor si altor dispozitive electronice descrie modalitatea de crestere a numarului de instructiuni ce pot fi executate intr-o unitate de timp. In acest mod de lucru se executa simultan, dar decalat mai multe instructiuni, acest lucru fiind permis la nivel software, fara a fi nevoie de componente hardware suplimentare. Acest model poate fi inteles mai usor in imaginea urmatoare: 

Figura 1 - Multithreading in modul pipeline

Aceasta tehnica este menita sa creasca viteza totala de executie a procesoarelor, fara a ridica tactul. Ea consta in subdivizarea ficarei instructiuni intr-un numar de etape sau segmente, fiecare etapa fiind executata de cate o unitate functionala separata a procesorului. Segmentele pipeline sunt conectate intre ele intr-un mod analog asamblarii unei conducte de segmente de tevi (traducerea libere din limba engleza fiind "conducta de petrol"). Segmentele tipice de executie ale unei instructiuni masina pe un procesor sunt:

-   FI (fetch instruction = aducere instructiune) - se refera la un ciclu special in care procesorul citeste din memorie instructiunea urmatoare ce trebuie executata.
-   DI (decode instruction = decodare instructiune) - in aceasta etapa instructiunea este recunoscuta si procesorul colecteaza toate informatiile necesare pentru executarea ei.
-   CO (calculate operand address = calculare adresa operand) - se calculeaza adresa de memorie de unde se aduce primul operand.
-   FO (fetch operand = aducere operand) - citeste operandul aflat in memorie la adresa calculata in pasul anterior.
-   Daca e nevoie CO si FO se repeta si pentru ceilalti operanzi
-   EI (execute instruction = executa instructiune) - executia propriu-zisa a instructiunii inclusiv calculul rezultatului ei.
-   WO (write operand = scriere operand) - scrierea rezultatului inapoi in memorie.

Principiul se bazeaza pe faptul ca fiecare din aceste operatii lucreaza in principiu cu alte resurse, deci cu ajutorul tehnicii potrivite, se pot executa de la 2 la 6 operatii in paralel. La un moment dat ele se afla in executie in etape diferite, in cazul cel mai fericit la un moment dat exista cate o instructiune tratata in fiecare etapa a pipeline-ului. Desi executia unei instructiuni de la inceput pana la sfarsit necesita de obicei mai multe etape, instructiunea urmatoare poate incepe sa fie executata imediat ce instructiunea anterioara a trecut de prima etapa (nu e nevoie sa astepte sa se termine complet cea anterioara).

**Avantaje**

Rata de executie a instructiunilor creste daca se foloseste o arhitectura de tip pipeline. Unele circuite combinationale cum ar fi sumatoarele sau multiplicatoarele fpot fi facute sa functioneze mai rapid prin marirea complexitatii circuitelor electronice respective, dar daca se foloseste pipelining se poate obtine acelasi spor de performanta fara a creste complexitatea.

**Dezavantaje**

In cadrul dezavantajelor in logica pipeline, cel mai intalnit este hazardul, care consta in aparitia unor stari neasteptate in momente de timp in care resursele sunt insuficiente pentru executia tuturor firelor de executie ce apartin aceluiasi piepline.

-   **Hazarde structurale** - Apar cand o anumita resursa este ceruta de mai multe instructiuni in acelasi moment. Anumite resurse sunt duplicate tocmai pentru a fi evitate astfel de hazarde. O metoda clasica de a evita hazardele ce implica accesul la memorie este aceea de a avea cate o memorie de tip cache separat pentru instructiuni si pentru date.
-   **Hazarde de date** - Acest tip de hazard apare cand unul dintre firele de executie este dependent de rezultatul unui alt fir de executie care nu a terminat de procesat datele.
-   **Hazarde de control** - Sunt produse de instructiuni de salt, atunci cand se executa un salt, pipeline-ul trebuie golit si umplut cu instructiunea urmatoare de la adresa de memorie la care se face saltul.

### 5.2. Single Processor Multithreading

#### 5.2.1. Multithreading cu granulatie fina

Programarea multipla a aparut pentru ca resursele principale din sistem la momentul respectiv, defineau procesorul, si nu trebuia sa ramana idle cant taskurile I/O erau executate. Scoup multithreading-ul este similar, scopul acestuia este de a tolera operatiile de inalta latenta.In granulatie fina, de indata ce fluxul de instructiuni intr-un fir de executie incepe sa fie intarziat pentru cel Putin un ciclue, controlul procesorului este dat de alt thread. Evident, un astfel de schimbare a threadului nu trebuie sa nu consume mult timp.

Prima implementare a multithreading-ului cu granulatie fina, a avut un thread de schimbare la fiecare ciclu. PPU (pheripheral processor units) arata ca fiecare thread trebuie sa aiba propriul sau set de registrii si innumarator de program. Mai mult, numarul de thread-uri gata de executie la un moment de timp trebuie sa fie capabile sa ascunda latenta celei mai lungi operatii. Aceasta operatie lunga trebuie sa fie operata in pipeline, astfel incat cateva thread-uri pot fi in proces de a executa o instanta pe el. Deoarece schimbarea intre threaduri pot avea loc ciclu dupa ciclu, instructiunile trebuiesc procesate, asa ca acolo nu e nevoie sa se elibereze pipeline-ul. Fiecare instructiune trebuie sa aiba atasata o etichetea de identificare a curentului din care face parte.

Acest tip de multithreading isi propune sa imbunatateasca tranzitia si se bazeaza pe presupunerea ca sunt suficente thread-uri disponibile. Este o potrivire preferata pentru aplicatii "embarrassingly parallel", care constituie o cantitate echitabila a sarcinilor executate ale unui supercomputer.

Ca o recapitulare, multithreading-ul cu granulatie fina este un model arhitectural bun pentru a rula aplicatii pe care se pot extrage un numar mare de threadu-uri, asa cum este cazul aplicatiilor stiintifice, sau pentru a rula multiprograme, unde fiecare proces necesita o latime de banda semnificativa pentru memorie si o putere computationala scazuta a procesorului.

#### 5.2.2. Multithreading cu granulatie aspra

In multithreading-ul cu granulatie aspra schimbarea thread-ului nu va avea loc la fiecare ciclu, ci doar cand cand thread-ul curent intampina o peratie cu latenta mare. Aici mare este reltiv si depinde de implementarea procesorului, suportul hardware oferit catre fiecare thread (acesta este, timpul in care se face tranzitia threadului catre altul), si timpul de acces catre diferite parti ale memoriei precum cache sau TLB.

Intr-un procesor ordonat, cateva thread-uri pot ocupa etape diferite ale pipeline-ului atata timp cat instructiunile transporta etichete pentru a identifica setul de registrii atasat tredului corespondent. Deci in teorie, un procesor multithread cu granulatie va schimba tread-ul instant, asmenea in cazul multithreading-ului cu granulatie fina. Una dintre problemele sale, este accea ca toate instructiunile din pipeline, dupa ce instructiunea ce a declansat schimbarea threadului trebuiesc golite si bufferul de instructiuni per context. Cu toate acestea, va exista un o cost de inceput definit pentru a umple pipeline-ul.

Prima implementare al acestui tip de multithreading a fost facut pe un multiprocesor de cercetare, masina Alewife de la MIT, la inceputul anului1990. O implementare comerciala si mult mai completa poate fi gasita intr-o variate de multiprocesoare IBM PowerPC. In contextul de a fi capabil sa execute sisteme software curente, thread-urile au fost considerate ca si cand ar fi rulate pe un multiprocesor, un concept similar cu cel oferit de Alewife. Procesoarele in-order suporta doar doua contexte, astfel un singur bit era suficient sa indice care thread ruleaza in ficare parte ale celor 5 stari din pipeline.

1.  neordonat, superscalarul ( n este latenta cache-ului lipsa L2, care nu poate fi ascuns)
2.  Multithreading-ul cu granulatie fina ( 6 thread-uri, ocupand 6 stari in pipeline)
3.  Multithreading cu granulatie aspra ( m este costul de start pentru un nou thread)
4.  Multithreading simultan cu 4 threaduri

#### 5.2.3 Multithreading simultan

In figura anterioara (a) am aratat un exemplu de ocupare a stadiului de emitere al unui pipeline al unui microprocesor cu patru cai in afara ordinii. Un rand din cifra reprezinta ocuparea scenei la un anumit moment (un patrat gol reprezinta un spatiu de eliberare vacant), iar randurile consecutive reprezinta cicluri consecutive. Dupa cum se poate observa, nu toate sloturile sunt ocupate intr-un ciclu dat. Cauzele ar putea fi ca exista o disputa pentru unele unitati functionale sau ca un pericol de date impiedica emiterea unor instructiuni. De exemplu, este posibil ca doar incarcarile si adaugarile sa fie gata pentru a fi executate si exista doar o unitate de impartire si o unitate de incarcare. In al doilea rand, un intreg rand (adica un ciclu intreg) poate trece fara instructiuni. Cauzele acestei situatii ar putea fi din nou pericole de date, de exemplu, asteptand ca datele sa provina din cache-ul L2 sau ciclurile petrecute in recuperarea de la o ramura gresita. Intr-un rand, am prabusit in randuri consecutive pentru a reprezenta impiedicarea din cauza unui L2 dor. Numarul de cicluri goale, n, ar trebui sa fie mai mic decat latenta de a accesa memoria principala (de ordinul a sute de cicluri), dar poate fi destul de semnificativa.

Intentia multithreading este de a reduce pierderea de performanta datoritt acestor n cicluri goale. In multithreadingul cu granulatie fina prezentat in figura anterioara (b), nu exista randuri goale - daca exista suficiente fire pentru a acoperi ciclurile n goale. Aceasta ar putea fi o comanda inaltt dact n este de ordinul a mai multe sute de cicluri, chiar daca trecem de la un fir la altul numai la aparitia unui pericol de date. Deoarece MT cu granulatie fina implica un procesor in ordine, randurile sunt mai putin umplute decat cu superscalar.

Un multithreading cu granulatie multipla este reprezentat in figura (c). Are un model similar cu cel al superscalarului, cu exceptia faptului ca numarul de randuri goale la aparitia unui eveniment de latenta lunga este mai mic. Aici m este numarul de cicluri necesare pentru reumplerea conductei pe un comutator de fir daca procesorul este unul in ordine sau pentru a spala si reumple daca procesorul este nefunctional. m este intotdeauna mai mica decat n, dar - asa cum am vazut anterior - exista costuri hardware suplimentare pentru implementarea multi-threading si, de asemenea, castigurile pot sa nu fie la fel de mari cum era de asteptat, deoarece unele structuri de date hardware trebuie impartite intre fire , diminuand astfel beneficiile de performanta.

Pentru a umple atat sloturile orizontale (adica cele care sunt lasate goale, deoarece nu exista instructiuni suficiente pentru a emite intr-un fir unic) si sloturile verticale (adica randuri goale datorate latentelor, cauzate in cea mai mare parte de pierderile de cache si mispredic - trebuie sa avem mai multe fire care ocupa capatul din fata si capatul din spate al conductei in acelasi timp. Aceasta noua organizatie se numeste multitreading simultan (SMT). Efectele sale sunt prezentate in Figura 8.1 (d). Dupa cum se poate observa, aproape toate sloturile sunt acum ocupate. Sloturile de posturi vacante (inclusiv unele cicluri posibile complet goale pe care nu le-am aratat) s-ar putea datora unor riscuri structurale - de exemplu, toate firele eligibile care solicita aceleasi resurse sau toate firele care asteapta pierderea cache-ului.

Cat de mult mai mult hardware si logica este necesara pentru a implementa caracteristicile SMT peste un microprocesor obisnuit out-of-order? Nu la fel de mult ca cineva ar crede, in cazul in care numarul de fire care pot executa simultan este limitat. Implementarile comerciale ale SMT sunt limitate la doua fire, cum ar fi Intel Penium 4 si Intel Core (unde SMT se numeste hiperthreading) si IBM Power5. A fost planificata o implementare cu patru fire pentru un succesor al DEC Alpha 21364, dar compania a fost vanduta Intel inainte de fabricarea procesorului. Se estimeaza ca un Pentium 4 cu doua fire necesita o logica suplimentara de 5%, iar predictia a fost ca includerea unui SMT cu patru fire in Dec Alpha ar fi adaugat 8-10% la cantitatea de hardware necesara pentru procesor.

Intr-un procesor SMT, unele dintre resursele hardware trebuie replicate, iar unele pot fi partajate in totalitate, asa cum s-ar putea face pentru multithreading-ul cu granulatie grosiera. Totusi, deoarece mai multe fire pot folosi conductele simultan, unele resurse care au fost dedicate in totalitate thread-ului executant in prezent in implementarea cu granulatie grosiera trebuie acum fie partajate, fie partitionate intre fire.

Amintiti-va ca in multithreading cu granulatie grosiera, registrele arhitecturale, contorul de programe si diverse registre de control trebuie sa fie reproduse. SMT impune aceleasi replicari. In acelasi mod, unitatile de executie si ierarhia cache pot fi partajate in totalitate, precum si alte resurse, cum ar fi registrele fizice si predictorii de ramura. Dupa cum am vazut mai devreme, TLB-urile pot fi partajate, cu includerea PID-urilor sau partitionate.

Putem analiza cerintele pentru resursele ramase trecand prin etapele principale ale conductei. Prima decizie este preluarea instructiunilor. Nu exista nici o dificultate practica in partajarea cache-ului I sau, in cazul Intel Pentium 4, a cache-ului de urmarire, desi in acest ultim caz fiecare fir trebuie sa aiba un indicator propriu de cache. Totusi, fiecare fir trebuie sa aiba propriul tampon de instructiuni. Impartirea unui tampon de instructiuni intre firele active nu este practica atunci cand se efectueaza umplerea cu prefetching si atunci cand se produce o spalare pe o ramificatie de eroare a ramificatiei. Chiar si cu tampoane de instructiuni per-thread, trebuie luate cateva decizii suplimentare care nu au fost necesare fie pentru suprascalarii, fie pentru multithreading cu granulatie grosiera, cum ar fi ce tampon de instructiuni pentru a completa un ciclu dat si de la care instructiunile tampon de instructiuni trebuie sa se desfasoare in jos. Prima alegere este destul de usoara, pentru ca, cel mai probabil, un tampon de instructiuni unic va fi gol intr-un ciclu dat. In caz contrar, orice fel de acces de runda va fi bine. In IBM Power5, care restrictioneaza SMT la doua fire, alimentarea cu instructiuni a front-end-ului se suprapune intre cele doua fire. Un algoritm mai sofisticat, in cazul in care exista mai mult de doua fire, este acela de a favoriza firul (firurile) care au mai putine instructiuni in front-end. Odata ce o instructiune este in curs de desfasurare, ea trebuie sa poarte o eticheta care sa identifice firul de care apartine.

Dupa cum am mentionat, predictorii de ramura si tampoanele tinta de ramura pot fi partajate, cu exceptia predictorilor stack-ului de returnare. Chiar si cu etichetarea, returnarea amestecurilor din diferite fire in stiva de repatriere ar deveni rapid greoaie. In acelasi sens, logica necesara tratarii exceptiilor si intreruperilor trebuie reprodusa pentru fiecare fir.

Deplasandu-se pe front, urmatoarea etapa care necesita atentie este cea in care are loc redenumirea registrelor. In timp ce registrele fizice pot fi partajate, tabelele de redenumire trebuie sa fie individualizate cu fiecare fir. O tabela de redenumire comuna ar putea fi prevazuta, unele etichete indicand la ce fir exista un anumit registru fizic, dar dificultatile de stocare a tabelului pe o predictie a sucursalei si de restaurare a acesteia pe o eroare de fabricatie gresita fac ca solutia de partajare sa fie destul de nepalabila.

La incheierea instructiunilor de intrare, instructiunile de zbor se alatura cozilor sau o fereastra de instructiuni, unde asteapta unitati de executie gratuite si / sau disponibilitate operanda. Intr-un procesor SMT, aceste cozi trebuie impartite intre firele active. A avea cozi fizice separate pentru fiecare fir nu este cea mai buna solutie, datorita naturii dinamice a calculului prin care firele avanseaza adesea in spurturi si au nevoi diferite de ordonare in asteptare. Mai mult decat atat, un principiu de procesare SMT este acela ca ar trebui sa fie capabil sa ruleze un singur fir utilizand toate resursele disponibile, astfel incat intregitatile cozilor ar trebui sa fie disponibile pentru executia cu un singur fir. Astfel, cozile sunt partajate. Partajarea nu impiedica partajarea egala, insa o solutie mai buna decat aceea este sa permita un numar variabil de intrari cu un maxim pentru orice fir dat, astfel incat un fir sa nu ocupe intreaga coada si sa impiedice trecerea altor fire in timp ce asteapta in sine un eveniment de latenta lunga. Instructiunile de dispecerizare la unitatile de executie se intampla in acelasi mod ca si in cazul unui superscalar - de exemplu, pe baza varstei instructiunilor de gata de expediere din coada. Acest programare se poate face independent de proprietatea firului de instructiuni.

La prima vedere, unitatile de executie nu par sa necesite modificari. Cu toate acestea, trebuie sa fii atent la proiectarea unitatilor de expediere astfel incat sa se faca comparatii intre denumirile de registru ale instructiunilor aceluiasi fir. Deoarece unitatile de predare necesita o logica foarte simpla, replicarea acestora, cate una pe fir, este cea mai usoara solutie. In mod similar, ar trebui replicata logica pentru a restabili starea dupa o eroare a ramificatiei.

In cele din urma, proiectarea si verificarea unui procesor out-of-order este deja o provocare. SMT mareste dificultatile. Avand in vedere aceste considerente, nu este o surpriza faptul ca implementarile industriale s-au limitat la doua fire concurente. Cu toate acestea, un SMT cu doua fire este mai ieftin decat un procesor CMP cu doua procesoare, iar combinatia SMT si CMP pe scara mica este deja pe piata cu procesorul SMT Intel Core si IBM Power5 cu doua procesoare (sau cu patru procesoare) .

#### 5.2.4. Evaluarea performantei multithreading

In sectiunile anterioare ale acestui capitol am subliniat modul in care multithreading-ul contribuie la imbunatatirea capacitatii de productie. Figura (a) si (b) prezinta performantele relative (simulate) ale multithreading pentru procesoarele simple in comanda si superscalarii puternice in afara ordinii (in aceste simulari un procesor "complex" a fost intre 4 si 10 ori mai mare puternic decat unul "simplu"). Indicatorul de referinta este o aplicatie de baza de date de mare amploare.

Este interesant de observat ca imbunatatirea datorata multiplicarii este mai mare atunci cand procesoarele sunt simple. De exemplu, dupa cum se arata in figura (a), un procesor cu patru cai multithreaded functioneaza aproape la fel (cu 10%) ca un multiprocesor cu patru procesoare cu un singur filet. Atunci cand sunt combinate multithreading si multisprecesarea, se poate gasi o imbunatatire a factorului de 10 cu patru procesoare si patru fire, adica 16 fire. Deoarece procesoarele simple au o utilizare redusa a resurselor, pot suporta mai multe fire inainte ca performanta pe fir sa scada. Cresterea neliniara a performantei se datoreaza in mare parte cerintelor de sincronizare.

Cand procesoarele sunt mai complexe, utilizarea resurselor pe fir creste si exista mai putine oportunitati pentru firele concurente. Cu toate acestea, dupa cum se arata in figura (b), un procesor cu patru fire are un singur procesor si un procesor multiplu cu doua procesoare cu filet unic. Pe masura ce numarul procesoarelor si firelor creste, viteza relativa este mai putin pronuntata decat in ​​cazul procesoarelor simple. Rezultatele comparative de performanta intre procesoare simple si complexe sunt dificile deoarece ar trebui sa cunoastem zona si puterea disipata pe tip de procesor astfel incat sa putem stabili echivalente intre un procesor complex si cateva simple. Asa cum vom vedea in curand, exista multiprocesori comerciali cu procesoare simple sau complexe multi-procesate.

In cazul SMT, simularile unui procesor SMT cu opt fire, care pot prelua opt instructiuni pe ciclu, au aratat imbunatatiri ale capacitatii de incarcare a incarcarilor bazei de date intre 150% si 300% in comparatie cu un superscalar in afara comenzii. Mai multe masuratori realiste pe IBM Power5 au aratat ca din opt sarcini de lucru, sapte au fost imbunatatite folosind SMT. In cadrul executiei cu un singur fir, o copie a fiecarui program a fost legata de fiecare procesor. In modul SMT, o copie a programului a fost legata de fiecare context SMT. Intervalul de performanta a fost de la o degradare de 11% (o exceptie datorita ratelor foarte ridicate ale ratei pierdute in cache-urile L2 si L3, atat in ​​moduri simple, cat si in mod SMT), pana la o imbunatatire de 41%. A fost obtinuta o eficienta mai mare atunci cand numarul de erori L2 si L3 a fost mic. Masuratorile efectuate pe un procesor Intel Pentium 4 (cu doua fire) au raportat imbunatatiri ale performantelor intre 15% si 27% fata de un singur procesor Pentium 4, atat pentru aplicatiile multimedia multi-threaded, cat si pentru un set de trei aplicatii independente, cum ar fi Word, Acrobat, PowerPoint si Virus Scan care ruleaza simultan.

Am mentionat, de asemenea, ca un design bun pentru orice varietate de multithreading nu ar trebui sa impiedice performanta optima pentru executarea unui singur fir. Deoarece cele mai multe aplicatii curente sunt cu un singur filet, exemplificat de experimentul IBM Power5 din paragraful anterior, se pune intrebarea daca se poate folosi multithreading pentru a imbunatati executia cu un singur fir in absenta limbilor si a compilatoarelor care vor face multithreading explicit. Dupa cum am vazut in mod repetat in aceasta carte, o posibilitate este sa se bazeze pe speculatii.

#### 5.2.5. Multithreading Speculativ

Executia executiei realizeaza rezultate impresionante, cu hardware limitat si fara interventie software. Numai un fir de executie se executa atunci cand firul principal se opreste. Chiar si cu aceasta restrictie, unele lucrari efectuate in modul "run-ahead" sunt irosite. Atunci cand firul principal reia executia, instructiunile sunt reincadrate si rezultatele lor recuperate chiar daca erau corecte.

Cu multithreading speculative, thread-urile sunt create inaintea timpului pe care l-ar executa intr-un proces pur secvential. Intr-un anumit sens, este vorba de o extensie a executiei run-ahead, cu exceptia faptului ca (i) timpii de initiere nu sunt controlati de un procesor stinging, (ii) mai multe fire executate simultan si (iii) o parte din munca efectuata de firele speculative, si, speram, cea mai mare parte a acesteia, nu trebuie redeschisa. Desigur, deoarece mai multe fire ruleaza simultan, platforma pe care o executa trebuie sa fie fie un procesor SMT, fie o arhitectura multiprocesor.

Putem distinge intre multithreading condus de control si de date. In multithreading bazate pe control, fire noi sunt generate in anumite puncte de control in fluxul programului. Detectarea acestor puncte de control ar putea fi facilitata de compilator sau de un profilator. Desi exista un interes tot mai mare in aceasta chestiune, efortul a fost mic in aceasta directie pana in prezent. Cu toate acestea, in absenta suportului software, hardware-ul poate genera in mod speculativ fire pe structuri de flux de control usor de recunoscut. Cateva exemple care pot fi combinate sunt:

-   Cand se intalneste inceputul unei bucla: Urmatoarele iteratii de bucla pot fi pornite simultan.
-   La apelurile de procedura: firul principal este cel care executa procedura. Un fir speculativ poate fi pornit la instructiunea care urmeaza apelului.
-   Atunci cand se intalneste o ramificatie inapoi si se preconizeaza ca este luata: firul principal este cel care urmeaza ramificatia inapoi. Un fir speculativ poate porni de la instructiunile urmand ramura.

Principala dificultate cu multithreading speculativ bazata pe control apare in recunoasterea si executia relatiilor dintre producator si consumator. Aici, de asemenea, compilatorul poate ajuta prin marcarea variabilelor care sunt definite intr-un fir si care sunt utilizate intr-un fir ulterior. Comunicarea se poate face prin memorie sau prin intermediul registrelor cu scop general sau special. Cu toate acestea, compilatorul nu poate fi intotdeauna sigur ca adresele de incarcaturi si magazine sunt diferite. Aceasta problema de asa-numita disambiguare a memoriei este un obstacol bine-recunoscut in paralelizarea automata a programelor. Am vazut o aroma a modului in care poate fi rezolvata intr-un procesor out-of-order atunci cand ne-am uitat la speculatiile de incarcare (Sectiunea 5.2.2). Intr-un mediu multithreaded, versiunile temporale ale magazinelor pot fi folosite pentru a verifica si potential recupera de la dependentele magazinului de incarcare. In ansamblu, insa, mecanismele necesare pentru acest tip de multithreading sunt destul de complexe si, dupa cunostintele noastre, singura implementare industriala a conceptului a fost cea a chip-ului Sun MAJC (Microprocessor Architecture for Java Computing). In MAJC speculatia este ajutata de structura masinii virtuale in limbajul Java, care ajuta la diferentierea intre operatiunile stack si heap; Cu toate acestea, pot fi pastrate mai multe versiuni ale unei variabile de heap date.

Au fost propuse multithreadingul bazat pe date speculative. Firele auxiliare care insotesc firul principal de calcul nu sunt generate in anumite puncte de control, ci contin operatiuni care sunt prevazute cu o latenta lunga, cum ar fi lipsa cache-ului sau nu sunt previzibile, ca unele ramuri. Atunci cand firul principal recunoaste apropierea acestor operatiuni de latenta lunga, acesta produce un fir de ajutor, care se executa mai repede, deoarece poate fi redus la operatiile care sunt importante din punct de vedere critic (reaminteste Sectiunea 5.3.2 pentru o eventuala definitie a acestora operatiuni critice). Atunci cand executia firului principal necesita date calculate de firul auxiliar, acesta poate integra rezultatele obtinute de acesta sau poate reexecuta calculul, speram ca este mult mai rapid, deoarece, de exemplu, firul auxiliar ar fi putut muta datele la nivelul inferior al ierarhia cache-ului. Dificultatile in aceasta abordare constau in recunoasterea operatiilor de latenta indelungata si construirea firelor ajutoare. Pana in prezent nu a fost realizata nicio implementare practica a acestui concept.

###  5.3. Multiprocesoare cu chip Multithread cu scop general

Am mentionat de mai multe ori deja aparitia si ubicuitatea curenta a multiprocesoarelor de cipuri (CMP). Ne-am referit la capabilitatile multiprocesor si multi-threading ale procesoarelor IBM Power4 si Power5 cu dublu procesor si ale procesorului Intel Pentium 4 cu doua procesoare. Power5 si dual Pentium 4 sunt instante SMT, cu nivelul SMT limitat la doua concomitent fire. Alte duble (sau quad) CMP-uri au fost livrate si / sau anuntate de Intel (arhitectura principala), AMD si Sun. In toate aceste cazuri, fiecare dintre procesoarele de pe chip este un complex superscalar complex, in afara complexitatii, desi microar- tectura Intel Core este mai mult descendenta a Pentium III si Pentium M decat a Pen- tium 4. Intel Itanium este un procesor VLIW in comanda (vezi sectiunea 3.4.2), iar procesorul dual-procesor Itanium este departe de a fi simplu; cand a fost anuntat, a avut cel mai mare numar de tranzistori pe un cip, si anume 1,7 miliarde (reaminteste figura 1.2). La celalalt capat al spectrului de complexitate, Niagara lui Sun are opt procesoare simple, fiecare dintre ele putand suporta patru fire simultan intr-un mod multifunctional cu granulatie fina.

Exista mai multe caracteristici care sunt pertinente pentru clasificarea CMP-urilor cu scop general:

-   Numarul de procesoare. Primele CMP-uri aveau doua procesoare pe un cip. Pana in 2006, au fost livrate CMP-uri cu patru procesoare si opt procesoare. Au existat previziuni care, dupa legea lui Moore, numarul de procesatori pe un CMP se va dubla la fiecare 18 luni, dar acest lucru nu sa intamplat inca, poate din cauza provocarilor software (a se vedea capitolul urmator).
-   Cantitatea de multithreading. Nu poate fi niciunul, poate exista SMT asa cum este mentionat mai sus sau poate exista un multithreading cu granulatie grosiera sau cu granulatie fina. Soarele Niagara este o instanta a acestuia din urma, cu posibilitatea ca fiecare procuror sa sprijine 8 fire (16 fire in Sun Niagara 3 anuntate in 2008).
-   Complexitatea fiecarui procesor. Procesoarele duale si quad-uri pe care le-am enumerat la inceputul acestei sectiuni sunt superscalarii in afara ordinii (cu exceptia Itanium-ului). In schimb, procesorul Sun Niagara este un procesor mai simplu in ordine. Noi descriem Niagara si Intel multicores in detaliu mai jos.
-   Omogenitatea fiecarui procesor. Au existat propuneri pentru o combinatie de procesoare simple si complexe pe acelasi chip. Cu toate acestea, pana in prezent au fost realizate numai CMP-uri omogene de uz general. In acelasi mod, trebuie sa mentionam ca procesoarele identice de pe chip nu trebuie sa ruleze la aceeasi frecventa. Incetinirea unor procesoare ar putea fi necesara pentru a reduce necesarul de energie si disiparea caldurii (vom reveni la subiectul important al puterii in ultimul capitol al acestei carti).
-   Ierarhia cache-ului. In toate CMP-urile cu destinatie generala, fiecare procesor are propriile cache-uri L1 I si D. Cache-ul L2 poate fi privat, adica unul pe procesor sau partajat intre procesoare. Cand exista doua procesoare pe chip, daca L2 este partajat, avem nuclee duale; daca sunt private, avem doi procesori (vezi Figura 8.3). Aceasta terminologie se extinde la mai mult de doua procesoare, iar aproape toate CMP-urile actuale sunt multicore.
-   Interconectarea intre procesoare si cache-urile L2. Cache-urile L2 sunt impartite in banci, iar legatura dintre n cache-urile procesor-L1 si bancurile de memorie m este in prezent prin intermediul autobuzelor sau a traverselor, adica o structura de acces de memorie uniforma (cache).

####  5.3.1. Multiprocesorul Sun Niagara

Sun Niagara este un CMP multicore cu opt procesoare. Fiecare procesor care implementeaza SPARC ISA este multi-threaded in patru directii, astfel incat 32 fire pot fi active la un moment dat. Niagara este destinata utilizarii in aplicatii care nu necesita rate computationale ridicate si care prezinta potential pentru paralelism. Serverele web si aplicatiile bazei de date se incadreaza in aceste categorii: incarcarile lor computationale nu sunt extinse, iar interogarile de pe Web si / sau baza de date prezinta doar un numar mic de cereri de sincronizare, imprumutandu-se astfel la multithreading. Performantele de viteza legate de un uniprocesor cu un singur filet trebuie sa fie apropiate de cele expuse in figura (a).

In Niagara, fiecare procesor are propriul cache de instructiuni L1 (16 KB, set-asociativ cu patru cai, 32 octeti de linie, algoritm de inlocuire aleatorie) si cache de date (8 KB, set-asociativ cu patru cai, - prin), ceea ce este destul de mic conform standardelor actuale. Motivul este ca aplicatiile pe care tocmai le-am mentionat au seturi de lucru mari si ar avea nevoie de mult mai mari cacheuri L1 D pentru a reduce semnificativ rata de pierderi, estimata a fi de ordinul a 10%. Mai mult, multitreadingul cu granulatie fina poate ascunde o mare parte din latenta pierderilor de L1. L2 unificat este de 3 MB si 12-way set-asociative, si are 64 de byte linii. Se compune din patru banci. Arhitectura Niagara pe cip este de tip varietate, interconectarea intre procesoare si L2 fiind un intrerupator de 8 x 4 crossbar. Subsistemul I / O este, de asemenea, conectat la bara transversala, iar accesele DMA sunt directionate prin intermediul bancilor L2 si a patru canale de memorie catre si din memoria principala. O schema globala bloc a lui Niagara este prezentata in figura urmatoare.

Designerii Sun Niagara au ales simplitatea pentru a avea mai multi procesatori si mai multe contexte. Observati, printre alte decizii, conducta scurta, absenta predictorilor de ramura si absenta unitatilor de executie in virgula mobila si imbunatatirile de tip SIMD. Desi consideram ca Niagara este un scop general, nu ar functiona bine in aplicatiile stiintifice si in fluxurile de date. Scopul este de a spori viteza de executie a firului, nu de latenta la o singura aplicatie si, prin urmare, durata ciclului nu este de maxima importanta (Niagara se presupune ca ruleaza la maximum 2 GHz).

#### 5.3.2. Multicore-uri Intel

Intel a dezvoltat CMP-uri in fiecare dintre cele doua tipuri arhitecturale prezentate in Figura (a), (b), (c), (d) In cazul celor doua nuclee cu cache private L2, fiecare miez este pe o matrita separata si acolo sunt doua moare pe chip. Cand cei doi (sau mai multi) nuclei impartasesc un L2 comun si se afla pe aceeasi matrita, avem asa numiti multicori monolitici.

 Privind mai intai la arhitectura din figura (a), au existat procesoare dual Intel Pentium 4 (sau procesoare similare redenumite, cum ar fi Pentium D si Pentium Extreme) destinate serverelor, fiecare procesor care ruleaza aproape de 4 GHz cu propriul L2 privat cache. Disiparea de putere a impiedicat extinderea la un numar mai mare de nuclee si la sfarsitul anului 2008 a aparut o intrerupere a acestei linii de produse. La acea vreme, au existat anunturi iminente pentru procesoarele dual, quad si chiar octo, cu hiperthreading, destinate si serverelor si desktop-urilor, pe baza arhitecturii Intel Core. Dupa cum am vazut deja, arhitectura principala este mai mult descendenta a procesoarelor Pentium III si Pentium M decat Pentium 4. Am mentionat, de asemenea, imbunatatiri semnificative in arhitectura Core, cum ar fi fuziunea microinstructiei, sarcina speculatii si mini-cache. Cele mai puternice multicore vor avea cache-uri private L1 si L2 si o memorie cache L3 partajata.

In aceasta sectiune, vom descrie cateva aspecte ale arhitecturii Intel Core Duo, destinate in special pietelor de laptop si mobile (linia Centrino), a caror arhitectura apartine clasei reprezentate in figura (b). Procesorul se bazeaza pe Pentium M, incadrandu-se inca in categoria complexa in contrast cu Niagara simpla, si are eforturi de design chiar mai importante pentru a reduce disiparea puterii. Vom reveni la acest aspect al designului din capitolul 9. Exista, de asemenea, unele imbunatatiri microarhitecturale minime fata de versiunea originala Pentium M, cum ar fi hardware-ul mai sofisticat pentru instructiunile SSE, un decodor pentru instructiunile SSE care permite trei dintre ele sa fie decodificate in decodifica etapa in loc de una singura, o unitate de divizare mai mare, fara diviziune, si un prefetcher de flux usor mai sofisticat intre L2 si memoria principala.

Accentul nostru este pus pe aspectul CMP al Core Duo si pe designul ierarhiei cache. Odata ce a fost luata decizia de a avea o memorie cache comuna, ramane inca o alta alegere majora: Ar trebui ca cele doua cache-uri L1 sa ramana coerente printr-o schema de directoare cu directorul gazduit in cache-ul L2, ca in IBM Power5 si Niagara utilizati un protocol de snoopy? Simularile au aratat ca nu a existat nici un castig clar in performanta. Protocolul de snoopy a fost adoptat din doua motive: (i) este mai aproape de designul Pentium-ului M unic si (ii) necesita mai putina logica (fara director) si, prin urmare, mai putina putere de scurgere va fi disipata.

Elaboram ceva mai mult pe primul motiv. Figura 8.5 prezinta diagramele schematice ale unor ierarhii cache single-core (Pentium M) si dual-core (Core Duo). Cand ruleaza intr-un mediu multiprocesor comun-bus, Pentium M foloseste un protocol de coerenta cache MESI. Deoarece nu este impusa incluziunea la nivel reciproc (MLI), snoopurile se efectueaza in paralel atat in ​​cache-urile L1 cat si L2. Aceasta functie este reprezentata prin caseta L2-bus-controller.

Cand trece de la un singur la doua nuclee, pe o magistrala citita dintr-una din cache-urile L1, un snoop este efectuat mai intai pe cea de-a doua cache L1, pentru ca este mai rapid decat privirea la L2. In cazul unei lovituri in al doilea L1, datele sunt transmise la primul L1. In cazul unei pierderi in L1, cererea trece la L2 prin intermediul controlerului L2. Aceste functii sunt rezumate in figura (b) de catre cutia de diamante. Acum, daca L2 are o copie a liniei, ea o va transmite solicitantului L1. In caz contrar, cererea trimisa pe magistrala prin intermediul controlerului de magistrala si atunci cand datele returneaza linia sunt stocate atat in ​​L2, cat si in cel care solicita L1. Desigur, pe o magistrala se trimit invalidari celorlalti L1 si L2 si, daca este necesar (in functie de diferitele stari L1 si L2), in autobuz. Cererea de dezactivare a magistralei este evitata atunci cand dual core-ul functioneaza intr-un mediu independent.

Cat de scalabil este acest design? Este interesant de observat ca membrul quad-core al acestei familii este de fapt doua nuclee duale de tipul prezentat in figura (a), fiecare pe propria sa matrita cu doua matrite pe chip, cu comunicare intre privat (per dual core) L2s prin magistrala externa ca in figura (b).

Deoarece numarul de nuclee continua sa creasca, nu este dificil sa vedem ca structurile intercon- necte si coerenta cache-ului vor deveni probleme provocatoare pentru arhitectul calculatorului.

#### 5.2.3.  Multiprocesor cu chip Multithread cu scop special

Exista multe moduri diferite de asamblare a sistemelor multiprocesor cu scop special, mai ales pentru aplicatii incorporate. In aceasta sectiune, prezentam doua exemple de CMP cu mai multe fire care sunt intr-adevar specializate pentru o anumita forma de calcul dar care sunt, de asemenea, programabile de catre utilizatori si, prin urmare, nu sunt cuplate cat se poate de strans la o aplicatie particulara ca o aplicatie cu o singura aplicatie- un fel de sistem incorporat. Cele doua exemple sunt IBM Cell Broadband Engineer Architecture, numita in mod obisnuit Cell, destinata initial gamei Sony 3, dar utila si pentru aplicatii stiintifice, precum si procesorului Intel IXP 2400 Network, care poate fi folosit ca un router de baza sau de baza in retele de inalta performanta.

Desi aceste doua CMP-uri sunt folosite in medii complet diferite, ele prezinta asemanari in arhitectura generala, si anume:

-   Un procesor cu scop general. 
-   Motoarele cu motoare multietajate specializate, care sunt simple (comparativ cu o masina neordonata superscalar) si ale caror ISA sunt limitate.
-   Miscarile locale asociate fiecarui motor, decat cache-uri.
-   Acces rapid la memoria globala.
-   Interconectarea simpla intre diferitele procesoare.
-   Lipsa suportului bun al compilatorului care necesita utilizarea extensiva a limbajului de asamblare sau biblioteci pentru performante bune.

#### 5.2.4. Multiprocesor IBM cu celule

Arhitectura Cell Broadband Engine este un proiect comun al IBM, Sony si Toshiba, care a inceput in anul 2000. Intentia era de a defini o arhitectura pentru Sony PlayStation 3 care ar fi cu doua ordine de marime mai rapida decat PlayStation 2. In general, arhitectura a fost conceputa pentru un centru de divertisment digital, punand astfel accentul pe aplicatiile de jocuri si multimedia, precum si pe raspunsul in timp real al utilizatorului. Designerii au simtit ca au nevoie de mai mult paralelism la nivel de fir decat ar putea fi realizat prin replicarea unui superscalar conventional, cum ar fi IBM Power5, precum si a procesoarelor care ar putea calcula eficient fluxul si datele vectoriale. Deoarece cipul ar include mai multe nuclee si fiecare ar procesa seturi mari de date, s-au cautat solutii care sa ofere o latime de banda de memorie mare. Desigur, asa cum este cazul tuturor modelelor din acest secol, produsul rezultat trebuie sa fie eficient din punct de vedere energetic. Prima instantiere a arhitecturii, procesorul Cell, a devenit disponibila in 2005.

#### 5.2.5. Procesor de retea: Intel IXP 2800

Retelele de dimensiuni mari, cum ar fi Internetul, necesita unitati de procesare in cadrul retelei pentru a gestiona fluxul de trafic. La inceputul retelei, aceste unitati erau router-uri, al caror unic rol era de a transmite pachetele intr-un mod hop-hop, de la originea lor la destinatie. Functionalitatea necesara pentru routere a fost minima, iar implementarea lor sub forma de componente integrate pentru aplicatii specifice circuitului (ASIC) a fost norma. Cu toate acestea, cu cresterea exponentiala a marimii retelei, a vitezei de transmisie si a aplicatiilor de retea, o mai mare flexibilitate a devenit o necesitate. In timp ce pastrarea utilizarii ASIC-urilor rapide, pe de o parte, si dedicarea procesoarelor cu scop general, pe de alta parte, avocatii lor de-a lungul timpului, este recunoscut faptul ca sunt preferabile procesoarele programabile cu ISA-uri si organizatii mai potrivite cu sarcinile de retea. Aceste procesoare sunt cunoscute ca procesoare de retea (NPs).

Volumul de lucru al procesoarelor de retea este destul de variat si depinde si de faptul ca NP este la miezul sau la marginea retelei. Doua sarcini fundamentale sunt redirectionarea IP la baza si clasificarea pachetelor la margine. Aceste doua sarcini implica cautarea antetului pachetului. Redirectionarea adreselor IP, care, dupa cum sugereaza numele, ghideaza pachetul catre destinatia sa, consta intr-o potrivire prefixa cea mai lunga a unei adrese de destinatie continuta in antet cu un set de adrese continute in tabele de rutare foarte mari. Clasificarea pachetelor este o rafinare a redirectionarii adreselor IP in cazul in care se realizeaza potrivirea pe mai multe campuri ale antetului in conformitate cu regulile stocate in liste de control relativ mici. Norma de potrivire cu cea mai mare prioritate indica actiunea care trebuie efectuata pe pachet, de exemplu inainte sau inapoi. Printre alte sarcini care implica antetul putem mentiona managementul fluxului pentru evitarea congestiei in retea si colectarea de statistici in scopuri de facturare. Criptarea si autentificarea sunt sarcini care necesita prelucrarea datelor utile.

##  6. Avantaje si dezavantaje

Ca orice tehnologie sau abordare utilizata aceasta vine pe de o parte sau alta cu lucruri bune si altele mai putin bune, lasand la latitudinea proiectantului, ca tehnologia sa fie aleasa in cadrul unor proiect astfel incat sa eficientizeze la maxim.

### 6.1. Avantaje

-   Daca un thread primeste o multime de lipsuri ale memoriei cache, celalalt thread poate continua, luand avantajele de a utiliza resursele nefolosite, care poate conduce spre o executie mult mai rapida, deoarece aceste resurse vor fi ocupate, doar daca un singur thread s-a executat;
-   Daca un thread nu poate utiliza toate resursele procesorului (deoarece instructiunile depind de celelalte rezultate), rularea unui altui thread poate preveni ca acele resurse sa devina indisponibile;
-   Daca mai multe thread-uri opereaza pe acelasi set de date, ele pot sa imparta memoria cache intre ele, conducand catre o mai buna utilizare a memoriei cache sau la o sincronizare a valorilor;
-   Poate fi folosit atat pentru sporirea eficientei in cadrul multiprogramarii sau a sarcinilor de lucru pe mai multe fire de executie, cat si in cadrul unui singur program;
-   Un fir de executie poate rula, in timp ce alt fir de executie asteapta un anumit tip de eveniment;
-   Capacitatile oferite de acest tip de procesare sunt folosite pana si la nivelul sitemului de operare;
-   Util pentru accelerarea unui singur thread prin utilizarea, atunci cand procesorul nu este foarte solicitat, a executiei speculative pe mai multe cai si a firelor de executie ajutatoare;

### 6.2. Dezavantaje

-   Mai multe fire de executie pot sa interfereze intre ele cand isi impart resurse hardware precum memoria cache sau bufferi de translatare laterali (TLBs). Ca rezultat, timpul de executie a unui singur fir nu este imbunatatit, dar nu poate fi degradat, chiar si atunci cand un singur fir se executa, datorita unei frecvente reduse sau a unor stari pipeline aditionale, necesare pentru acomodarea comutatoarelor hardware;
-   Per total eficienta variaza;
-   Din punct de vedere software, suportul hardware pentru multithreading nu este atat de important, solicitand mai mult schimbari in aplicatii si sistemului de operare;
-   Programarea threadurilor este o alta problema majora

## 7. Specificatii de implementare ale unui program paralel

Pentru a exemplifica modul in care un program ruleaza pe mai multe fire de executie, vom considera urmatorul exemplu in care se vor rula in paralel doua fire de executie ce vor reprezenta un innumarator descrescator de la 5 la 0. Pentru a usura identificarea thread-urilor am afisat mesaje de identificare cu numele thread-ului si cifra pe care o afiseaza numaratorul.

```
class RunnableDemo implements Runnable {

 private Thread t;

 private String threadName;

 RunnableDemo( String name) {

 threadName = name;

 System.out.println("Creare " + threadName );

 }

 public void run() {

 System.out.println("Executa " + threadName );

 try {

 for(int i = 5; i > 0; i--) {

 System.out.println("Thread: " + threadName + ", " + i);

 // asteapta 50ms pentru a afisa textul pe ecran

 Thread.sleep(50);

 }

 }catch (InterruptedException e) {

 System.out.println("Thread " + threadName + " intrerupt.");

 }

 System.out.println("Thread " + threadName + " inchis.");

 }

 public void start () {

 System.out.println("Porneste " + threadName );

 if (t == null) {

 t = new Thread (this, threadName);

 t.start ();

 }

 }

}

public class TestThread {

 public static void main(String args[]) {

 RunnableDemo R1 = new RunnableDemo( "Thread-1");

 R1.start();

 RunnableDemo R2 = new RunnableDemo( "Thread-2");

 R2.start();

 }

}
```

Rezultatele obtinute pot sa difere de la o platforma la alta, astfel rularea programului pe configuratii diferite de computere poate genera rezultate diferite. Ceea ce se poate observa cu usurinta este faptul ca threadurile sunt create si pornite unul dupa altul, ajungandu-se la momentul in care se executa un thread si se afiseaza rezultatul, urmand ca in acelasi timp sa fie executat si cel de-al doilea fir de executie si sa afiseze rezultatul. In final firele de executie sunt inchise, dupa terminarea task-urilor.

```
Creare Thread-1

Porneste Thread-1

Creare Thread-2

Porneste Thread-2

Executa Thread-1

Thread: Thread-1, 5

Executa Thread-2

Thread: Thread-2, 5

Thread: Thread-1, 4

Thread: Thread-2, 4

Thread: Thread-2, 3

Thread: Thread-1, 3

Thread: Thread-2, 2

Thread: Thread-1, 2

Thread: Thread-2, 1

Thread: Thread-1, 1

Thread Thread-2 inchis.

Thread Thread-1 inchis.

```

## 7. Concluzii

In incheiere as dori sa imi expun o parere personala, asupra multithreading-ului si ceea ce reprezinta pentru mine acest concept. Pot spune ca sunt unul dintre utilizatorii care a beneficiat din plin, la fel ca multi altii de serviciile oferite de producatori precum Microsoft, prin intermediul sistemului de operare Windows, cat si pachetelui Office (repaginarea in office se face cu ajutorul mai multor fire de executie), iar pentru faptul ca am adus in discutie serviciile Microsoft Windows, acesta dupa cum probabil bine stiti, pune la dispozitie un tool intern, Task Manager, in care se pot observa toate procesele si task-urile existente. Ma declar un utilizator fericit, deoarece am descoperit si sisteme, care functioneaza sincron, iar in cazul in care un task este cronofag, experienta adusa utilizatorului, care trebuie sa astepte o perioada indelungata de timp fara a primi nici-un raspuns sau informatie asupra a ceea ce executa procesorul.

De asemenea, in calitate de programator, pot spune ca am experimentat si modalitatea de a concepe un sistem sau mai bine spus, anumite parti ale unui sistem capabil sa gestioneze rularea pe mai multe thread-uri. Avantajul major adus de executia programelor pe mai multe fire de executie, l-am resimtit, in momentul in care am reproiectat parti componente ale unui sistem sa lucreze in paralel, timpul de finalizare al intregului proces fiind redus considerabil.

Ca o concluzie, as putea spune ca paralelizand procese in parametrii corespunzatori, vom putea vedea cu proprii ochii, o noua era tehnologica.

## 8. Bibliografie

1.  Multithreading - <https://ro.wikipedia.org/wiki/Multithreading>
2.  Pipeline - <https://ro.wikipedia.org/wiki/Pipeline>
3.  Thread - <https://ro.wikipedia.org/wiki/Fir_de_execu%C8%9Bie> 
4.  Computer Architecture: A Quantitative Approach, 5th Edition - John L. Hennessy, David A. Patterson
5.  Microprocessor Architecture From Simple Pipelines to Chip Multiprocessors - Jean-Loup Baer
6.  <https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)>