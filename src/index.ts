import app from "./app"
const port = process.env.PORT || 8000; 
app.listen(port, () => {
  console.log(`Сервер ${port} портында жүмыс істеп тұр`);
});

