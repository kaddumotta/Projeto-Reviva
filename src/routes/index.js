import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Matricula from '../pages/Matrícula';
import Relatorio from '../pages/Relatório';
import Register from '../pages/Register';


import Private from './Private'
import Projetos from '../pages/Projetos';

function RoutesApp(){
    
        return(
           <Routes>
            <Route path='/' element={ <Home /> }/>
           
            <Route path='/cadastro' element={ <Private><Cadastro /></Private> }/>
           
            <Route path='/register' element={ <Private><Register /></Private> }/>
           
            <Route path='/matricula' element={ <Private><Matricula /></Private> }/>
           
            <Route path='/relatorio' element={ <Private><Relatorio /></Private> }/>
           
            <Route path='/projeto' element={ <Private><Projetos /></Private> }/>
           </Routes>
        )
    
}

export default RoutesApp;