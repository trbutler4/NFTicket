import LineItem from "./LineItem"

const TicketList = ({ items, handleCheck, handleDelete }) => {
     
    return(
        <u1>
            {items.map((eventName) => (
                <LineItem
                    key={item.id}
                    item={item}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ))}
        </u1>
    )
}

export default TicketList