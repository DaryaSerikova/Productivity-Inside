import React from 'react';

//import Main from './components/main/index.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/home/index.jsx';
// import ResultCharacters from './components/resultsCharacters/index.jsx';
import EpisodeInfo from './components/episodeInfo/index.jsx';
//import InfoCharacter from './components/infoCharacter/index.jsx';


const App = (props) => {
    return (
        <div>
            {/* <Header /> */}
            <main>
                <Router>

                    <Routes>
                        {/* <Route path="*" element={Error} /> */}
                        <Route exact path="/" element={<Home />}/>
                        <Route path="/episode/:episodeId" element={<EpisodeInfo/>}/>
                        
                        {/* <Route path='/info-episode' element={<InfoEpisode />}/> */}
                    </Routes>

                </Router>
            </main>
            {/* <Footer /> */}
        </div>
    )
}

export default App;