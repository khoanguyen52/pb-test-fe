import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => axios.get(baseUrl);

const create = (newContact) => axios.post(baseUrl, newContact);

const update = (id, newContact) => axios.put(`${baseUrl}/${id}`, newContact);

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAll, create, update, remove };
