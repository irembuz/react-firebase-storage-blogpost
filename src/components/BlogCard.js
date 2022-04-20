import React, { useState } from "react";
import { Figure } from "react-bootstrap";
import "./Blog";
import "./Blog.css";

const BlogCard = ({ item, index }) => {
  const [liste, setListe] = useState([]);
  return (
    <div className="blog-card">
      <Figure
        onClick={() => {
          setListe(
            liste.map((e) =>
              e.id === item.id ? { ...e, okundu: !e.okundu } : e
            )
          );
        }}
        className={item.okundu ? "yapildi" : ""}
        id={item.id}
      >
        <Figure.Image
          width={120}
          height={120}
          alt="120x120"
          src="https://miro.medium.com/max/1200/1*aLg1-G2UAlaKpBopRnmCRg.png"
        />
        <Figure.Caption>{item.title}</Figure.Caption>
      </Figure>
    </div>
  );
};

export default BlogCard;
