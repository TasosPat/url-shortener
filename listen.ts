import app from "./app"; 
const PORT: number = Number(process.env.PORT) || 8000;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});
