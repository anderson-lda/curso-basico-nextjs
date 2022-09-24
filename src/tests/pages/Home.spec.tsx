import { render, screen } from '@testing-library/react'
import Home from '../../pages'; //já pega o index

describe('Home page',()=>{

    it('renders correctly',()=>{ 
        const {getByText, debug } = render(<Home />)

        debug(); //traz o componente renderizado no console
        //screen.logTestingPlaygroundURL(); //gera um link que mostra os componentes e opções de testes a serem realizados

        expect(getByText('Olá Dev!')).toBeInTheDocument();
        expect(screen.getByAltText('Home image')).toBeInTheDocument() //verifica se a imagem está renderizada
    })
})


