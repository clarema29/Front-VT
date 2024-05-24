"use strict";

const boton_foto = document.querySelector("#btnSeleccionarImagen");


const imagen = document.getElementById("imagen");

let widget_cloudinary = cloudinary.createUploadWidget(
  {
    cloudName: "dlj6zjtpp",
    uploadPreset: "j1e1zmo4"
  },
  (err, result) => {
    if (!err && result && result.event === "success") {
      console.log("imagen subida con exito", result.info);
      imagen.src = result.info.secure_url;
      console.log("url de la imagen: " + imagen.src);
    }
  }
);

boton_foto.addEventListener(
  "click",
  () => {
    widget_cloudinary.open();
  },
  false
);

