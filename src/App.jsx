import React, { useState } from 'react';

// --- Helper Components ---

// Heart Icon for the like button
const HeartIcon = ({ filled }) => (
    <svg
        className={`w-6 h-6 transition-all duration-300 ${filled ? 'text-rose-500 fill-current' : 'text-gray-400 group-hover:text-rose-400'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);


// --- Main Components ---

/**
 * The main header for the blog.
 * Features a semi-transparent, blurred background for a modern look.
 */
const Header = () => (
  <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md sticky top-0 z-20">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
            <svg className="w-8 h-8 mr-3 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">The Artisan Post</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-2">
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md font-medium transition-colors">Home</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md font-medium transition-colors">About</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md font-medium transition-colors">Contact</a>
        </nav>
      </div>
    </div>
  </header>
);

/**
 * Represents a single blog article with interactive elements.
 * @param {{post: object, onLike: function}} props
 */
const Article = ({ post, onLike }) => {
  if (!post) {
    return null; // Don't render if the post is not available
  }
  return (
    <article className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg dark:shadow-xl dark:shadow-rose-900/10 overflow-hidden mb-10 transition-all duration-300 border border-transparent hover:border-rose-500/50 hover:shadow-2xl">
      <div className="p-6 md:p-8">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">{post.date}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{post.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          {post.content}
        </p>
        <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
                <p className="text-gray-900 dark:text-white font-semibold">{post.author}</p>
            </div>
            <div className="flex items-center space-x-4">
                 <button onClick={() => onLike(post.id)} className="group flex items-center space-x-2 focus:outline-none">
                    <HeartIcon filled={post.liked} />
                    <span className="font-semibold text-gray-600 dark:text-gray-300 group-hover:text-rose-500 transition-colors">{post.likes}</span>
                </button>
                <a href="#" className="bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-rose-600 transition-colors shadow-sm hover:shadow-md">Read More</a>
            </div>
        </div>
      </div>
    </article>
  );
};


/**
 * The footer for the blog.
 */
const Footer = () => (
  <footer className="bg-transparent mt-12">
    <div className="container mx-auto px-6 py-8 text-center text-gray-500 dark:text-gray-400">
      <p>&copy; {new Date().getFullYear()} The Artisan Post. All Rights Reserved.</p>
    </div>
  </footer>
);


/**
 * The main App component that renders the blog page.
 */
export default function App() {
  // Initial article data, now including likes and a 'liked' state
  const initialArticles = [
    {
      id: 1,
      title: 'The Art of Storytelling',
      content: 'Storytelling is the most powerful way to put ideas into the world today. Great stories can move us, inspire us, and ultimately change the way we see the world. This article explores the core principles of crafting a compelling narrative.',
      author: 'Jane Doe',
      date: 'August 02, 2025',
      likes: 128,
      liked: false,
    },
    {
      id: 2,
      title: 'A Journey Through the Mountains',
      content: 'There is nothing quite like the serenity of a mountain landscape. From the crisp air to the breathtaking vistas, hiking offers a unique escape from the hustle and bustle of daily life. We\'ll share tips for your next adventure.',
      author: 'John Smith',
      date: 'July 29, 2025',
      likes: 94,
      liked: true,
    },
    {
      id: 3,
      title: 'The Simple Guide to Mindful Living',
      content: 'Mindfulness is the basic human ability to be fully present, aware of where we are and what we’re doing. This post breaks down simple, actionable steps you can take to incorporate mindfulness into your daily routine for a more peaceful life.',
      author: 'Emily White',
      date: 'July 25, 2025',
      likes: 210,
      liked: false,
    },
  ];

  const [articles, setArticles] = useState(initialArticles);

  // Function to handle the "like" action
  const handleLike = (id) => {
    setArticles(articles.map(article => {
      if (article.id === id) {
        // If the article is already liked, unlike it. Otherwise, like it.
        const newLikes = article.liked ? article.likes - 1 : article.likes + 1;
        return { ...article, likes: newLikes, liked: !article.liked };
      }
      return article;
    }));
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {articles.map(post => (
            <Article key={post.id} post={post} onLike={handleLike} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
