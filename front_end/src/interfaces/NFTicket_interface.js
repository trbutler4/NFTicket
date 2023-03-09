import ContractData from "../NFTicket.json"
import { ethers } from "ethers";

// TODO: this is not currently used, but it may be useful in the future

const provider = new ethers.BrowserProvider(window.ethereum)

const signer = await provider.getSigner()

const NFTicketAbi = ContractData.abi;

const NFTicketAddress = ContractData.address;

const NFTicketContract = new ethers.Contract(NFTicketAddress, NFTicketAbi, signer)

export const getLastEventId = async () => {
    return Number(await NFTicketContract.getLastEventId())
}
