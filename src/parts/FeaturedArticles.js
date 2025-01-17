import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

import Button from 'elements/Button';
import SkeletonHome from 'components/Skeleton/SkeletonHome';

function FeaturedArticles() {
  const [article, setArticle] = useState([]);
  const baseUrl = 'https://the-lazy-media-api.vercel.app/api';

  useEffect(() => {
    axios.get(`${baseUrl}/search?search=gam`).then((res) => {
      const data = res.data;
      setArticle(data);
    });
  }, [article]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <h3 className="mb-3">Featured Articles</h3>
        </div>
        <div className="col-4 mt-2">
          <Link to="/article" style={{textDecoration: 'none'}}>
            <h5 className="more-article">See more articles</h5>
          </Link>
        </div>
      </div>
      {article && article.length ? (
        <Fade bottom>
          <div className="container-grid">
            {article.slice(0, 5).map((item, idx) => (
              <div
                key={idx}
                className={`item column-4 ${idx === 0 ? 'row-2' : 'row-1'}`}
              >
                <Fade delay={300 * idx}>
                  <div className="card card-featured">
                    <div className="tag-article">{item.tag}</div>
                    <figure className="img-wrapper">
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="img-cover"
                      />
                    </figure>
                    <div className="meta-wrapper">
                      <Button
                        type="link"
                        className="strecthed-link d-block text-white"
                        href={`detail/${item.key}`}
                        style={{textDecoration: 'none'}}
                      >
                        <h6>{item.title}</h6>
                      </Button>
                      <span className="text-gray-400">
                        {item.author === 'Aldy Wayong'
                          ? 'Ikhbal Dwiyantoro'
                          : item.author}
                      </span>
                    </div>
                  </div>
                </Fade>
              </div>
            ))}
          </div>
        </Fade>
      ) : (
        <SkeletonHome />
      )}
    </div>
  );
}

export default FeaturedArticles;
