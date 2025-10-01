
import { blogPostStyles } from '@/macros';
import type { BlogPostMeta } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'

const markdownFiles = import.meta.glob('../../../posts/*.md', {query: '?raw', import: 'default', eager: true });

const blogPostOptions = (blogPostSlug:string) => ({
  queryKey: ['blogpostdetail', blogPostSlug],
  queryFn: async () => {
    const res = await fetch("/blog_meta.json")
    if(!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    const blogPostMeta = data.blogPosts.find((blogPost:BlogPostMeta)=>blogPost.slug===blogPostSlug)
    const markdownFile = `../../../posts/${blogPostSlug}.md`
    const markdown: string | undefined = markdownFiles[markdownFile] as unknown as string;
    if (!markdown) throw new Error(`Markdown not found for ${blogPostSlug}`);
    return {blogPostMeta, markdown:markdown}
  }
})


export const Route = createFileRoute('/blog/$blogPost/')({
  component: BlogPostPage,
  loader: async ({context:{queryClient}, params:{blogPost}}) => 
    queryClient.ensureQueryData(blogPostOptions(blogPost))
})

function BlogPostPage() {
const {blogPost:blogPostSlug} = Route.useParams()
  const {data} = useSuspenseQuery(blogPostOptions(blogPostSlug))
  const blogPostMeta = data.blogPostMeta as BlogPostMeta
  
  const tagStyle:string = blogPostStyles[blogPostMeta.type].tagStyle;
  return (
    <div className="mx-auto bg-white rounded-2xl p-6 w-full md:max-w-2xl my-4 border border-gray-200 shadow-sm">
      <div className="w-full flex justify-end"><Link to="/blog" className='text-blue-400 hover:underline hover:text-blue-500 transition'>← Back to Blog</Link></div>
      <div className='prose w-full '>
        <ReactMarkdown>
        {data.markdown}
        </ReactMarkdown>
        </div>
        <div className="w-full flex justify-between items-center mt-4 ">
            <div className={`py-1 px-2 rounded-lg text-sm capitalize h-fit  w-fit ${tagStyle}`}>
                    {blogPostMeta.type}
            </div>
            <button  className={`py-2 px-4 transition bg-blue-400 text-white rounded-lg hover:bg-blue-500`}>
              <Link 
              to="/blog"  >
                ← Back to Blog
              </Link>  
            </button>
        </div>
    </div>
  )

}
