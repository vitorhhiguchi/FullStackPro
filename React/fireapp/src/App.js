import { useState } from 'react'
import { db } from './firebaseConnection'
import { doc, setDoc, addDoc, getDoc, getDocs, collection } from 'firebase/firestore'
import './app.css'

function App() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const [posts, setPosts] = useState([]);

  async function handleAdd(){
    // Exemplo de quando queremos acessar exatamente uma coleção e criar um doc

    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    // .then(() => {
    //   console.log("DADOS REGISTRADOS NO BANCO")
    // })
    // .catch((error) => {
    //   console.log("GEROU ERRO" + error)
    // })

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log("CADASTRADO COM SUCESSO")
      setTitulo('');
      setAutor('');
    })
    .catch((error) => {
      console.log("ERRO" + error)
    })
  }

  async function buscarPost() {
    // const postRef = doc(db, "posts", "12345")

    // await getDoc(postRef)
    // .then((snapshot) => {
    //   setAutor(snapshot.data().autor)
    //   setTitulo(snapshot.data().titulo)
    // })
    // .catch(() => {
    //   console.log("ERRO AO BUSCAR")
    // })

    const postRef = collection(db, 'posts');
    await getDocs(postRef)
    .then((snapshot) => {
      let lista = []
      
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })

      setPosts(lista);

    })
    .catch((error) => {
      console.log("DEU ALGUM ERRO AO BUSCAR");
    })

  }

  return (
    <div>
      <h1>ReactJS + Firebase :)</h1>

      <div className="container">
        <label>Titulo:</label>
        <textarea 
          type="text"
          placeholder='Digite o título'
          value={titulo}
          onChange={ (e) => setTitulo(e.target.value) }
        />
        
        <label>Auto:</label>
        <input 
          type="text" 
          placeholder="Autor do post"
          value={autor}
          onChange = { (e) => setAutor(e.target.value) }
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar post</button>

        <ul>
          {
            posts.map((post) => {
              return(
                <li key={post.id}>
                  <span>Titulo: {post.titulo}</span> <br/>
                  <span>Autor: {post.autor}</span> <br/> <br/>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
