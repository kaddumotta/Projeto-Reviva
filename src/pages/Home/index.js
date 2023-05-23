import { useState } from "react";
import './home.css';
import Logo from '../../Imagens/logo.png';
import {toast} from 'react-toastify'

import { Link } from 'react-router-dom'

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'

function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

//Verificação se o email e a senha está preenchidos
  async function handleLogin(e){
    e.preventDefault();
    
    if(email !== '' && password !== ''){
     
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        //navegar para /admin
        navigate('/cadastro', {replace: true})
      })
      .then(() => {
        toast.success('Login feito com Sucesso!')
      })

      .catch((erro) => {
        toast.warn('Erro' + erro)
      });

    }else{
      toast.warn('Preencha os dados')
    }
  } 
  
    return (
    <div className="home-container">
        <img src={Logo} alt="logo" title="Logo da Reviva" />
      <br/>
      <span>Servimos por Amor! E Amamos Servir!</span>

      <form className="form" onSubmit={handleLogin}>
        <input type="text" placeholder="Digite seu email..." 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <input type="password" placeholder="********" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Acessar</button>
</form>

<Link className="button-Link" to="/register">
      Não possui uma conta? Cadastre-se
</Link>

    
    </div>
  )
}

export default Home;