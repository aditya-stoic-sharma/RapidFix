import Customer from '../models/Customer.js';

const deleteCustomer = async (req, res) => {
    try {
        console.log("hello");
        const customerId = req.params.id;
        const deletedCustomer = await Customer.findByIdAndDelete(customerId);

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete customer', error: error.message });
    }
};
export default deleteCustomer;