import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
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


const exercises = [
  {
    bodyPart: "Chest",
    equipment: "Barbell",
    gifUrl: "https://example.com/exercise.gif",
    id: "0001",
    name: "Bench Press",
    target: "Pectorals",
    secondaryMuscles: ["Triceps", "Deltoids"],
    instructions: [
      "Lie on the bench with your feet flat on the ground.",
      "Grip the barbell with hands slightly wider than shoulder-width apart.",
      "Lower the barbell to your chest, then press it back up to the starting position."
    ],
    slug: "bench-press"
  },
  // Другие упражнения
];

function App() {
  return <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/signup" element={<Signup/>}/>

        <Route path="/" element={<Posts/>}/>
        <Route path='/exercises/'element={<Exercises/>}/>
        <Route path='/exercise/:slug'element={<ExerciseWrapper/>}/>
        <Route exact={true} path="/post/:slug" element={<Post/>}/>
        <Route path="/upload_post" element={<UploadPost/>}/>
        <Route path='/profile/:slug'element={<Profile/>}/>

      </Routes>
    </BrowserRouter>;
}

const ExerciseWrapper = () => {
  const { slug } = useParams();
  const exercise = exercises.find(ex => ex.slug === slug);

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  return <Exercise exercise={exercise} />;
};

export default App;