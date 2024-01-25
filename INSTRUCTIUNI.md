# Parcel template

Asigură-te că pe PC este instalată versiunea LTS Node.js. Descarcă și instalează
dacă este necesar.

Clonează acest repository:
https://github.com/goitacademy/parcel-project-template

In Explorer: -schimba numele repozitoriului clonat in numele temei tale
(goit-js-hw-0x). -sterge folderul src. -pune noul folder src.

Creează pe GitHub un repository nou și gol (fara readme). Nu lucra foarte rapid,
nu te panica, ai rabdare cu GitHub-ul. Este, totusi, un server, undeva, care
face si alte lucruri. Fa pe repozitoriul creat setarile din (vezi in)
Implementare: 1)Settings /Action /General /Read and write permissions 2)Allow
GitHub Actions...

Deschide proiectul în VSCode (Open Folder). modifica in fisierul package.json
noul nume de proiect si username-ul tau de pe Github (vezi in Implementare).
pornește Terminal și conectează proiectul cu repository-ul GitHub cu ajutorul
comenzii: git remote set-url origin https://github.com/user_github-ul tau/numele
temei tale.git Setează dependențele proiectului în Terminal cu ajutorul
comenziilor: npm install npm audit fix npx update-browserslist-db@latest (va
face update-ul la caniuse-lite, restul se pun la tema respectiva). Pornește
modul dezvoltator prin rularea comenzii npm start. Accesează în browser pagina
(Ctrl+) http://localhost:1234. Daca totul este ok: Se face Commit & Push nu
conteaza de unde. Dupa 15 minute te duci pe GitHub si verifici /selectezi in
Settings /Pages la Source branch-ul gh-pages /Save (vezi in Implementare).
Verifici pagina Live.
