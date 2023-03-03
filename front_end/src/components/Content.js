import EventList from "./EventList"

const Content = ({events, handleCheck}) => {

    return(
        <>
            {events.length ? (
                <EventList
                    events={events}
                    handleCheck={handleCheck}
                />
            ) : (
                <p style={{
                    marginTop: '2rem'
                }}>Your List is Empty</p>
            )}
        </>
    )
}



export default Content