import { useState } from "react";
import {useLocation,useNavigate} from "react-router-dom"

const DogEdit =({updateHandler}) =>{
    const location = useLocation();
    const dog = location.state.dog;
    const [name, setName] = useState(dog.name);
    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        if(!name){
            alert('Field should not be empty');
            return;
        }
        dog.name = name;
        updateHandler(dog);
        alert("Dog Record Updated!\n name into: " + dog.name);
        navigate('/dogs');
    }
    return(
        <form onSubmit={formHandler}>
            <div>
                <label>ID: {dog.id}</label>
            </div>
            <label>Name:</label>
            <input type="text" placeholder={dog.name} onChange={(e)=>{setName(e.target.value)}}/>
            <button>update Details</button>
        </form>
    );
}
export default DogEdit;