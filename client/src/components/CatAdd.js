import {useState} from "react";
import {useNavigate} from 'react-router-dom'

const CatAdd = ({addHandler}) =>{
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        if(!name){
            alert('Please enter a Name');
            return;
        }
        addHandler({id:0 , name});
        alert("New Cat record Added!");
        navigate('/cats');
    }
    return(
        <form onSubmit={formHandler}>
            <label>Name</label>
            <input type="text" onChange={(e)=>{setName(e.target.value)}}/>
            <button>Add Cat</button>
        </form>
    );
}

export default CatAdd;