//import styles from '../styles/home.module.scss'

import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
}

interface HomeProps {
  posts: Post[];
}

//export default function Home() {
export default function Home({posts}:HomeProps) {
  /*const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/posts').then((response) => { //fetch é alternativa nativa ao axios
      response.json().then((data) => { //then é usado porque são chamadas assíncronas e async não é atribuível
        setPosts(data)
      })
    })
  }, []);*/

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post)=>(
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

//node é quem faz a requisição ao invés do browser
export const getServerSideProps: GetServerSideProps<HomeProps> = async () =>  {
  const response = await fetch('http://localhost:3333/posts');
  const posts = await response.json();

  return{
    props:{
      posts,
    },
  };
}
