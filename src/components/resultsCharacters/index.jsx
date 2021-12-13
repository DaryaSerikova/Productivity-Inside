import React, { useState, useEffect } from 'react';
import "./style.css";
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const currentURL = 'https://rickandmortyapi.com/api/episode/1';

const requestURL = 'https://rickandmortyapi.com/api/episode/1';


function ResultCharacters() {
    const [characters, setCharacters] = useState([]) //Джессика, Морти, Хуерти.. и прочие

    useEffect(() => {

        fetch(requestURL)
            .then((res) => res.json())
            .then(episode => {
                let charactersUrls = episode["characters"] //URLs (Массив URL'ов) всех героев для одной текущей серии

                let idCharacters = charactersUrls.map((url) => {
                    let x = url.split("/")

                    return x[x.length - 1] //
                }).join() // мы получили массив айдишников нужных героев для серии
                

                fetch("https://rickandmortyapi.com/api/character/" + idCharacters) // один URL для вызова всех нужных героев серии
                    .then(res => res.json()) // строки данных
                    .then(result => setCharacters(result)) //объект данных. Записываем в charcters данные через setCharacters
            })
    }, [])
    
    return(<div>
        
        <NavLink to="/" className="btn btn-success btnLink">Назад к просмотру списка серий</NavLink>
        {
            characters.map(character => (
                <div className="infoCharacter">
                    <img className="img" src={character["image"]} alt="картинка"/>
                    <div>Имя персонажа: {character["name"]}</div>
                    <div>Пол: {character["gender"]}</div>
                    <div>Статус: {character["status"]}</div>
                    <div>Разновидность: {character["species"]}</div>
                </div>
            ))
        }
        {/* <NavLink to="/">Назад к просмотру серий</NavLink> */}
    </div>)
}

// a = [
//     "https://rickandmortyapi.com/api/character/1",
//     "https://rickandmortyapi.com/api/character/2",
//     "https://rickandmortyapi.com/api/character/38",
//     "https://rickandmortyapi.com/api/character/87",
//   ]
//   b = a.map((url) => {
//     let x = url.split("/")
//     return x[x.length - 1]
// })
// ca = b.join()
// fetch("https://rickandmortyapi.com/api/character/" + ca)
// .then(res => res.json())
// .then(sad => console.log(sad))


export default ResultCharacters;