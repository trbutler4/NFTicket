import TicketList from "./TicketList"

const TicketContent = ({tickets, handleCheck}) => {

    return(
        <>
            {tickets.length ? (
                <TicketList
                    tickets={tickets}
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

export default TicketContent