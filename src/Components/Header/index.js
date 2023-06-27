import React from "react";
import './header.css';
import { Link } from 'react-router-dom'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

function Header() {

  async function handleLogout() {
    await signOut(auth)
  }
    return (

      <div className="sidebar">
       <Link to="/cadastro">Cadastro</Link>
       <Link to="/matricula">Matrícula</Link>
       <Link to="/projeto">Projetos</Link>
       <Link to="/relatorio">Relatórios</Link>
       <Link to="/register">Cadastro de Usuários</Link>
       <a className="sair"onClick={handleLogout}>Sair</a>
      </div>
      
   
    );
  }
  
  export default Header;