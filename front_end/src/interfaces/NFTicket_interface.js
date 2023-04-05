import ContractData from "../NFTicket.json"
import { ethers } from "ethers";


const provider = new ethers.BrowserProvider(window.ethereum)

const NFTicketAbi = ContractData.abi;

const NFTicketAddress = ContractData.address;

const getContractRef = async () => {
    const signer = await provider.getSigner()
    return new ethers.Contract(NFTicketAddress, NFTicketAbi, signer)
}

export const getLastEventId = async () => {
    const contractRef = await getContractRef()
    return Number(await contractRef.getLastEventId())
}

export const getTicketBalance = async (address, eventId) => {
    const contractRef = await getContractRef()
    const balance = await contractRef.balanceOf(address, eventId)
    return Number(balance)
}

export const getRemainingTickets = async (eventId) => {
    const contractRef = await getContractRef()
    const remainingTickets = await contractRef.getGATicketsAvailable(eventId)
    console.log("remaining tickets: ", Number(remainingTickets))
    return Number(remainingTickets)
}
