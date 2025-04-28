
import { useParams } from 'react-router-dom';

function Produto () {
    const { id } = useParams();

    return (
        <div>
            <h2>PAGINA DETALHE DO PRODUTO</h2>
            <span>
                MEU PRODUTO É {id}
            </span>
        </div>
    )
}

export default Produto;