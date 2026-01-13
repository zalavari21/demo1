initDB().then(() => listaFrissit());

function ujUgyfel() {
  let nev = document.getElementById("nev").value;
  let cim = document.getElementById("cim").value;

  let now = Date.now();

  db.run(
    "INSERT INTO ugyfelek (nev, cim, modositva, sync) VALUES (?, ?, ?, 0)",
    [nev, cim, now]
  );

  saveDB();
  listaFrissit();
}

function listaFrissit() {
  let res = db.exec("SELECT * FROM ugyfelek ORDER BY id DESC");

  let html = "";
  if (res.length > 0) {
    for (let row of res[0].values) {
      html += `<div>
        <b>${row[1]}</b> – ${row[2]}
      </div>`;
    }
  }
  document.getElementById("lista").innerHTML = html;
}
