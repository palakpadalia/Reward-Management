import '../../assets/css/style.css';
import '../../assets/css/pages/admindashboard.css';
import Pageheader from '@/components/common/pageheader/pageheader';
import TableComponent from '@/components/ui/tables/tablecompnent';
import TableBoxComponent from '@/components/ui/tables/tableboxheader';
import React, { Fragment, useState, useEffect } from "react";

import axios from 'axios';
// import { API_KEY, API_SECRET, BASE_URL } from "../../utils/constants";

interface Transaction {
    name: string,
    redeem_request_id?: string,
    carpainter_id: string,
    carpainter_name?: string,
    mobile_number?: string,
    transaction_id?: string,
    transfer_date?: string,
    amount?: number,
    transfer_time?: string
}

const BankingHistory: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page
    const [transactionData, setTransactionData] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [searchQuery , setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/method/frappe.auth.get_logged_user`,{
                    
                });
                console.log("Logged user data:", response);
                setUserData(response.data.message);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchTransactionData = async () => {
            try {
                const response = await axios.get(`/api/method/reward_management.api.bank_history.get_bank_history_details`,{
                   
                });
                console.log("Bank table data:", response);

                // Access the nested array within the response
                const bankData = response.data.message.data;

                // Ensure response is in the expected format
                if (Array.isArray(bankData)) {
                    setTransactionData(bankData);
                } else {
                    setError("Unexpected response format");
                }

                setLoading(false);
            } catch (error) {
                setError("Error fetching data");
                setLoading(false);
            }
        };

        fetchUserData();
        fetchTransactionData();
    }, []);

    const totalPages = Math.ceil((transactionData.length || 0) / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value); // Update search query
        setCurrentPage(1);
        console.log("Search value:", value);
    };

    const handleAddProductClick = () => {
        console.log("Add Product button clicked");
        // Implement add product logic here
    };

    const formatDate = (dateString: string) => {
        const [day, month, year] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    // Ensure transactionData is an array before calling map
    const formattedTransactionData = Array.isArray(transactionData) ? transactionData.map(transaction => ({
        ...transaction,
        transfer_date: transaction.transfer_date ? formatDate(transaction.transfer_date) : '',
    })) : [];

    const filteredData = formattedTransactionData.filter(transactionData => {
        const query = searchQuery.toLowerCase();
        return (
            (transactionData.name && transactionData.name.toLowerCase().includes(query)) ||
            (transactionData.redeem_request_id && transactionData.redeem_request_id.toLowerCase().includes(query)) ||
            (transactionData.mobile_number && transactionData.mobile_number.toString().toLowerCase().includes(query)) ||
            (transactionData.amount !== undefined && transactionData.amount.toString().toLowerCase().includes(searchQuery)) ||
            (transactionData.transfer_date && transactionData.transfer_date.toLowerCase().includes(query)) ||
            (transactionData.transfer_time && transactionData.transfer_time.toLowerCase().includes(query)) ||
            (transactionData.transaction_id && transactionData.transaction_id.toLowerCase().includes(query))
        );
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Fragment>
            <Pageheader currentpage="Banking History" activepage="Transaction History" mainpage="Banking History" />

            <div className="grid grid-cols-12 gap-x-6 bg-white mt-5 rounded-lg shadow-lg">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <TableBoxComponent 
                            title="Bank History" 
                            onSearch={handleSearch} 
                            onAddButtonClick={handleAddProductClick} 
                            buttonText="Add Announcement" // Custom button text
                            showButton={false} // Hide the button
                        />

                        <div className="box-body m-5">
                          

                            <TableComponent<Transaction>
                                columns={[
                                    { header: 'Bank History ID', accessor: 'name' },
                                    { header: 'Redeem Request ID', accessor: 'redeem_request_id' },
                                    { header: 'Mobile Number', accessor: 'mobile_number' },
                                    { header: 'Amount', accessor: 'amount' },
                                    { header: 'Transaction Account', accessor: 'transaction_id' },
                                    { header: 'Transaction Date', accessor: 'transfer_date' },
                                    { header: 'Transaction Time', accessor: 'transfer_time' },
                                ]}
                                data={filteredData || []}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                handlePrevPage={handlePrevPage}
                                handleNextPage={handleNextPage}
                                handlePageChange={handlePageChange}
                                showProductQR={false} 
                                showEdit={false} 
                                showDelete={false}
                                editHeader='Action'
                                 
                                columnStyles={{
                                    'Bank History ID': 'text-[var(--primaries)] font-semibold', // Example style for QR ID column
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default BankingHistory;
