import ticketRepository from "../persistence/mongoDB/ticket.repository.js"

const createTicket = async (userEmail, totalCart) => {
    const newTicket = {
        purchaser: userEmail,
        amount: totalCart,
        code: Math.random().toString(36).substr(2, 9),
    };

    const ticket = await ticketRepository.createTicket(newTicket);

    return ticket;
} 

export default {
    createTicket
}