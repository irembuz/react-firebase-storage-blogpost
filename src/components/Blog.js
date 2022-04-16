import React, { useEffect, useState } from "react";
import { Figure } from "react-bootstrap";
import "./Blog.css";
import { db } from "../config/firebaseConfig";

export default function App() {
  const [liste, setListe] = useState([]);
  const [yeniBlog, setYeniBlog] = useState("");

  useEffect(() => {
    db.collection("blogposts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
           setListe([...liste, doc.data()])
          // console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  // const createBlogPost = async () => {
  //   db.collection("blogposts").add({
  //     title: "",
  //     description: "",
  //     image_url: "",
  //   });
  // };

  return (
    <div className="Blog">
      <h1>Blog Listesi</h1>
      <div className="ekleme_formu">
        <input
          value={yeniBlog}
          onChange={(e) => setYeniBlog(e.target.value)}
          placeholder="Blog yazısı ekle"
        />
        <button
          onClick={() => {
            setListe([...liste, { title: yeniBlog }]);
            setYeniBlog("");
          }}
        >
          Ekle
        </button>
      </div>
      <div className="liste">
        {liste.map((item) => (
          <Figure
            key={item.id}
            onClick={() => {
              setListe(
                liste.map((e) =>
                  e.id === item.id ? { ...e, okundu: !e.okundu } : e
                )
              );
            }}
            className={item.okundu ? "yapildi" : ""}
          >
            <Figure.Image
              width={120}
              height={120}
              alt="120x120"
              src="https://miro.medium.com/max/1200/1*aLg1-G2UAlaKpBopRnmCRg.png"
            />
            <Figure.Caption>{item.title}</Figure.Caption>
          </Figure>
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
