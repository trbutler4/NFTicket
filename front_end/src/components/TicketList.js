import TicketComp from "./TicketComp"

const TicketList = ({ tickets, handleCheck }) => {
     
    return(
        <u1>
            {tickets.map((ticketName) => (
                <TicketComp
                    key={ticketName.ticketID}
                    ticketName={ticketName}
                    ticketPrice={ticketName.ticketPrice}
                    ticketQuantity={ticketName.ticketQuantity}
                    handleCheck={handleCheck}
                />
            ))}
        </u1>
    )
}

export default TicketList