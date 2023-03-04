import EventComp from "./EventComp"

const EventList = ({ events, handleCheck }) => {
     
    return(
        <u1>
            {events.map((eventName) => (
                <EventComp
                    key={eventName.id}
                    eventName={eventName}
                    category={eventName.category}
                    handleCheck={handleCheck}
                />
            ))}
        </u1>
    )
}

export default EventList