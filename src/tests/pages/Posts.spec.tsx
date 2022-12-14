import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock';
import Posts, {getStaticProps} from '../../pages/posts';
import {getPrismicClient} from '../../services/prismic'

const posts = [
    {
        slug:'test-new-post',
        title: 'Title for new post',
        excerpt: 'Post excerpt',
        updatedAt: '24 de dezembro de 2020',
    }
]

jest.mock('../../services/prismic')

describe('Posts page',()=>{

    it('renders correctly',()=>{ 
        const {getByText, getByAltText } = render(<Posts posts={posts} />)

        expect(getByText('Title for new post')).toBeInTheDocument();
    })

    it('loads initial data', async () => { 
        const getPrismicClientMocked = mocked(getPrismicClient);

        getPrismicClientMocked.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uid: 'my-new-post',
                        data: {
                            title: [
                                {type: 'heading',text:'My new post'},
                            ],
                            content: [
                                {type: 'paragraph',text:'Post excerpt'},
                            ]
                        },
                        last_publication_date: '12-24-2020',
                    }
                ]
            })
        } as any)

        const response = await getStaticProps({})

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    posts: [
                        {slug:'my-new-post',
                        title: 'My new post',
                        excerpt: 'Post excerpt',
                        updatedAt: '24 de dezembro de 2020'}
                    ]
                }
            })
        )
    })
})


