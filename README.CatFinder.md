Este creat repozitoriul goit-js-hw-10.
Când accesați pagina live a unui exercițiu, nu există erori sau avertismente în consolă.
Proiectul este construit cu ajutorul parcel-project-template.
Codul este formatat de Prettier.

Fișiere start
Descărcați fișierul de start index.html cu structura de bază a sarcinii. Copiați-l pentru proiectul dvs. în folderul src în parcel-project-template.

Sarcină - Cat Finder
Creați partea frontend a aplicației de căutare a informațiilor despre pisici în funcție de rasă. Vizionați filmulețul demonstrativ al aplicației și folosiți-l ca punct de referință pentru funcționalitatea necesară.

HTTP-cereri
Folosiți The Cat API public. Pentru a începe trebuie să vă înregistrați și să primiți cheia de acces unică, care trebuie să fie atașată fiecărei cereri. Accesați pagina principală și apăsați butonul de mai jos, Signup for free, urmați instrucțiunile și cheia va fi trimisă la adresa e-mail pe care ați furnizat-o.

Cheia trebuie utilizată în antetul HTTP x-api-key. Este recomandat ca axios să fie utilizat și ca un antet să fie adăugat pentru toate interogările.

import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "cheia ta";

Colecția de rase
Când pagina este încărcată, trebuie să se execute HTTP-cererea pentru colecția de rase. Pentru asta trebuie efectuată o cerere GET către adresa https://api.thecatapi.com/v1/breeds, returnând o matrice de obiecte. Dacă solicitarea este reușită, trebuie de completat select.breed-select cu opțiuni, astfel încât value opțiunii să conțină id rasei, iar interfața utilizatorului să afișeze denumirea rasei.

Scrieți funcția fetchBreeds(), care creează o cerere HTTP și returnează Promise cu o matrice de rase - rezultatul cererii. Extrageți-o în fișierul cat-api.js și exportați-o cu nume.

Informații despre pisică
Când utilizatorul selectează o anumită opțiune în selector, este necesar să se efectueze o cerere pentru informații complete despre pisică la adresa https://api.thecatapi.com/v1/images/search. Nu uitați să specificați în această interogare parametrul șirului interogării breed_ids cu identificatorul rasei.

Iată cum va arăta URL-ul pentru solicitarea tuturor informațiilor despre câine, în funcție de ID-ul rasei.

https://api.thecatapi.com/v1/images/search?breed_ids=identificator_rasă

Scrieți funcția fetchCatByBreed(breedId), care așteaptă identificarea rasei, creează o cerere HTTP și returnează un promise cu informații despre pisică - rezultatul cererii. Extrageți-o în fișierul cat-api.js și exportați-o cu nume.

Dacă cererea a fost reușită, sub selector, în blocul div.cat-info va apărea imaginea și informații detaliate despre pisică: denumirea rasei, descrierea și temperamentul.

Procesarea stării de încărcare
Pe perioada efectuării cererii HTTP, trebuie să se afișeze loaderul - elementul p.loader. Dacă nu există cereri sau dacă cererea s-a încheiat, loaderul trebuie ascuns. Folosiți clasele CSS suplimentare pentru acest lucru.

În timp ce se desfășoară cererea pentru lista de rase, select.breed-select trebuie ascuns și trebuie afișat p.loader.
În timp ce se desfășoară cererea informațiilor despre pisică, div.cat-info trebuie ascuns și trebuie afișat p.loader.
Când se încheie orice cerere, p.loader trebuie ascuns.
Tratarea erorilor
Dacă utilizatorul întâmpină o eroare la orice solicitare HTTP, de exemplu, dacă a căzut rețeaua, a apărut o pierdere de pachete etc, adică promise-ul a fost respins, trebuie să se afișeze elementul p.error, și să fie ascuns la fiecare solicitare ulterioară. Folosiți clase CSS suplimentare pentru a realiza acest lucru.

Pentru a testa dacă eroarea se afișează, modificați adresa cererii adăugând orice caracter la sfârșit, de exemplu, în loc de https://api.thecatapi.com/v1/breeds, folosiți https://api.thecatapi.com/v1/breeds123. Cererea de obținere a listei de rase va fi respinsă cu o eroare. La fel și pentru solicitarea informațiilor despre pisici, în funcție de rasă.

Interfața
Adăugați un design minimalist pentru elementele de interfață.
În loc de select.breed-select, puteți folosi orice librărie cu select, de exemplu https://slimselectjs.com/
În loc de p.loader, puteți folosi orice librărie cu CSS loaders, de exemplu https://cssloaders.github.io/
În loc de p.error, puteți folosi orice librărie cu alerte, de exemplu Notiflix