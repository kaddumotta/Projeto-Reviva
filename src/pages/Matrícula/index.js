import './matricula.css';
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import Logo from '../../Imagens/logo.png';
import { toast } from 'react-toastify'
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'

import Header from '../../Components/Header';

function Matricula() {

  const [NomeInput, setNomeInput] = useState('')
  const [DataInput, setDataInput] = useState('')
  const [ProjetoInput, setProjetoInput] = useState('')
  const [ResponsavelInput, setResponsavelInput] = useState('')
  const [TelefoneInput, setTelefoneInput] = useState('')
  const [UrgenciaInput, setUrgenciaInput] = useState('')
  const [DiaSemana, setDiaSemanaInput] = useState('')
  const [user, setUser] = useState({})
  const [edit, setEdit] = useState({})
  const [Projeto, setProjeto] = useState([]);
  const [Matricula, setMatricula] = useState([]);
  const [DataProjeto, setDataProjeto] = useState([]);
  const [Status, setStatus] = useState('Ativa')
  


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
              Status: doc.data().Status,
              
            })
          })
          setMatricula(lista);
        })
      }
    }
    loadMatricula();
  }, [])


  useEffect(() => {
    async function loadDataProjeto() {
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetail))

      if (userDetail) {

        const data = JSON.parse(userDetail);

        const FrequenciaRef = collection(db, "Frequencia")
        const q = query(FrequenciaRef, orderBy("created", "desc"))
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nome: doc.data().nome,
              projeto: doc.data().projeto,

              
            })
          })
          setDataProjeto(lista);
        })
      }
    }
    loadDataProjeto();
  }, [])


  //Registrando Matrícula
  async function handleRegister(e) {
    e.preventDefault();
  
        await addDoc(collection(db, "Matricula"), {

      created: new Date(),
      Status: Status,
      nome: NomeInput,
      data_nascimento: DataInput,
      projeto: ProjetoInput,
      responsavel: ResponsavelInput,
      telefone: TelefoneInput,
      urgencia: UrgenciaInput,
      dia_projeto: DiaSemana,

    })
      .then(() => {
        alert("Matrícula Realizada com Sucesso")
        
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

      await addDoc(collection(db, "Frequencia"), {

        created: new Date(),
        nome: NomeInput,
        dia_projeto: DiaSemana,
  
      })
        .then(() => {
          alert("Frequência Cadastrada com Sucesso")
          
          setNomeInput('')
          setProjetoInput('')
          setResponsavelInput('')
          setTelefoneInput('')
          setUrgenciaInput('')
          setDiaSemanaInput('')
        })
        .catch((error) => {
          alert("Erro " + error)
        })
      
  }

  //Dados que serão alterados
  function editMatricula(id) {
    setStatus(id.Status);
    setEdit(id);

    handleUpdateMatricula();
  }

  //Função para realizar a atualização

  async function handleUpdateMatricula() {
    const MatriculaRef = doc(db, "Matricula", edit?.id)
    await updateDoc(MatriculaRef, {
      Status: 'Inativa',
     
    })
      .then(() => {
        alert("Matricula Inativa!")
        setStatus('')
        setEdit('')
      })
      .catch((error) => {
        alert("Erro ao Inativar Matricula!" + error)
        setEdit('')
        setStatus('')
      })
  }

  

  return (


    <div>
      <Header/>
      <div className='title'><img src={Logo} alt="logo" title="Logo da Reviva" />
        <span>Servimos por Amor! E Amamos Servir!</span>
        <br />
        <h1>Cadastro de Matrículas</h1></div>

      <form className='box' onSubmit={handleRegister}>

        <div className="input-group">
          <label for="nome"> Nome Completo</label>
          <input type="text" id="nome" placeholder="Digite o seu nome completo" value={NomeInput} onChange={(e) => setNomeInput(e.target.value)} required />
        </div>

        
        <div className="input-group-w50">
        <label for="projeto">Projeto</label>
        <select id="projeto" onChange={e=>setProjetoInput(e.target.value)}><option>Selecione o Projeto</option>
        {Projeto.map((id) => (
          <option key={id} className='list' >{id.nome}</option>
        ))}
        </select>
        </div>

        <div className="input-group-w50">
        <label for="dt-nascimento">Dia do Projeto</label>
          
          <select id="dt-nascimento" value={DiaSemana} onChange={(e) => setDiaSemanaInput(e.target.value)} required>
            <option value="">Selecione</option>
            <option value="segunda">Segunda-feira</option>
            <option value="terca">Terça-feira</option>
            <option value="quarta">Quarta-feira</option>
            <option value="quinta">Quinta-feira</option>
            <option value="sexta">Sexta-feira</option>
          </select>
        </div>

        <div className="input-group">
          <label for="responsavel">Nomes dos pais/Responsável Legal</label>
          <input type="text" id="responsavel" placeholder="Digite os Nomes dos pais/Responsável Legal" value={ResponsavelInput} onChange={(e) => setResponsavelInput(e.target.value)} required />
        </div>

        <div className="input-group-w50">
          <label for="telefone">Telefone</label>
          <input type="tel" id="telefone" placeholder="Digite o seu telefone" value={TelefoneInput} onChange={(e) => setTelefoneInput(e.target.value)} required />
        </div>

        <div className="input-group-w50">
          <label for="urgencia">Em Caso de Urgência</label>
          <input type="tel" id="telefone" placeholder="Digite o contato em caso de urgência" value={UrgenciaInput} onChange={(e) => setUrgenciaInput(e.target.value)} required />
        </div>       


        <div class="input-group">
          
                       <button className='btn-register' type='submit'>Cadastrar</button>
        </div>

      </form>


      {Matricula.map((id) => (
        <article key={id} className='list'>
          <p>{id.nome} {id.Status}</p>
          <div>
           
          <button className='btn-edit' onClick={() => editMatricula(id)} >Inativar Matrícula</button>
          </div>

        </article>
      ))}

    </div>
  );
}


export default Matricula;