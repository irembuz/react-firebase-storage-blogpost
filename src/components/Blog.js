import React, { useState } from "react";
import { Figure } from "react-bootstrap";
import "./Blog.css";

const INITIAL_STATE = [
  { id: 1, baslik: "React Nedir?", okundu: false },
  { id: 2, baslik: "Redux Nedir?", okundu: true },
];

export default function App() {
  const [liste, setListe] = useState(INITIAL_STATE);
  const [yeniBlog, setYeniBlog] = useState("");

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
            setListe([...liste, { baslik: yeniBlog }]);
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
            <Figure.Caption>{item.baslik}</Figure.Caption>
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
