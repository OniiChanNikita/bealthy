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
import {Profiles} from './component/Profiles';
import {PubMedSearch} from './component/PubMedSearch';
import {StudyDetail} from './component/StudyDetail';
import {MessageTest} from './component/MessageTest';
import {MessageUsersBox} from './component/MessageUsersBox';
import {MessageBox} from './component/MessageBox';
import {UploadResearch} from './component/UploadResearch';
import withLoading from './component/withLoading';
import withLoadingProfile from './component/withLoadingProfile';
import NotFoundPage from './component/NotFoundPage';
import axios from 'axios'

const fetchPosts = async () => {
  const response = await axios.get('http://localhost:8000/post/', {
    headers: {
        'Content-Type': 'application/json',
    }
  })
  return response.data
};

const fetchExercises = async () => {
  if(localStorage.getItem('access_token') === null){                               
      window.location.href = '/login'
  }
  else{
    const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises',  {
      params: {
          limit: '5',
        },
        headers: {
          'X-RapidAPI-Key': '493ed86dd6msh68811499276d21bp1def8ejsn98e44127abce',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    });
    return response
  }
};

/*const fetchProfile = async (slug) => {
  if(localStorage.getItem('access_token') === null){                               
      window.location.href = '/login'
  }
  else{
    const {data} = await axios.get(
      'http://localhost:8000/profile/'+slug,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
      }
    );

    const {data: reviewData} = await axios.get(
      'http://localhost:8000/profile/'+slug+'/reviews/',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
      }
    );
    return {data, reviewData}
  }
  
};*/

const PostsWithLoading = withLoading(Posts, fetchPosts);
const ExercisesWithLoading = withLoading(Exercises, fetchExercises);
//const ProfileWithLoading = withLoadingProfile(Profile, fetchProfile);

/*const WrappedComponentWithSlug = () => {
  const { slug } = useParams(); // Получаем slug из параметров маршрута
  return <ProfileWithLoading slug={slug} />;
};*/

function App() {
  return <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/signup" element={<Signup/>}/>

        <Route path="/" element={<PostsWithLoading />}/>

        <Route path="/upload_research/:id/:slug" element={<UploadResearch/>}/>

        <Route path='/exercises'element={<ExercisesWithLoading/>}/>
        <Route path='/exercise/:slug'element={<ExerciseWrapper/>}/>
        <Route path='/pubmed' element={<PubMedSearch />}/>
        <Route path="/study/:id" element={<StudyDetail />} />

        <Route exact={true} path="/post/:slug" element={<Post/>}/>
        <Route path="/upload_post" element={<UploadPost/>}/>
        <Route path='/profile/:slug' element={<Profile/>}/>
        <Route path='/profiles/' element={<Profiles/>}/>

        <Route path="/chat" element={<MessageTest/>} />
        <Route path="/message" element={<MessageUsersBox/>} />

        <Route path="*" element={<NotFoundPage />} />
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
  if (exercise != null && exercise != ''){
    console.log('daumn')
    return <Exercise exercise={exercise} />;
  }
  else{
    return <NotFoundPage />
  }
};

export default App;