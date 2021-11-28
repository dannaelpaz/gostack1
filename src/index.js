const { json } = require('express');
const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(json());

const projects = [];

// rota que lista os projetos na memória
app.get('/projects', (request, response) => {
  return response.json(projects);
});

// rota que adiciona um novo projeto na lista
app.post('/projects/', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

// rota que atualiza um projeto já criado
app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project Not Found' });
  }

  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project;

  return response.json(project);
});

// rota para apagar um projeto listado
app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project Not Found' });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('Back-end started! 🚀');
});
