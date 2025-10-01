
import OverlayTitle from '@/components/OverlayTitle';
import { blogPostStyles }  from '@/macros';
import type { BlogPostMeta } from '@/types'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'
import {motion} from 'framer-motion';

const blogMetaQueryOptions = () => queryOptions({
  queryKey: ['blogmeta'],
  queryFn: async () => {
    const res = await fetch("/blog_meta.json");
    if(!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data
  },
})


export const Route = createFileRoute('/blog/')({
  component: BlogPage,
  loader: ({context:{queryClient}}) => queryClient.ensureQueryData(blogMetaQueryOptions()),
})



function BlogPage() {
  const { data } = useSuspenseQuery(blogMetaQueryOptions())
  const blogPosts = data.blogPosts as BlogPostMeta[]
  


  return (
  <>
  <div className="bg-neutral-100 h-4">

  </div>
  <OverlayTitle image="assets/blog-post-header-bg.jpg" overlayStyle="bg-black/30 backdrop-blur-sm">
  <div className='w-full md:w-xl mx-auto  py-6 text-center'>
      <h1 className='text-white text-3xl mb-4 text-shadow-lg text-shadow-black/30'>Blog & Anouncements </h1>
      <p className='text-white text-lg text-shadow-lg text-shadow-black/30 mb-2'>
       News, events, and stories from BilCats <br /> Built by students, volunteers, and friends of our campus cats.  
      </p>
      {/* <div className="mt-2 rounded-2xl bg-black/50 p-4">
      
      </div> */}
  </div>
  </OverlayTitle>
  <div className="w-full md:max-w-6xl mx-auto p-4 ">

    <div className='max-w-6xl mx-auto my-4 p-2 grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {/* <h1 className='text-amber-400 text-3xl text-shadow-md/40 text-shadow-amber-600'>
                Blog & Anouncements
            </h1> */}
            
         
            {/* Blog Post Card */}
            {blogPosts.map((blogPost:BlogPostMeta, index:number)=>{
              const currentStyle = blogPostStyles[blogPost.type]
              return (
              <motion.div 
                key={blogPost.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className={`bg-white rounded-xl 
                px-3 py-4 
                border border-gray-200
                shadow-sm
                h-full`}
              >
                <h2 className={`text-lg mb-2 text-black`}>
                  {blogPost.title}
                </h2>
                <p className={`text-shadow-2xs text-black`}>
                  {blogPost.excerpt}
                </p>
                {/* Bottom Container */}
    
                <div className="flex justify-between mt-2">
                  <div className={`py-1 px-2 rounded-lg text-sm capitalize h-fit  ${currentStyle?.tagStyle}`}>
                    {blogPost.type}
                  </div>
                  <button className={`py-2 px-4 transition bg-black text-white rounded-lg hover:bg-gray-800`}>
                    <Link 
                    to="/blog/$blogPost"  
                    params={{blogPost:blogPost.slug}} 
                    >
                      Read More →
                    </Link>  
                  </button>
                </div>
              </motion.div>)
            })}
    </div>
  </div>
  </>
)
}
