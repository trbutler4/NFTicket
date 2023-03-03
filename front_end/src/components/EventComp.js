const EventComp = ({eventName, category}) => {

    return(
        <li className="eventName" key={eventName.id}>
            <label>{eventName.eventName}</label>
            <br />
            <label>{eventName.category}</label>
            <br />
            
        </li>
    )
}

export default EventComp