import { app } from "./app.js";
import "dotenv/config";

const port = Number(process.env.PORT ?? 5000);

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
