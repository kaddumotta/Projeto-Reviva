
import './cadastro.css';
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import Logo from '../../Imagens/logo.png';

import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'


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


  //Registrando Cadastro
  async function handleRegister(e) {
    e.preventDefault();



    await addDoc(collection(db, "Cadastro"), {

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
        alert("Cadastro Realizado com Sucesso")
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
        alert("Erro " + error)
      })
  }

  //fazendo o logout
  async function handleLogout() {
    await signOut(auth)
  }

  return (


    <div>
      <div className='title'><img src={Logo} alt="logo" title="Logo da Reviva" />
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
          <button type='submit'>Cadastrar</button>
        </div>

      </form>

        <button className='btn-Cad' to="/cadastro">Cadastro</button>
        <button className='btn-Mat' to="/matricula" >Matrícula</button>
        <button className='btn-Rel' to="/relatorio" >Relatório</button>
        <button className='btn-logout' onClick={handleLogout}>Sair</button>
      

    </div>
  );
}

export default Cadastro;