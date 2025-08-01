import "dotenv/config";
import app from "./app";
import { initDB } from "./config/db";

// parseInt cumple doble función de tipado y fallback
const PORT = parseInt(process.env.PORT ?? "3333", 10);

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error inicializando la base de datos:", err);
  });
