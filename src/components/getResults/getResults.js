export default results = () => {
    const requestURL = 'https://rickandmortyapi.com/api/episode';
    const [episodes, setEpisodes] = useState({
        "results": [],
        "info": {}
    })

    useEffect(() => {
        fetch(requestURL)
            .then((res) => res.json())
            .then(episodes => {setEpisodes(episodes)})
    }, [])
    return (episodes["results"]);
}