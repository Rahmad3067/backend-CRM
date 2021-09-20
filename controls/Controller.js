const getAllUsers = (_req, res) => {
    res.json({
        status: 'All user list',
        data: users,
    });
};
// One user 
const getOneUser = (_req, res) => {
    res.json({
        status: ' Showing One User',
        data: {},
    });
};
// All user in one list
const getAllContacts = (_req, res) => {
    res.json({
        status: 'List of all Contacts',
        data: contacts,
    });
};
// One contact in the list
const getOneContact = (_req, res) => {
    res.json({
        status: 'List of one contact',
        data: contact,
    });
}
// Our modules to import
module.exports = {
    getAllUsers: getAllUsers,
    getOneUser: getOneUser,
    getAllContacts: getAllContacts,
    getOneContact: getOneContact,

}