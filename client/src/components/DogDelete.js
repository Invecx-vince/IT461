const DogDelete = ({dog}) =>{
    return(
        <form onSubmit={formHandler}>
            <div>
                <label>ID: {dog.id}</label>
            </div>
            <label>Name</label>
            <input type="text" onChange={(e)=>{e.target.value}}></input>
            <button>Add Dog</button>
        </form>
    );
}

export default DogDelete;