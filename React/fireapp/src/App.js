import { useState } from 'react'
import { db } from './firebaseConnection'
import { doc, setDoc, addDoc, getDoc, getDocs, updateDoc, deleteDoc,collection } from 'firebase/firestore'
import './app.css'

function App() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');

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

  async function editarPost() {
    const docRef = doc(db, "posts", idPost);
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then((snapshot) => {
      console.log("POST ATUALIZADO")
      setIdPost('');
      setTitulo('');
      setAutor('');
    })
    .catch((error) => {
      console.log("ERRO AO ATUALIZAR O POST")
    })
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef)
    .then((snapshot) => {
      alert("POST DELETADO COM SUCESSO!")
    })
    .catch((error) => {
      alert("NÃO FOI POSSIVEL EXCLUIR!")
    })
  }

  return (
    <div>
      <h1>ReactJS + Firebase :)</h1>

      <div className="container">

        <label>ID do Post:</label>
        <input
          placeholder='Digite o ID do post'
          value={idPost}
          onChange={ (e) => setIdPost(e.target.value) }
        /> <br/>

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
        <button onClick={buscarPost}>Buscar post</button> <br/>

        <button onClick={editarPost}>Atualizar post</button>


        <ul>
          {
            posts.map((post) => {
              return(
                <li key={post.id}>
                  <strong>ID: {post.id}</strong> <br/>
                  <span>Titulo: {post.titulo}</span> <br/>
                  <span>Autor: {post.autor}</span> <br/>
                  {/* Aqui é usado uma função anonima pelo fato que precisamos passar um argumento, e se não usassemos ele
                  toda vez que renderizar a página já iria excluir o post */}
                  <button onClick={ () => excluirPost(post.id) }>Excluir</button> <br/> <br/>
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
