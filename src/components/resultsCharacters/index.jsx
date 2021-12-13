import React, { useState, useEffect } from 'react';
import "./style.css";
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const currentURL = 'https://rickandmortyapi.com/api/episode/1';

const requestURL = 'https://rickandmortyapi.com/api/episode/1';


function ResultCharacters(props) {
    const [characters, setCharacters] = useState([]) //Джессика, Морти, Хуерти.. и прочие
    console.log(props)

    useEffect(() => {
       // let charactersUrls = episode["characters"] //URLs (Массив URL'ов) всех героев для одной текущей серии
        let charactersUrls = props.characters //URLs (Массив URL'ов) всех героев для одной текущей серии
        let idCharacters = charactersUrls.map((url) => {
            let x = url.split("/")

            return x[x.length - 1] //
        }).join() // мы получили массив айдишников нужных героев для серии
        

        fetch("https://rickandmortyapi.com/api/character/" + idCharacters) // один URL для вызова всех нужных героев серии
            .then(res => res.json()) // строки данных
            .then(result => setCharacters(result)) //объект данных. Записываем в charcters данные через setCharacters
    }, [])
    
    return(<div>
        
        <div  className="btnLink">
            <NavLink to="/" className="btn btn-success">Назад к просмотру списка серий</NavLink>
        </div>
        
        <div className="allCards">
        {
            characters.map(character => (
                <div className="cardCharacter">
                    <img className="img" src={character["image"]} alt="картинка"/>
                    <div className="infoCharacter">
                        <div className="itemInfoCharacter">Имя персонажа: {character["name"]}</div>
                        <div className="itemInfoCharacter">Пол: {character["gender"]}</div>
                        <div className="itemInfoCharacter">Статус: {character["status"]}</div>
                        <div className="itemInfoCharacter">Разновидность: {character["species"]}</div>
                    </div>
                    
                </div>
            ))
        }
        </div>
        {/* <NavLink to="/">Назад к просмотру серий</NavLink> */}
    </div>)
}

export default ResultCharacters;