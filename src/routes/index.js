import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Matricula from '../pages/Matrícula';
import Relatorio from '../pages/Relatório';
import Register from '../pages/Register';


import Private from './Private'

function RoutesApp(){
    
        return(
           <Routes>
            <Route path='/' element={ <Home /> }/>
            <Route path='/cadastro' element={ <Private><Cadastro /></Private> }/>
            <Route path='/register' element={ <Register /> }/>
            <Route path='/matricula' element={ <Matricula /> }/>
            <Route path='/relatorio' element={ <Relatorio /> }/>
           
           </Routes>
        )
    
}

export default RoutesApp;