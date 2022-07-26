# test-interactively
Test for Interactively

<hr>

Requested:

1. Folosind feedul de informatii de aici https://jsonplaceholder.typicode.com/users dezvoltați o pagină care să afișeze lista de utilizatori și detaliile acestora. Pentru fiecare utilizator va exista un buton prin care putem ajunge la websiteul acestuia iar din feedul https://jsonplaceholder.typicode.com/photos incarcam poza "thumbnailUrl" aferenta id-ului.
Adaugam si un selector prin care putem face sortarea utilizatorilor, default sa fie afisati in ordinea din feed, iar ca optiuni sa avem, alfabetic A-Z și alfabetic Z-A..

Se va folosi doar cod JavaScript și CSS standard, fără librării externe sau framework-uri. Afișarea listei de utilizatori trebuie să fie tip grilă și responsive, în rest design-ul este la alegere.

2. O pagina web responsive, care sa contina 4 poze, un titlu pe fiecare poza care sa se afiseze cu o animatie left to right iar la hover sa se schimbe culoare textului si sa devina bold. (preview in atasament)

Aplicațiile pot fi predate sub forma unei arhive, cu link către un repository git sau pot fi puse online.

<hr>

Part 1:
        Firstly, I've created the html, with a demo as card in order to be able to style it a bit before fetching data.
        Got some "design" to start with, and started fetching the data. That was the moment I realized how much I actually need to build in the dom, to get the proper looking. (223 lines)
        I wanted to go for the ".innerHTML" way, but I've learnt recently that it is not the best idea, and is recommented to use ".createElement".
        
        So after ~1 hour spent on the card elements, I faced the need of users' photos, and did a second promise in the async function.
        
        The filtering was done by keeping stored the data fetched, and then sorting it and re-rendering the cards.
        
        For the functionality of buttons, I've added an event listener on the grid/list itself, and checked target's id.
        
Part 2:
        Pretty much only that: 4 photos, with a title in each, which is coming from left to right and changes color and font-weight when hovered.
