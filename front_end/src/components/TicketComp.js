const TicketComp = ({ticketName}) => {

    return(
        <li className="ticketName" key={ticketName.ticketID}>
            <label>{ticketName.ticketName}</label>
            <br />
            <label>{ticketName.ticketPrice}</label>
            <br />
            <label>{ticketName.ticketQuantity}</label>
        </li>
    )
}

export default TicketComp