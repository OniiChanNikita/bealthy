import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./component/login";
import {Posts} from "./component/Posts";
import {Researches} from "./component/Researches";
import {Navigation} from './component/navigation';
import {Logout} from './component/logout';
import {Signup} from './component/signup';
import {UploadPost} from './component/UploadPost';
import {Post} from './component/Post';
import {Profile} from './component/Profile';

function App() {
  return <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/signup" element={<Signup/>}/>

        <Route path="/" element={<Posts/>}/>
        <Route path='/researches/'element={<Researches/>}/>
        <Route exact={true} path="/post/:slug" element={<Post/>}/>
        <Route path="/upload_post" element={<UploadPost/>}/>
        <Route path='/profile/:slug'element={<Profile/>}/>

      </Routes>
    </BrowserRouter>;
}
export default App;