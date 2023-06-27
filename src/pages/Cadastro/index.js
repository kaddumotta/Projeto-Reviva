
import './cadastro.css';
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import Logo from '../../Imagens/logo.png';
import { toast } from 'react-toastify'
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'

import Header from '../../Components/Header';


function Cadastro() {

  const [NomeInput, setNomeInput] = useState('')
  const [DataInput, setDataInput] = useState('')
  const [IdadeInput, setIdadeInput] = useState('')
  const [RgInput, setRgInput] = useState('')
  const [EnderecoInput, setEnderecoInput] = useState('')
  const [CidadeInput, setCidadeInput] = useState('')
  const [BairroInput, setBairroInput] = useState('')
  const [EstadoInput, setEstadoInput] = useState('')
  const [EscolaInput, setEscolaInput] = useState('')
  const [SerieInput, setSerieInput] = useState('')
  const [PeriodoInput, setPeriodoInput] = useState('')
  const [ResponsavelInput, setResponsavelInput] = useState('')
  const [TelefoneInput, setTelefoneInput] = useState('')
  const [UrgenciaInput, setUrgenciaInput] = useState('')
  const [edit, setEdit] = useState({})

  const [user, setUser] = useState({})


  const [cadastro, setCadastro] = useState([]);


  useEffect(() => {
    async function loadCadastro() {
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetail))

      if (userDetail) {

        const data = JSON.parse(userDetail);

        const cadastroRef = collection(db, "Cadastro")
        const q = query(cadastroRef, orderBy("created", "desc"))
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nome: doc.data().nome,
              data_nascimento: doc.data().data_nascimento,
              idade: doc.data().idade,
              rg: doc.data().rg,
              endereco: doc.data().endereco,
              cidade: doc.data().cidade,
              bairro: doc.data().bairro,
              estado: doc.data().estado,
              escola: doc.data().escola,
              serie: doc.data().serie,
              periodo: doc.data().periodo,
              responsavel: doc.data().responsavel,
              telefone: doc.data().telefone,
              urgencia: doc.data().urgencia,

            })
          })
          setCadastro(lista);
        })
      }
    }
    loadCadastro();
  }, [])


  //Registrando Cadastro e Alterando Cadastro

  async function handleRegister(e) {
    e.preventDefault();

    //Condição se for edição ir para UpdateCadastro
    if (edit?.id) {
      handleUpdateCadastro();
      return;
    }

    //Fazendo o registro
    await addDoc(collection(db, "Cadastro"), {

      created: new Date(),
      nome: NomeInput,
      data_nascimento: DataInput,
      idade: IdadeInput,
      rg: RgInput,
      endereço: EnderecoInput,
      cidade: CidadeInput,
      bairro: BairroInput,
      estado: EstadoInput,
      escola: EscolaInput,
      serie: SerieInput,
      periodo: PeriodoInput,
      responsavel: ResponsavelInput,
      telefone: TelefoneInput,
      urgencia: UrgenciaInput,

    })
      .then(() => {
        toast.success("Cadastro Realizado com Sucesso")
        setNomeInput('')
        setDataInput('')
        setIdadeInput('')
        setRgInput('')
        setEnderecoInput('')
        setCidadeInput('')
        setBairroInput('')
        setEstadoInput('')
        setEscolaInput('')
        setSerieInput('')
        setPeriodoInput('')
        setResponsavelInput('')
        setTelefoneInput('')
        setUrgenciaInput('')
      })
      .catch((error) => {
        toast.warn("Erro " + error)
      })
  }

  //Dados que serão alterados
  function editCadastro(id) {
    setNomeInput(id.nome)
    setDataInput(id.data_nascimento)
    setIdadeInput(id.idade)
    setRgInput(id.rg)
    setEnderecoInput(id.endereco)
    setCidadeInput(id.cidade)
    setBairroInput(id.bairro)
    setEstadoInput(id.estado)
    setEscolaInput(id.escola)
    setSerieInput(id.serie)
    setPeriodoInput(id.periodo)
    setResponsavelInput(id.responsavel)
    setTelefoneInput(id.telefone)
    setUrgenciaInput(id.urgencia)
    setEdit(id);
  }

  //Função para realizar a atualização

  async function handleUpdateCadastro() {
    const CadastroRef = doc(db, "Cadastro", edit?.id)
    await updateDoc(CadastroRef, {
      nome: NomeInput,
      data_nascimento: DataInput,
      idade: IdadeInput,
      rg: RgInput,
      endereço: EnderecoInput,
      cidade: CidadeInput,
      bairro: BairroInput,
      estado: EstadoInput,
      escola: EscolaInput,
      serie: SerieInput,
      periodo: PeriodoInput,
      responsavel: ResponsavelInput,
      telefone: TelefoneInput,
      urgencia: UrgenciaInput,
    })
      .then(() => {
        alert("Cadastro Atualizado!")
        setNomeInput('')
        setDataInput('')
        setIdadeInput('')
        setRgInput('')
        setEnderecoInput('')
        setCidadeInput('')
        setBairroInput('')
        setEstadoInput('')
        setEscolaInput('')
        setSerieInput('')
        setPeriodoInput('')
        setResponsavelInput('')
        setTelefoneInput('')
        setUrgenciaInput('')
        setEdit('')
      })
      .catch(() => {
        alert("Erro ao atualizar Cadastro!")
        setNomeInput('')
        setDataInput('')
        setIdadeInput('')
        setRgInput('')
        setEnderecoInput('')
        setCidadeInput('')
        setBairroInput('')
        setEstadoInput('')
        setEscolaInput('')
        setSerieInput('')
        setPeriodoInput('')
        setResponsavelInput('')
        setTelefoneInput('')
        setUrgenciaInput('')
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
        <h1>Cadastro de Assistidos</h1></div>


      <form className='box' onSubmit={handleRegister}>

        <div className="input-group">
          <label for="nome"> Nome Completo</label>
          <input type="text" id="nome" placeholder="Digite o seu nome completo" value={NomeInput} onChange={(e) => setNomeInput(e.target.value)} required />
        </div>

        <div class="input-group-w33">
          <label for="dt-nascimento">Data Nasc</label>
          <input type="date" id="dt-nascimento" value={DataInput} onChange={(e) => setDataInput(e.target.value)} required />
        </div>

        <div class="input-group-w33">
          <label for="idade">Idade</label>
          <input type="text" id="idade" placeholder="Digite sua idade" value={IdadeInput} onChange={(e) => setIdadeInput(e.target.value)} required />
        </div>

        <div class="input-group-w33">
          <label for="rg">RG</label>
          <input type="text" id="rg" placeholder="Digite seu RG" value={RgInput} onChange={(e) => setRgInput(e.target.value)} required />
        </div>

        <div className="input-group">
          <label for="endereco">Endereço</label>
          <input type="text" id="endereco" placeholder="Digite o seu endereço" value={EnderecoInput} onChange={(e) => setEnderecoInput(e.target.value)} required />
        </div>

        <div class="input-group-w33">
          <label for="cidade">Cidade</label>
          <input type="text" id="cidade" placeholder='Digite sua cidade' value={CidadeInput} onChange={(e) => setCidadeInput(e.target.value)} required />
        </div>

        <div class="input-group-w33">
          <label for="bairro">Bairro</label>
          <input type="text" id="bairro" placeholder="Digite seu bairro" value={BairroInput} onChange={(e) => setBairroInput(e.target.value)} required />
        </div>

        <div class="input-group-w33">
          <label for="estado">Estado</label>
          <input type="text" id="estado" placeholder="Digite seu Estado" value={EstadoInput} onChange={(e) => setEstadoInput(e.target.value)} required />
        </div>

        <div class="input-group-w33">
          <label for="escola">Escola</label>
          <input type="text" id="escola" placeholder="Digite o nome da escola" value={EscolaInput} onChange={(e) => setEscolaInput(e.target.value)} required />
        </div>

        <div class="input-group-w33">
          <label for="serie">Série</label>
          <input type="text" id="serie" placeholder="Digite sua série" value={SerieInput} onChange={(e) => setSerieInput(e.target.value)} required />
        </div>

        <div class="input-group-w33">
          <label for="periodo">Período</label>
          <input type="text" id="periodo" placeholder="Digite seu período" value={PeriodoInput} onChange={(e) => setPeriodoInput(e.target.value)} required />
        </div>

        <div class="input-group">
          <label for="responsavel">Nomes dos pais/Responsável Legal</label>
          <input type="text" id="responsavel" placeholder="Digite os Nomes dos pais/Responsável Legal" value={ResponsavelInput} onChange={(e) => setResponsavelInput(e.target.value)} required />
        </div>

        <div class="input-group-w50">
          <label for="telefone">Telefone</label>
          <input type="tel" id="telefone" placeholder="Digite o seu telefone" value={TelefoneInput} onChange={(e) => setTelefoneInput(e.target.value)} required />
        </div>

        <div class="input-group-w50">
          <label for="urgencia">Em Caso de Urgência</label>
          <input type="tel" id="telefone" placeholder="Digite o contato em caso de urgência" value={UrgenciaInput} onChange={(e) => setUrgenciaInput(e.target.value)} required />
        </div>

        <div class="input-group">
          {Object.keys(edit).length > 0 ? (
            <button className='btn-register' type='submit'>Atualizar Cadastro</button>) : (
            <button className='btn-register' type='submit'>Cadastrar</button>
          )}
        </div>

      </form>

      {cadastro.map((id) => (
        <article key={id} className='list'>
          <p>{id.nome}</p>
          <div>
            <button className='btn-edit' onClick={() => editCadastro(id)} >Editar Cadastro</button>
            <button className='btn-cmat' >Criar Matrícula</button>
          </div>

        </article>
      ))}

      

    </div>
  );
}


export default Cadastro;