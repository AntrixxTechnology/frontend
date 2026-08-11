import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug, type BlogPost, getImageUrl } from '../api/client';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getBlogBySlug(slug).then(data => {
        setBlog(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading article...</div>;
  }

  if (!blog) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-display font-bold text-inkBlack mb-4">Article Not Found</h1>
        <Link to="/blogs" className="btn-primary py-2 px-6">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.meta_title || blog.title} | Antrixx Technology</title>
        {blog.meta_description && <meta name="description" content={blog.meta_description} />}
      </Helmet>

      <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-amberAccent hover:text-amberAccentDark mb-8 transition-colors uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>
        
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-inkBlack mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 pb-8">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-amberAccent" /> {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : 'Recent'}</span>
            <span className="flex items-center gap-2"><User className="w-4 h-4 text-amberAccent" /> {blog.author}</span>
          </div>
        </div>

        {blog.featured_image_url && (
          <div className="w-full h-auto rounded-2xl overflow-hidden mb-12 shadow-cardHover">
            <img src={getImageUrl(blog.featured_image_url)} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div 
          className="prose prose-lg prose-amber max-w-none text-gray-700 font-body"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </>
  );
};
