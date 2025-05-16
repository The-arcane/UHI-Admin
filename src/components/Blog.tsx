import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    slug: 'understanding-preventive-healthcare',
    title: 'Understanding Preventive Healthcare',
    excerpt: 'Learn why preventive healthcare is crucial for long-term wellness and how to incorporate it into your lifestyle.',
    content: 'Preventive healthcare is a crucial aspect of maintaining long-term wellness. Regular check-ups, healthy lifestyle choices, and early detection of potential health issues can significantly improve health outcomes...',
    author: 'Dr. Sarah Johnson',
    date: '2024-05-01',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=60',
    category: 'Wellness'
  },
  {
    id: 2,
    slug: 'mental-health-digital-age',
    title: 'The Impact of Mental Health on Physical Well-being',
    excerpt: 'Exploring the connection between mental and physical health, and strategies for maintaining both.',
    content: 'In today\'s digital age, mental health has become increasingly important. The connection between mental and physical well-being is well-documented, and maintaining both is essential for overall health...',
    author: 'Dr. Michael Chen',
    date: '2024-04-28',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60',
    category: 'Mental Health'
  },
  {
    id: 3,
    slug: 'nutrition-myths-debunked',
    title: 'Nutrition Myths Debunked',
    excerpt: 'Separating fact from fiction in the world of nutrition and healthy eating habits.',
    content: 'There are many persistent myths about nutrition that can mislead people about healthy eating habits. In this article, we\'ll examine common misconceptions and provide science-based facts...',
    author: 'Dr. Emily Brown',
    date: '2024-04-25',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=60',
    category: 'Nutrition'
  }
];

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4"
    >
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-gray-600 mb-6">
        <User className="w-4 h-4 mr-2" />
        <span className="mr-4">{post.author}</span>
        <Calendar className="w-4 h-4 mr-2" />
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </div>
      <div className="prose max-w-none">
        {post.content}
      </div>
    </motion.article>
  );
}

function BlogList() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">Health & Wellness Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <motion.article
            key={post.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-4">
                {post.category}
              </span>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <User className="w-4 h-4 mr-1" />
                <span className="mr-4">{post.author}</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <Link 
                to={`/blog/${post.slug}`}
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                Read More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function Blog() {
  const { slug } = useParams();
  return slug ? <BlogPost /> : <BlogList />;
}

export default Blog;