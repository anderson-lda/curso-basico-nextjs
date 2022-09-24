import {getByAltText, render,screen} from '@testing-library/react'
import { Header } from '.'

jest.mock('next/router',()=>{
    return {
        useRouter(){
            return {
                asPath: '/',
            }
        }
    }
});

describe('Header component',()=>{

    it('renders correctly',()=>{ 
        const {getByText} = render(<Header />)

        //screen.logTestingPlaygroundURL(); //gera um link que mostra os componentes e opções de testes a serem realizados

        expect(getByText('Home')).toBeInTheDocument();
        expect(getByText('Posts')).toBeInTheDocument();

        expect(screen.getByAltText('DevNews')).toBeInTheDocument() //verifica se a imagem está renderizada
    })
})


