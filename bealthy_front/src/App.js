import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./component/login";
import {Home} from "./component/Home";
import {Navigation} from './component/navigation';
import {Logout} from './component/logout';

function App() {
  console.log(localStorage.getItem('access_token'))
  return <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
    </BrowserRouter>;
}
export default App;