import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./component/login";
import {Home} from "./component/Home";
import {Navigation} from './component/navigation';
import {Logout} from './component/logout';
import {Signup} from './component/signup';
import {UploadPost} from './component/UploadPost';

function App() {
  return <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/post" element={<Home/>}/>
        <Route path="/upload_post" element={<UploadPost/>}/>

      </Routes>
    </BrowserRouter>;
}
export default App;