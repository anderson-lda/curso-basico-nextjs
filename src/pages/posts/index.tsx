import { GetStaticProps } from "next";
import SEO from "../../components/SEO";

interface Post {
  id: string;
  title: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({posts}:PostsProps) {
    return (
      <div>
        <SEO title="Posts" />
        <h1>Listagem de Posts</h1>
        <ul>
        {posts.map((post)=>(
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      </div>
    )
  }
  
  //página estática só é criada no npm run build
  export const getStaticProps: GetStaticProps<PostsProps> = async () => {
    const response = await fetch('http://localhost:3333/posts');
    const posts = await response.json();
    return{
      props:{
        posts,
      },
      revalidate: 1000, //em segundos, tempo em que os HTMLs são recriados
    }
  }