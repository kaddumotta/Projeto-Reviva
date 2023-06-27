import { useState } from "react";
import { signOut } from 'firebase/auth'
import Logo from '../../Imagens/logo.png';
import {toast} from 'react-toastify'
  import { Link } from 'react-router-dom'
  import { auth } from '../../firebaseConnection'
  import { createUserWithEmailAndPassword} from 'firebase/auth'
  import { useNavigate } from "react-router-dom";
  import Header from '../../Components/Header';
  import '../Cadastro/cadastro.css';
  
  function Register() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
  

    async function handleLogout() {
      await signOut(auth)
    }

  //Verificação se o email e a senha está preenchidos
    async function handleRegister(e){
      e.preventDefault();
      
      if(email !== '' && password !== ''){
        await createUserWithEmailAndPassword(auth, email, password)
        .then(() =>{
          navigate('/cadastro', {replace: true})
          toast.success("Cadastro Realizado com Sucesso!")
        })
        .catch(() =>{
          toast.warn('Erro')
        })
      }else{
        toast.warn('Preencha os campos!')
      }
    } 
    
      return (
      <div className="home-container">
<Header/>
      <img src={Logo} alt="logo" title="Logo da Reviva" />
      <span>Servimos por Amor! E Amamos Servir!</span>
      <br/>
        <h1>Cadastre-se</h1>
        <span>Vamos criar sua conta!</span>
  
        <form className="form" onSubmit={handleRegister}>

        <input type="text" placeholder="Digite o nome da conta" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          />

          <input type="text" placeholder="Digite o e-mail do usuário!" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
  
          <input type="password" placeholder="********" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
  
          <button type="submit">Cadastrar</button>
  </form>
  
  <Link className="button-Link" to="/">
        Já possui uma conta? Faça login
  </Link>
  
      
      </div>
    )
  }
  


export default Register;