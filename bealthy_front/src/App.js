import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import {Login} from "./component/login";
import {Posts} from "./component/Posts";
import {Exercises} from "./component/Exercises";
import {Exercise} from "./component/Exercise";
import {Navigation} from './component/navigation';
import {Logout} from './component/logout';
import {Signup} from './component/signup';
import {UploadPost} from './component/UploadPost';
import {Post} from './component/Post';
import {Profile} from './component/Profile';
import {PubMedSearch} from './component/PubMedSearch';
import {StudyDetail} from './component/StudyDetail';
import {MessageTest} from './component/MessageTest';
import axios from 'axios'

function App() {
  return <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/signup" element={<Signup/>}/>

        <Route path="/" element={<Posts/>}/>

        <Route path='/exercises'element={<Exercises/>}/>
        <Route path='/exercise/:slug'element={<ExerciseWrapper/>}/>
        <Route path='/pubmed' element={<PubMedSearch />}/>
        <Route path="/study/:id" element={<StudyDetail />} />

        <Route exact={true} path="/post/:slug" element={<Post/>}/>
        <Route path="/upload_post" element={<UploadPost/>}/>
        <Route path='/profile/:slug'element={<Profile/>}/>

        <Route path="/chat" element={<MessageTest roomName='111'/>} />
      </Routes>
    </BrowserRouter>;
}

const ExerciseWrapper = () => {
  const { slug } = useParams();
  const [exercise, setExercise] = useState(null)
  useEffect(() => {
    const loadExercise = async (s) => {
      const {data: ex} = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/exercise/${s}`,  {
            headers: {
              'X-RapidAPI-Key': '493ed86dd6msh68811499276d21bp1def8ejsn98e44127abce',
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
      });
      setExercise(ex)
    }
    loadExercise(slug)

  }, [slug])
  console.log(exercise)
  if (exercise != null){
    return <Exercise exercise={exercise} />;
  }
};

export default App;