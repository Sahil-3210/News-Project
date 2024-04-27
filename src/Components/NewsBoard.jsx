import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({category}) => {
  const [news, setNews] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    
      const response = await fetch(` https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setNews(data.articles);
    } 
  

  return (
    <div>
      <h2 className='text-center'>Latest <span className='badge bg-danger'>News</span></h2>
      {news.map((article, index) => (
        <NewsItem
          key={index}
          title={article.title}
          description={article.description}
          src={article.urlToImage}
          url={article.url}
        />
      ))}
    </div>
  );
};

export default NewsBoard;
