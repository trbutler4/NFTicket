const LineItem = ({eventName, handleCheck, handleDelete}) => {

    return(
        <li className="item" key={eventName.id}>
            <input 
                type="checkbox"
                onChange={() => handleCheck(eventName.id)}
                checked={eventName.checked}
            />
            <button onClick={() => handleCheck(eventName.id)}>Button</button>
        </li>
    )
}

export default LineItem