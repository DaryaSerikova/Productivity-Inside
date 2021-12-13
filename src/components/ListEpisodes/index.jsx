import React, { useState, useEffect } from 'react';
import "./style.css";
import getNumber from '../utilits/getNumberES.js'
import Button from '@restart/ui/esm/Button';
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';
import { ClassNames } from '@emotion/react';



const requestURL = 'https://rickandmortyapi.com/api/episode';

// function sendRequest(method, url, body = null) {
//     return fetch(url).then ( response => { // по умолчанию метод GET
//         return response.json();
//     })
//    }
   
//     sendRequest ('GET', requestURL)
//        .then ( data => console.log(data)) // выведем данные в консоль
//        .catch ( err => console.log(err)) // выведем ошибку в консоль, если она есть

const ListEpisodes = () => {
    const [episodes, setEpisodes] = useState([])
    const [episodesInfo, setInfo] = useState({})

    const [empty, setEmpty] = useState(false)

    useEffect(() => {
        fetch(requestURL)
            .then((res) => res.json())
            .then(episodes => {
                setEpisodes(episodes["results"]);
                setInfo(episodes["info"]);
        })
    }, [])

    function handleMoreEpisodes(e) {
        if(episodesInfo["next"]!==null){
            fetch(episodesInfo["next"])
                .then(res => res.json())
                .then(result => {
                    setEpisodes(episodes.concat(result["results"]));
                    setInfo(result["info"]);
                })
        }
    }

    function handleSearchInput(value) {
        fetch(requestURL + "/?name=" + value)
            .then(res => {
                let json = res.json(); // there's always a body
                if (res.status >= 200 && res.status < 300) {
                  return json;
                } else {
                    return json.then(err => {throw err;});
                }
              })
            .then(result => {
                console.log("По вашему запросу ничего не найдено", result)
                setEpisodes(result["results"]);
                setInfo(result["info"]);
            })
            .catch(e => {
                setEmpty(true)
            })
    }


    console.log(episodes)
    
    let currentNoSeason = 0;


    return (
        <div className="wrapperEpisodes">
            <div className="titleEpisodes"> Список серий :</div> 
            <TextField 
                className="textField"
                id="filled-basic" 
                label="Filled" 
                variant="filled" 
                onChange={(event)=> handleSearchInput(event.target.value)}
            />
            {}
            <NavLink to="/characters" className="btn btn-success btnLink" >Перейти к информации о персонажах</NavLink>
            {
                empty ? <div className="empty">notFound</div> : episodes.map((episode) => {
                    // console.log(episodes);
                    // console.log(episode.episode);
                    let arr = Array.from(episode.episode);

                    let noSeason = getNumber(arr, 1, 2);
                    let noEpisode = getNumber(arr, 2, 2);
                    let SeasonEpisode = `Сезон ${noSeason} Серия ${noEpisode}`;

                    let infoSE = `${SeasonEpisode} "${episode["name"]}" ( ${episode["air_date"]} )`;
                    {/* console.log(infoSE); */}
                   
                    if(currentNoSeason == noSeason) {
                        return (
                            <>
                                <NavLink to={"/episode/" + episode["id"]} className="SeasonEpisode">{infoSE}</NavLink>
                                {/* <div className="SeasonEpisode">{SeasonEpisode} "{episode["name"]}" ( {episode["air_date"]} )</div> */}
                                <br/>
                            </>
                            )
                    } else {
                        currentNoSeason = currentNoSeason + 1;
                        return (
                            <>
                                <div className="season">{noSeason} Сезон</div>
                                {/* <div className="SeasonEpisode">{infoSE}</div> */}
                                <NavLink to={"/episode/" + episode["id"]} className="SeasonEpisode">{infoSE}</NavLink>
                                <br/>
                            </>
                            )
                    }

                })
            }
            {episodesInfo["next"] === null ? '' : <Button onClick={handleMoreEpisodes} type="button" className="buttonEpisodesInfo btn btn-success">Загрузить еще</Button>}
        </div>
    )
}

export default ListEpisodes;
