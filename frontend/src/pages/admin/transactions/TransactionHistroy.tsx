import '../../../assets/css/style.css';
import '../../../assets/css/pages/admindashboard.css';
import Pageheader from '@/components/common/pageheader/pageheader';
import TableComponent from '@/components/ui/tables/tablecompnent';
import TableBoxComponent from '@/components/ui/tables/tableboxheader';
import React, { Fragment, useState } from "react";
import { useFrappeGetDocList } from 'frappe-react-sdk';

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

const TransactionHistory: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const { data: transactionData, error } = useFrappeGetDocList<Transaction>('Bank Balance', {
        fields: ['name', 'redeem_request_id', 'carpainter_id', 'mobile_number', 'transaction_id', 'transfer_date', 'amount', 'transfer_time']
    });

    if (error) {
        console.error("Error fetching transaction data:", error);
    }

    const totalPages = Math.ceil((transactionData?.length || 0) / itemsPerPage);

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
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formattedTransactionData = transactionData?.map(transaction => ({
        ...transaction,
        transfer_date: transaction.transfer_date ? formatDate(transaction.transfer_date) : '',
    })) || [];

    const filteredData = formattedTransactionData.filter(transaction => {
        const query = searchQuery.toLowerCase();
        return (
            (transaction.name && transaction.name.toLowerCase().includes(query)) ||
            (transaction.carpainter_id && transaction.carpainter_id.toLowerCase().includes(query)) ||
            (transaction.redeem_request_id && transaction.redeem_request_id.toString().toLowerCase().includes(query)) ||
            (transaction.carpainter_name && transaction.carpainter_name.toLowerCase().includes(query)) ||
            (transaction.transaction_id && transaction.transaction_id.toString().toLowerCase().includes(query)) ||
            (transaction.transfer_date && transaction.transfer_date.toLowerCase().includes(query)) ||
            (transaction.amount !== undefined && transaction.amount.toString().toLowerCase().includes(query)) ||
            (transaction.mobile_number && transaction.mobile_number.toLowerCase().includes(query)) ||
            (transaction.transfer_time && transaction.transfer_time.toLowerCase().includes(query))
        );
    });

    return (
        <Fragment>
            <Pageheader currentpage="Transaction History" activepage="Transaction History" mainpage="Transaction History" />

            <div className="grid grid-cols-12 gap-x-6 bg-white mt-5 rounded-lg shadow-lg">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <TableBoxComponent 
                            title="Customer Transaction History" 
                            onSearch={handleSearch} 
                            onAddButtonClick={handleAddProductClick} 
                            buttonText="Add Announcement" 
                            showButton={false}
                        />

                        <div className="box-body m-5">
                            <TableComponent<Transaction>
                                columns={[
                                    { header: 'Transaction ID', accessor: 'name' },
                                    { header: 'Redeem Request ID', accessor: 'redeem_request_id' },
                                    { header: 'Customer ID', accessor: 'carpainter_id' },
                                    { header: 'Mobile Number', accessor: 'mobile_number' },  
                                    { header: 'Transaction Account', accessor: 'transaction_id' },
                                    { header: 'Amount', accessor: 'amount' },
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
                                    'Transaction ID': 'text-[var(--primaries)] font-semibold',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default TransactionHistory;
