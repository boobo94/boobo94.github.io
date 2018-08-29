---
layout: post
title: Automatic GearBox Module with Fuzzy Controller
date: 2018-06-10 12:31:19
summary: 'Sistemul isi propune realizarea unui modul electronic, pentru schimbarea
  automata a vitezelor unui autovehicul, folosind o cutie de viteze automata. '
categories: research
redirect_from: /research/2018/06/10/automatic-gearbox-module-with-fuzzy-controller/
---

Sistemul isi propune realizarea unui modul electronic, pentru schimbarea automata a vitezelor unui autovehicul, folosind o cutie de viteze automata. Factorii ce influenteaza sistemul sunt: 

* Viteza autoturismului 
* Turatia motorului 
* Modul de condus - modul de utilizare al autoturismului in functie de dorinta 

  soferului. Presupunem ca selectia se va face in baza unui comutator si permite 3 

  moduri de lucru: 
  * Eco - un mod de condus specializat pentru un consum mic si un mod de poluare 

    redus. In acest context motorul va opera cu turatii mici si viteza redusa. 
  * City - un mod de condus specializat pentru modul de oras, viteze reduse, turatii 

    mari pentru demaraje fapt datorat indicatiilor semafoarelor 
  * Sport - in acest mod de condus se va utiliza motorul cu turatii mari si viteze 

    mici sau mari. 

    Se va utiliza un Controller cu logica Fuzzy care sa reactioneze conform variabilelor de intrare viteza, turatie si mod de condus, astfel incat sa gestioneze schimbarea treptei de viteze in mod automat. 

Intregul articol poate fi citit si descarcat [aici](http://libgen.io/book/index.php?md5=6C1FF04E74F0AC17DB2E1A130291BDF8).