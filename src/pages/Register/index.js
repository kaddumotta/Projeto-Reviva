import { useState } from "react";
  
  import { Link } from 'react-router-dom'
  import { auth } from '../../firebaseConnection'
  import { createUserWithEmailAndPassword} from 'firebase/auth'
  import { useNavigate } from "react-router-dom";
  
  function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
  
  //Verificação se o email e a senha está preenchidos
    async function handleRegister(e){
      e.preventDefault();
      
      if(email !== '' && password !== ''){
        await createUserWithEmailAndPassword(auth, email, password)
        .then(() =>{
          navigate('/cadastro', {replace: true})
        })
        .catch(() =>{
          alert('Erro')
        })
      }else{
        alert('Preencha')
      }
    } 
    
      return (
      <div className="home-container">
        <h1>Cadastre-se</h1>
        <span>Vamos criar sua conta!</span>
  
        <form className="form" onSubmit={handleRegister}>
          <input type="text" placeholder="Digite seu email..." 
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