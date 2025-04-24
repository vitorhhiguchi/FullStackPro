import { Link } from 'react-router-dom';

function Contato() {
    return (
        <div>
            <h1>Pagina Contato</h1>
            <span>Contato da empresa (dd) xxxx-xxxx</span>

            <br/>
            <br/>

            <Link to="/">Home</Link> <br/>
            <Link to="/sobre">Sobre</Link>

        </div>
    )
}

export default Contato;