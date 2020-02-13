import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "../../node_modules/axios/index";
import "./NewsList.css";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  //   padding-bottom: 3rem;
  //   width: 768px;
  //   padding: 0 auto;
  padding: 2rem;
  //   @media screen and (max-width: 768px) {
  //     width: 100%;
  //     padding-left: 1rem;
  //     padding-right: 1rem;
  //   }
`;

const NewsList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=kr&apiKey=6e51cce4375648b3a0d71f165f8e7920"
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!articles) {
    return null;
  }

  return (
    <div>
      <NewsListBlock>
        {articles.map((article, index) => (
          <NewsItem key={index} article={article}></NewsItem>
        ))}
      </NewsListBlock>
    </div>
  );
};

export default NewsList;
