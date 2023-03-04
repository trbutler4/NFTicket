const TicketComp = ({ticketName}) => {

    return(
        <li className="tickets" key={ticketName.id}>
            <label>{ticketName.ticketName}</label>
            <br />
            <label>{ticketName.ticketPrice}</label>
            <br />
            <label>{ticketName.ticketQuantity}</label>
        </li>
    )
}

export default TicketComp