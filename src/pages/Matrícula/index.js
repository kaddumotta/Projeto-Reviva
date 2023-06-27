/* eslint-disable react/jsx-no-comment-textnodes */


import '../Cadastro/cadastro.css';
import { useState, useEffect } from 'react'
import { db } from '../../firebaseConnection'
import Logo from '../../Imagens/logo.png';
import Header from '../../Components/Header';
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'

function Matricula() {

  const [NomeInput, setNomeInput] = useState('')
  const [DataInput, setDataInput] = useState('')
  const [ProjetoInput, setProjetoInput] = useState('')
  const [ResponsavelInput, setResponsavelInput] = useState('')
  const [TelefoneInput, setTelefoneInput] = useState('')
  const [UrgenciaInput, setUrgenciaInput] = useState('')

  const [user, setUser] = useState({})

  const [Projeto, setProjeto] = useState([]);
  const [Matricula, setMatricula] = useState([]);


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
              projeto: doc.data().projeto,
              
            })
          })
          setProjeto(lista);
        })
      }
    }
    loadProjeto();
  }, [])

  useEffect(() => {
    async function loadMatricula() {
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetail))

      if (userDetail) {

        const data = JSON.parse(userDetail);

        const MatriculaRef = collection(db, "Matricula")
        const q = query(MatriculaRef, orderBy("created", "desc"))
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nome: doc.data().nome,
              projeto: doc.data().projeto,
              
            })
          })
          setMatricula(lista);
        })
      }
    }
    loadMatricula();
  }, [])


  //Registrando Cadastro
  async function handleRegister(e) {
    e.preventDefault();

    await addDoc(collection(db, "Matricula"), {

      created: new Date(),
      nome: NomeInput,
      data_nascimento: DataInput,
      projeto: ProjetoInput,
      responsavel: ResponsavelInput,
      telefone: TelefoneInput,
      urgencia: UrgenciaInput,

    })
      .then(() => {
        alert("Cadastro Realizado com Sucesso")
        
        setNomeInput('')
        setDataInput('')

        setProjetoInput('')
        setResponsavelInput('')
        setTelefoneInput('')
        setUrgenciaInput('')
      })
      .catch((error) => {
        alert("Erro " + error)
      })
  }

  

  return (


    <div>
      <Header/>
      <div className='title'><img src={Logo} alt="logo" title="Logo da Reviva" />
        <br />
        <h1>Cadastro de Matrículas</h1></div>


      <form className='box' onSubmit={handleRegister}>
        <div className="input-group">
          <label for="nome"> Nome Completo</label>
          <input type="text" id="nome" placeholder="" value={NomeInput} onChange={(e) => setNomeInput(e.target.value)} required />
        </div>

        <div class="input-group-w50">
          <label for="dt-nascimento">Data Início</label>
          <input type="date" id="dt-nascimento" value={DataInput} onChange={(e) => setDataInput(e.target.value)} required />
        </div>

        <div class="input-group-w50">
          <label for="projeto">Projeto</label>
        <select id="projeto" onChange={e=>setProjetoInput(e.target.value)}><option>Selecione o Projeto</option>
        {Projeto.map((id) => (
          <option key={id} className='list' >{id.nome}</option>
        ))}
        </select>
         
        </div>

        <div class="input-group">
          <label for="responsavel">Nomes dos pais/Responsável Legal</label>
          <input type="text" id="responsavel" placeholder="" value={ResponsavelInput} onChange={(e) => setResponsavelInput(e.target.value)} required />
        </div>

        <div class="input-group-w50">
          <label for="telefone">Telefone</label>
          <input type="tel" id="telefone" placeholder="" value={TelefoneInput} onChange={(e) => setTelefoneInput(e.target.value)} required />
        </div>

        <div class="input-group-w50">
          <label for="urgencia">Em Caso de Urgência</label>
          <input type="tel" id="telefone" placeholder="" value={UrgenciaInput} onChange={(e) => setUrgenciaInput(e.target.value)} required />
        </div>

        <div class="input-group">
          <button type='submit'>Finalizar Matrícula</button>
        </div>

        
      </form>

      {Matricula.map((id) => (
        <article key={id} className='list'>
          <p>{id.nome} Projeto: {id.projeto}</p>
          <div>
         
            <button className='btn-cmat' >Criar Matrícula</button>
          </div>

        </article>
      ))}

      

    </div>
  );
}
  

export default Matricula;