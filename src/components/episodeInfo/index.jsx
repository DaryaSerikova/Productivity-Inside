import React, { useState, useEffect } from 'react';
import "./style.css";
import getNumber from '../utilits/getNumberES.js'
import ResultCharacters from '../resultsCharacters/index.jsx'
import { useParams } from "react-router-dom";

const requestURL = 'https://rickandmortyapi.com/api/episode/';


function EpisodeInfo() {
    let params = useParams();

    const [episode, setEpisode] = useState({});
    const [isLoading, setLoading] = useState(true)
    let episodeURL = requestURL + params.episodeId;

    useEffect(() => {
        fetch(episodeURL)
            .then(res => res.json())
            .then(episode => { 
                setEpisode(episode);
                setLoading(false);
            })
    }, [])

    let arr = Array.from(episode);

    let noSeason = getNumber(arr, 1, 2);
    let noEpisode = getNumber(arr, 2, 2);
    let SeasonEpisode = `Сезон ${noSeason} Серия ${noEpisode}`;
    console.log(episode["characters"])
    return (
        <>  
            {isLoading ? "" : <>
                <div className="SeasonEpisodeInfo">{SeasonEpisode} "{episode["name"]}" ( {episode["air_date"]} )</div>
                <ResultCharacters characters={episode["characters"]}/>
            </>}
        </>
    )
}

export default EpisodeInfo;