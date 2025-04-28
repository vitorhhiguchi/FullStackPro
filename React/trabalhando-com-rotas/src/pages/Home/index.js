import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div >
      <h1>Bem vindo a página HOME</h1>
      <span>Vitor Hiroshi Higuchi</span>

      <br/>
      <br/>

      <Link to="/sobre">Sobre</Link>      <br/>
      <Link to="/contato">Contato</Link>

      <hr/>
      <Link to="/produto/1">Acessar Produto 1</Link>      <br/>
    </div>
  );
}

export default Home;
