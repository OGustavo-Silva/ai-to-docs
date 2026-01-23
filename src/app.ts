import express from 'express';
import router from './routes.ts';


const app = express();
const PORT = process.env.AI_TO_DOCS_SERVER_PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
