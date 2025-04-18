require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//Configura esto según tu repo
const repoOwner = "lumatamorosva";
const repoName = "RecursosProyecto";
const filePath = "comentarios.json";
const branch = "main";
const clave = process.env.claveLlamada + "o";

//GitHub API base
const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

// 💾 Para evitar que el navegador haga caché
const noCacheHeaders = {
    "Cache-Control": "no-cache, no-store, must-revalidate", // para desactivar caché
    "Pragma": "no-cache",  // para HTTP/1.0
    "Expires": "0", // para HTTP/1.0
  };

//GET: Leer archivo JSON desde GitHub
app.get("/comentarios", async (req, res) => {
  try {
    const { data } = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${clave}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    // Decodificamos el contenido base64
    const contenidoDecodificado = Buffer.from(data.content, "base64").toString("utf8");
    const json = JSON.parse(contenidoDecodificado);

    res.json(json);
  } catch (error) {
    console.error("Error al leer el archivo:", error.response?.data || error.message);
    res.status(500).json({ error: "No se pudo leer el archivo." });
  }
});

// 💾 PUT: Guardar nuevo comentario
app.post("/comentarios", async (req, res) => {
  const nuevoComentario = req.body.comentario;

  try {
    // 1. Obtener contenido actual
    const { data } = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${clave}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const contenidoDecodificado = Buffer.from(data.content, "base64").toString("utf8");
    const json = JSON.parse(contenidoDecodificado);

    if (!Array.isArray(json.comentarios)) {
      json.comentarios = [];
    }

    json.comentarios.push(nuevoComentario );

    // 2. Codificar nuevo contenido
    const nuevoContenido = JSON.stringify(json, null, 2);
    const contentBase64 = Buffer.from(nuevoContenido, "utf8").toString("base64");

    // 3. Enviar actualización a GitHub
    await axios.put(apiUrl, {
      message: "Nuevo comentario agregado",
      content: contentBase64,
      sha: data.sha,
      branch: branch,
    }, {
      headers: {
        Authorization: `Bearer ${clave}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

     // Agregar el header de no-cache
     res.set(noCacheHeaders);

    res.json({ mensaje: "Comentario guardado con éxito" });

  } catch (error) {
    console.error("Error al guardar comentario:", error.response?.data || error.message);
    res.status(500).json({ error: "No se pudo guardar el comentario." });
  }
});

//Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
