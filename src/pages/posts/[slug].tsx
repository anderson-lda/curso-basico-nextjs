import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router"
import Prismic from '@prismicio/client'
import {RichText} from 'prismic-dom'
import { getPrismicClient } from "../../services/prismic";
import SEO from "../../components/SEO";
import styles from './post.module.scss'

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post({post}:PostProps) {
    const router = useRouter();

    if(router.isFallback){ //se a página estática não existir, será criada no primeiro acesso e aparecerá o parágrafo abaixo
        return <p>Loading...</p>
    }

    return (
        <>
        <SEO title="Post" />
        <main className={styles.container}>
          <article className={styles.post}>
            <h1>{post.title}</h1>
            <time>{post.updatedAt}</time>
            <div className={styles.content} dangerouslySetInnerHTML={{__html:post.content}} />
          </article>
        </main>
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
        fallback: true, //como true cria página a cada acesso
    };
}

//cria a página estática
export const getStaticProps: GetStaticProps = async (context) => {
    const {slug} = context.params;
    const prismic = getPrismicClient();

    const response = await prismic.getByUID('post',String(slug),{});

    //formatação é feita aqui no Node para que não seja refeita cada vez que for chamada no browser (caso fosse dentro do return da página)
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asText(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR',{
          day:'2-digit',
          month: 'long',
          year: 'numeric'
        })
      }


    return{
      props:{
        post,
      },
      revalidate: 60*60*12, //em segundos, tempo em que os HTMLs são recriados caso próximo acesso
    }
  }