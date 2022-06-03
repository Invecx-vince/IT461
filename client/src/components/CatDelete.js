//import {useState} from "react";
import {useNavigate,useLocation} from 'react-router-dom'
const CatDelete = ({deleteHandler}) =>{
    //const [name, setName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const cat = location.state.cat;
    const formHandler = (e) => {
        if(document.activeElement.id==="yes"){
            console.log()
            e.preventDefault();
            deleteHandler(cat);
            alert("Cat Record Deleted!");
        }

        navigate('/cats');
    }
    return(
        <form onSubmit={formHandler}>
            <h1>Are you sure you want to delete this Cat Record?</h1>
            <div>
                <label>ID: {cat.id}</label>
            </div>
            <div>
                <label>Name: {cat.name}</label>
            </div>
            <button id="yes">YES</button>
            <button id="no">NO</button>
        </form>
    );
}

export default CatDelete;