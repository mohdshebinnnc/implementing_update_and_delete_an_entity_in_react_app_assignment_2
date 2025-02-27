const Item = ({ item ,onDelete}) => {

    // Render a single item
    // Add a Delete and Edit button
    return(
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <p>{item.name}</p>
            <button onClick={()=>onDelete(item.id)}>Delete</button>

        </div>
    )

    
};

export default Item;
