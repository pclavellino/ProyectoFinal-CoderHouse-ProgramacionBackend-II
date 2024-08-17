import { ticketModel } from "./models/ticket.model.js";

const getAll = async (query, options) => {
    const tickets = await ticketModel.paginate(query, options);
    return tickets;
    };

const getById = async (id) => {
    const ticket = await ticketModel.findById(id);
    return ticket;
    };

const createTicket = async (data) => {
    const ticket = await ticketModel.create(data);
    return ticket;
    };

const updateTicket = async (id, data) => {
    const ticketUpdate = await ticketModel.findByIdAndUpdate(id, data, { new: true });
    return ticketUpdate;
    };

const deleteTicket = async (id) => {
    const ticket = await ticketModel.findByIdAndUpdate(id, { status: false }, { new: true });
    return ticket;
    };

export default {
    getAll,
    getById,
    createTicket,
    updateTicket,
    deleteTicket
    }