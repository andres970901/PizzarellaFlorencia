// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyB_jHl2C_S33EmTCxmphCQJZsa1ICpw4-0",
  authDomain: "pizarella-2285d.firebaseapp.com",
  projectId: "pizarella-2285d",
});

var db = firebase.firestore();

function guardar() {
  var product = document.getElementById("name").value;
  var direction = document.getElementById("direction").value;
  return db
    .collection("order")
    .add({
      direction: direction,
      product: product,
    })
    .then((refDoc) => {
      alert(`Added ${refDoc.id}`);
    });
}



db.collection("cities")
  .add({
    name: "Tokyo",
    country: "Japan",
  })
  .then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function (error) {
    console.error("Error adding document: ", error);
  }); 

//leer
window.onload = function() {
    var table = document.getElementById("table");

    db.collection("order").onSnapshot((querySnapshot) => {
    
      table.innerHTML = "";
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().product}`);
        table.innerHTML += `<tr>
    <th scope="row">${doc.data().product}</th>
    <td>${doc.data().direction}</td>
    <td><button type="button" class="btn btn-danger" onclick="eliminar('${
          doc.id
        }')">Eliminar</button>
    </td>
    <td><button type="button" class="btn btn-warning" onclick="editar('${
          doc.id
        }','${doc.data().product}','${doc.data().direction}')">Editar</button>
    </td>
    </tr>`;
      });
    });
  };


//borrar
function eliminar(id) {
  db.collection("order")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}

//editar
function editar(id, product, direction) {
  document.getElementById("name").value = product;
  document.getElementById("direction").value = direction;
  var button = document.getElementById("button");
  button.innerHTML = "Editar";
  button.onclick = function () {
    var orderRef = db.collection("order").doc(id);
    var product = document.getElementById("name").value;
    var direction = document.getElementById("direction").value;

    return db
      .collection("order")
      .doc(id)
      .set({
        product: product,
        direction: direction,
      })
      .then(() => {
        alert(`Usuario actualizado ${id}`);
        button.innerHTML = "Solicitar servicio";
      });
  };
}
