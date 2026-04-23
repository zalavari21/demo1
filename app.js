let input, listaDiv, mentesBtn, torlesBtn;

document.addEventListener("DOMContentLoaded", async () => {

  input = document.getElementById("szoveg");
  listaDiv = document.getElementById("lista");
  mentesBtn = document.getElementById("mentesBtn");
  torlesBtn = document.getElementById("torlesBtn");

  try {
    await initDB();
    mentesBtn.disabled = false;
    listaFrissit();
  } catch (e) {
    alert("DB hiba: " + e.message);
  }

  // események
  mentesBtn.addEventListener("click", ujUgyfel);
  torlesBtn.addEventListener("click", logTorles);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      ujUgyfel();
    }
  });

  input.focus();
});


// =========================

function ujUgyfel() {
  const szoveg = input.value.trim();

  if (!szoveg) return;

  const d = new Date();
  const datum =
    d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0") + " " +
    String(d.getHours()).padStart(2, "0") + ":" +
    String(d.getMinutes()).padStart(2, "0") + ":" +
    String(d.getSeconds()).padStart(2, "0");

  try {
    db.run(
      "INSERT INTO logokx (szoveg, modositva) VALUES (?, ?)",
      [szoveg, datum]
    );

    saveDB();
    listaFrissit();

  } catch (e) {
    alert("Mentési hiba: " + e.message);
  }

  input.value = "";
  input.focus();
}


// =========================

function listaFrissit() {

  try {
    const res = db.exec("SELECT * FROM logokx ORDER BY id DESC LIMIT 5");

    if (!res.length) {
      listaDiv.innerHTML = "<i>Nincs adat</i>";
      return;
    }

    let html = "";

    for (const row of res[0].values) {
      html += `
        <div>
          <b>${row[1]}</b><br>
          <small>${row[2]}</small>
        </div>
        <hr>
      `;
    }

    listaDiv.innerHTML = html;

  } catch (e) {
    alert("Lista hiba: " + e.message);
  }
}


// =========================

function logTorles() {
  if (!confirm("Biztos törlöd?")) return;

  try {
    db.run("DELETE FROM logokx");
    saveDB();
    listaFrissit();
  } catch (e) {
    alert("Törlés hiba: " + e.message);
  }
}
