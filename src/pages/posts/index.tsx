import { GetStaticProps } from "next";
import Prismic from '@prismicio/client'
import {RichText} from 'prismic-dom'
import Link from "next/link";
import SEO from "../../components/SEO";
import { getPrismicClient } from "../../services/prismic";
import styles from './posts.module.scss'

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({posts}: PostsProps) {
    return (
      <>
        <SEO title="Posts" />
        <main className={styles.container}>
          <div className={styles.posts}>
            {posts.map(post => 
              <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
            )}
          </div>
        </main>
      </>
    )
  }
  
  //página estática só é criada no npm run build
  //chave secreta é usada no node, não no browser, oferencendo mais segurança
  export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
      Prismic.predicates.at('document.type','post')],
      {
        fetch: ['post.title','post.content'],
      }
    )

    //formatação é feita aqui no Node para que não seja refeita cada vez que for chamada no browser (caso fosse dentro do return da página)
    const posts = response.results.map(post => {
      return {
        slug: post.uid,
        title: RichText.asText(post.data.title),
        excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '', //se não tiver deixa como vazio
        updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
          day:'2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })

    return{
      props:{
        posts,
      },
      revalidate: 60 * 60 * 12, //em segundos, tempo em que os HTMLs são recriados
    }
  }