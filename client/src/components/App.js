import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { useState,useEffect } from 'react';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import {useLocation,useNavigate} from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Dogs from './components/Dogs';
import DogAdd from './components/DogAdd';
import DogDetail from './components/DogDetail';
import DogEdit from './components/DogEdit';
import DogDelete from './components/DogDelete';
import Cats from './components/Cats';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  
  const [dogs, setDogs] = useState([]);
  const [url,setUrl] = useState('/dogs/?limit=3&offset=0');
  const [cats, setCats] = useState([]);
  const [url2,setUrl2] = useState('/cats/?limit=3&offset=0');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const getDogs = async (url, options=null) => {
    setUrl(url);
    try {
        const response = await axiosPrivate.get(url, options);
        console.log(response.data);
        setDogs(response.data);
      } catch (err) {
      console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
    }
  useEffect(() => {
    const controller = new AbortController();
    getDogs('/dogs/?limit=3&offset=0', {
      signal: controller.signal
      });
      return () => {
        controller.abort();
      }
  }, []);

  const dogAddHandler = async ({name}) =>{
    console.log("DOG: ",name);
    const response = await axiosPrivate.post('/dogs/',JSON.stringify({id:0, name}));
    console.log(response.data);
    getDogs('/dogs/?limit=3&offset=0');
  }

  const dogUpdateHandler = async (dog) =>{
    console.log("DOG: ",dog);
    const response = await axiosPrivate.put('/dogs/',JSON.stringify(dog));
    console.log(response.data);
    getDogs('/dogs/?limit=3&offset=0');
  }
   const dogDeleteHandler = async (dog) =>{
    console.log("DOG:"+dog.id);
    const response = await axiosPrivate.delete('/dogs/'+dog.id);//,JSON.stringify(dog));
    console.log(response.data);
    getDogs('/dogs/?limit=3&offset=0');
  }
  
  const getCats = async (url2, options=null) => {
    setUrl2(url2);
    try {
        const response = await axiosPrivate.get(url2, options);
        console.log(response.data);
        setCats(response.data);
      } catch (err) {
      console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
    }
  useEffect(() => {
    const controller = new AbortController();
    getCats('/cats/?limit=3&offset=0', {
      signal: controller.signal
      });
      return () => {
        controller.abort();
      }
  }, []);

  const catAddHandler = async ({name}) =>{
    console.log("DOG: ",name);
    const response = await axiosPrivate.post('/cats/',JSON.stringify({id:0, name}));
    console.log(response.data);
    getCats('/cats/?limit=3&offset=0');
  }

  const catUpdateHandler = async (cat) =>{
    console.log("DOG: ",cat);
    const response = await axiosPrivate.put('/cats/',JSON.stringify(cat));
    console.log(response.data);
    getCats('/cats/?limit=3&offset=0');
  }
   const catDeleteHandler = async (cat) =>{
    console.log("DOG:"+cat.id);
    const response = await axiosPrivate.delete('/cats/'+cat.id);//,JSON.stringify(cat));
    console.log(response.data);
    getCats('/cats/?limit=3&offset=0');
  } 
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="dogs" element={<Dogs dogs={dogs} getDogs={getDogs}/>} />
          <Route path="dogs/create" element={<DogAdd addHandler={dogAddHandler} />}/>
          <Route path="/dogs/view/:id" element={<DogDetail />}/>
          <Route path="/dogs/edit/:id" element={<DogEdit updateHandler={dogUpdateHandler} />}/>
          <Route path="/dogs/delete/:id" element={<DogDelete deleteHandler={dogDeleteHandler} />}/>
          <Route path="cats" element={<Dogs cats={cats} getDogs={getDogs}/>} />
          {/* <Route path="cats/create" element={<DogAdd addHandler={catAddHandler} />}/>
          <Route path="/cats/view/:id" element={<DogDetail />}/>
          <Route path="/cats/edit/:id" element={<DogEdit updateHandler={catUpdateHandler} />}/>
          <Route path="/cats/delete/:id" element={<DogDelete deleteHandler={catDeleteHandler} />}/> */}
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;