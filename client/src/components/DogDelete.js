import {useState} from "react";
import {useNavigate,useLocation} from 'react-router-dom'
const DogDelete = ({deleteHandler}) =>{
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dog = location.state.dog;
    const formHandler = (e) => {
        e.preventDefault();
        deleteHandler(dog);
        alert("Dog Record Deleted!");
        navigate('/dogs');
    }
    return(
        <form onSubmit={formHandler}>
            <h1>Are you sure you want to delete this Dog Record?</h1>
            <div>
                <label>ID: {dog.id}</label>
            </div>
            <div>
                <label>Name: {dog.name}</label>
            </div>
            <button>YES</button>
        </form>
    );
}

export default DogDelete;