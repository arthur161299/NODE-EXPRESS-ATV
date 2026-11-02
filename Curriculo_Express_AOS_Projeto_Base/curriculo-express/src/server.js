import app from "./index.js";
const port = Number(process.env.PORT || 4001);
app.listen(port, () => console.log(`API local disponível em http://localhost:${port}`));
