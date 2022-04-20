import React, { useEffect, useState } from "react";
import "./Blog.css";
import { db } from "../config/firebaseConfig";
import BlogCard from "./BlogCard";

export default function App() {
  const [liste, setListe] = useState([]);
  const [yeniBlog, setYeniBlog] = useState("");

  useEffect(() => {
    db.collection("blogposts")
      .get()
      .then((querySnapshot) => {
        let tentativeArray = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          tentativeArray.push({ id: doc.id, ...doc.data() });
        });
        console.log(tentativeArray);
        setListe([...liste, ...tentativeArray]);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  const createBlogPost = async () => {
    const newBlog = {
      title: yeniBlog,
      description: "",
      image_url: "",
    };

    let myData = await db.collection("blogposts").add(newBlog);
    newBlog["id"] = myData.id;

    setListe([...liste, newBlog]);

    setYeniBlog("");
  };

  return (
    <div className="Blog">
      <h1>Blog Listesi</h1>
      <div className="ekleme_formu">
        <input
          value={yeniBlog}
          onChange={(e) => setYeniBlog(e.target.value)}
          placeholder="Blog yazısı ekle"
        />
        <button onClick={createBlogPost}>Ekle</button>
      </div>
      <div className="liste">
        {liste.map((item, index) => (
          <BlogCard key={index} item={item} liste={liste} setListe={setListe} />
        ))}
      </div>
      <button
        onClick={() => setListe(liste.filter((item) => !item.okundu))}
        className="temizle"
      >
        Seçilenleri Temizle
      </button>
    </div>
  );
}
