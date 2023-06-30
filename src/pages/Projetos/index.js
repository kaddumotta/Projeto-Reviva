import '../Cadastro/cadastro.css';
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import Logo from '../../Imagens/logo.png';
import { toast } from 'react-toastify'
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import Header from '../../Components/Header';


function Projetos() {

  const [NomeProjetoInput, setNomeProjetoInput] = useState('')
 
  const [edit, setEdit] = useState({})

  const [user, setUser] = useState({})

  const [Projeto, setProjeto] = useState([]);
  


  useEffect(() => {
    async function loadProjeto() {
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetail))

      if (userDetail) {

        const data = JSON.parse(userDetail);

        const NomeProjetoRef = collection(db, "Projeto")
        const q = query(NomeProjetoRef, orderBy("created", "desc"))
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nome: doc.data().nome,
              
            })
          })
          setProjeto(lista);
        })
      }
    }
    loadProjeto();
  }, [])


  //Registrando Cadastro e Alterando Cadastro

  async function handleRegister(e) {
    e.preventDefault();

    //Condição se for edição ir para UpdateCadastro
    if (edit?.id) {
      handleUpdateProjetos();
      return;
    }

    //Fazendo o registro
    await addDoc(collection(db, "Projeto"), {

      created: new Date(),
      nome: NomeProjetoInput,
      
    })
      .then(() => {
        toast.success("Cadastro Realizado com Sucesso")
        setNomeProjetoInput('')
      
      })
      .catch((error) => {
        toast.warn("Erro " + error)
      })
  }

  //Dados que serão alterados
  function editProjetos(id) {
    setNomeProjetoInput(id.nome)
    setEdit(id);
  }

  //Função para realizar a atualização

  async function handleUpdateProjetos() {
    const NomeProjetoRef = doc(db, "Projeto", edit?.id)
    await updateDoc(NomeProjetoRef, {
      nome: NomeProjetoInput,
     
    })
      .then(() => {
        alert("Cadastro Atualizado!")
        setNomeProjetoInput('')
   
        setEdit('')
      })
      .catch(() => {
        alert("Erro ao atualizar Matrícula")
        setNomeProjetoInput('')
        setEdit('')
      })
  }

  //fazendo o logout
  async function handleLogout() {
    await signOut(auth)
  }

  return (

    <div>
      <Header/>
      <div className='title'><img src={Logo} alt="logo" title="Logo da Reviva" />
        <span>Servimos por Amor! E Amamos Servir!</span>
        <br />
        <h1>Matrículas de Assistidos</h1></div>


      <form className='box' onSubmit={handleRegister}>

        <div className="input-group">
          <label for="nome"> Nome do Projeto</label>
          <input type="text" id="nome" placeholder="Digite o seu nome completo" value={NomeProjetoInput} onChange={(e) => setNomeProjetoInput(e.target.value)} required />
        </div>

        <div class="input-group">
          {Object.keys(edit).length > 0 ? (
            <button className='btn-register' type='submit'>Atualizar Cadastro</button>) : (
            <button className='btn-register' type='submit'>Criar Projeto</button>
          )}
        </div>

      </form>
    
      
    </div>
  );
}


export default Projetos;