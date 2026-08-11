import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, type BlogPost, getImageUrl } from '../api/client';
import { ArrowRight, Calendar, User } from 'lucide-react';

export const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs().then(data => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-inkBlack mb-4">
          Latest News & Insights
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Stay updated with the latest in industrial automation, energy solutions, and Antrixx Technology news.
        </p>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-8">
          <div className="h-64 bg-gray-200 rounded-2xl w-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="h-48 bg-gray-200 rounded-2xl w-full"></div>
            <div className="h-48 bg-gray-200 rounded-2xl w-full"></div>
            <div className="h-48 bg-gray-200 rounded-2xl w-full"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <Link 
              key={blog.id} 
              to={`/blogs/${blog.slug}`}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-cardHover transition-all duration-300 flex flex-col h-full"
            >
              {blog.featured_image_url && (
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={getImageUrl(blog.featured_image_url)} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : 'Recent'}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {blog.author}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-inkBlack mb-3 group-hover:text-amberAccent transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                  {blog.meta_description || blog.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-inkBlack group-hover:text-amberAccent transition-colors mt-auto">
                  Read Article <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
          
          {blogs.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">
              No articles published yet. Check back later!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
