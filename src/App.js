import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

let count = 0

function App() {
  const [diretorios, setDiretorios] = useState([]);

  useEffect(() => {
    async function loadingRepository() {
      const response = await api.get('/repositories');

      setDiretorios(response.data)
    }

    loadingRepository()
  }, [])



  async function handleAddRepository() {
    count = count + 1;

    const data = {
      title: `Repositorio ${count}`,
      url: `https://github.com/BrunoFgR/Modulo${count}`,
      techs: ["nodeJS", "vueJS", "expressJS"]
    }

    const response = await api.post('/repositories', data);

    setDiretorios([ ...diretorios, response.data ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newDiretorio = diretorios.filter(d => d.id !== id);
    setDiretorios(newDiretorio)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {diretorios.map(d => (
            <li key={d.id}>
              {d.title}
  
            <button onClick={() => handleRemoveRepository(d.id)}>
              Remover
            </button>
            </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
