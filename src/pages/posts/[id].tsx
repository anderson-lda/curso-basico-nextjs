import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router"

interface Comment{
    id: string;
    body: string;
}

interface CommentsProps {
    comments: Comment[];
}

export default function Post({comments}:CommentsProps) {
    const router = useRouter();

    if(router.isFallback){ //se a página estática não existir, será criada no primeiro acesso e acarecera o parágrafo abaixo
        return <p>Loading...</p>
    }

    return (
        <>
            <h1>Post {router.query.id}</h1>
            <ul>
                {comments.map((comment)=>(
                    <li key={comment.id}>{comment.body}</li>
                ))}
            </ul>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    //comandos abaixo permitem criar páginas estáticas no momento do build
    /*const response = await fetch('http://localhost:3333/posts');
    const posts = await response.json();

    const paths = posts.map(post => {
        return {
            params: {id: String(post.id)}
        }
    })*/

    return {
        //paths,
        paths: [],
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps<CommentsProps> = async (context) => {
    const {id} = context.params;

    const response = await fetch(`http://localhost:3333/comments?postId=${id}`);
    const comments = await response.json();
    return{
      props:{
        comments,
      },
      revalidate: 1000, //em segundos, tempo em que os HTMLs são recriados
    }
  }