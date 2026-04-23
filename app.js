initDB().then(() => listaFrissit()); 

function ujUgyfel() { 

let szoveg = document.getElementById("szoveg").value;
//let szoveg = "szoveg"; 

 let d = new Date(Date.now());
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const day = String(d.getDate()).padStart(2, '0');
  
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

const datum = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;


db.run( 
"INSERT INTO logok (szoveg, modositva) VALUES (?, ?)", 
[szoveg, datum] ); 

saveDB(); 
listaFrissit(); 
document.getElementById("szoveg").value = '';
document.getElementById("szoveg").focus();

} 

function loguritk() {
	alert("uritben");
db.run("DELETE FROM logok");
saveDB();
	alert("saveutan");
listaFrissit();

}

function listaFrissit() { 

let res = db.exec("SELECT * FROM logok ORDER BY id DESC limit 5"); 

let html = ""; 
if (res.length > 0) { 
	for (let row of res[0].values) { 
	  html += `<div> 
	    <b>${row[1]}</b> – ${row[2]} </div>`; 
		
		} 
		
		} 
		
		let html = "loguritbol";	
		document.getElementById("lista").innerHTML = html; 
	    document.getElementById("szoveg").focus();
		
		} 
