import { config } from "../../config.js";
"use strict";

const boton_foto = document.querySelector("#btnSeleccionarImagen");


const imagen = document.getElementById("imagen");

let widget_cloudinary = cloudinary.createUploadWidget(
  {
    cloudName: `${config.API_CLOUD_NAME}`,
    uploadPreset: `${config.API_UPLOAD_PRESET}`
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

