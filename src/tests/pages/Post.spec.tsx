import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock';
import Post, {getStaticProps} from '../../pages/posts/[slug]';
import {getPrismicClient} from '../../services/prismic'

const post = 
    {
        slug:'test-new-post',
        title: 'Title for new post',
        content: '<p>Post content</p>',
        updatedAt: '24 de dezembro de 2020',
    }


jest.mock('../../services/prismic')

jest.mock('next/router',()=>{
    return {
        useRouter(){
            return {
                isFallback: false,
            }
        }
    }
});

describe('Post page',()=>{

    it('renders correctly',()=>{ 
        const {getByText } = render(<Post post={post} />)

        expect(getByText('Title for new post')).toBeInTheDocument();
    })

    it('loads initial data', async () => { 
        const getPrismicClientMocked = mocked(getPrismicClient);

        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [
                        {type: 'heading',text:'My new post'},
                    ],
                    content: [
                        {type: 'paragraph',text:'<p>Post content</p>'},
                    ]
                },
                last_publication_date: '12-24-2020',
            })
        } as any)

        const response = await getStaticProps({
            params: {slug: 'test-new-post'}
        })

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug:'test-new-post',
                        title: 'My new post',
                        content: '<p>Post content</p>',
                        updatedAt: '24 de dezembro de 2020'
                    }
                },
                revalidate: 43200
            })
        )
    })
})


