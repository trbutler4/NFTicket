const EventComp = ({eventName, handleCheck}) => {

    return(
        <li className="eventName" key={eventName.id}>
            <input 
                type="checkbox"
                onChange={() => handleCheck(eventName.id)}
                checked={eventName.checked}
            />
            <label>{eventName.eventName}</label>
            <br />
            <label>{eventName.category}</label>
            <br />
            
        </li>
    )
}

export default EventComp