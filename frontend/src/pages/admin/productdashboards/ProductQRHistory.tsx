import '../../../assets/css/style.css';
import '../../../assets/css/pages/admindashboard.css';
import Pageheader from '../../../components/common/pageheader/pageheader';
import TableComponent from '../../../components/ui/tables/tablecompnent';
import TableBoxComponent from '../../../components/ui/tables/tableboxheader';
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ProductQRHistory {
    name: string,
    product_qr_name?: string,
    product_table_name: string,
    redeem_date: string,
    carpenter_id: string,
    scanned: string,
    generated_date: string,
    qr_code_image: string,
    points?: number
}

const ProductQRHistory: React.FC = () => {
    const [data, setData] = useState<ProductQRHistory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(150);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        document.title='Product QR History';
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/method/reward_management.api.print_qr_code.print_qr_code');
                const fetchedData = response.data?.message ?? [];
                console.log("Fetched Data:", fetchedData); // Log the raw fetched data
                
                const flattenedData = fetchedData.flatMap((item: any) =>
                    item.qr_table_data?.map((qrItem: any) => ({
                        ...qrItem,
                        scanned: qrItem.scanned == '1' ? 'Scanned' : 'Not Scanned',
                    })) ?? []
                );
                
                console.log("Flattened Data:", flattenedData); // Log the flattened data
                setData(flattenedData);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    
    const filteredData = data.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
            item.product_qr_name?.toLowerCase().includes(query) ||
            item.product_table_name?.toLowerCase().includes(query) ||
            item.carpenter_id?.toLowerCase().includes(query) ||
            item.points?.toString().toLowerCase().includes(query) ||
            item.scanned?.toLowerCase().includes(query) ||
            item.generated_date?.toLowerCase().includes(query)
        );
    });
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    console.log("total pages",totalPages);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    console.log("data per page",paginatedData);
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
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleAddProductClick = () => {
        console.log("Add Product button clicked");
        navigate('/redeemption-history');
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <Fragment>
            <Pageheader currentpage="Product QR History" activepage="Product Dashboard" mainpage="Product QR History" />

            <div className="grid grid-cols-12 gap-x-6 bg-white mt-5 rounded-lg shadow-lg">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <TableBoxComponent
                            title="Product QR History"
                            onSearch={handleSearch}
                            onAddButtonClick={handleAddProductClick}
                            buttonText="Add New Product"
                            showButton={false}
                        />

                        <div className="box-body m-5">
                            <TableComponent<ProductQRHistory>
                                columns={[
                                    { header: 'QR ID', accessor: 'product_qr_name' },
                                    { header: 'Product Name', accessor: 'product_table_name' },
                                    { header: 'Reward Points', accessor: 'points' },
                                    { header: 'Generated Date', accessor: 'generated_date' },
                                    {
                                        header: 'Status',
                                        accessor: 'scanned',
                                    },
                                    { header: 'Customer ID', accessor: 'carpenter_id' },
                                    { header: 'Scanned Date', accessor: 'redeem_date' },
                                    {
                                        header: 'QR Image',
                                        accessor: 'qr_code_image',
                                        render: (imageUrl) => {
                                            const imageSrc = imageUrl ? imageUrl : 'placeholder.png'; 
                                            return (
                                                <img
                                                    src={imageSrc}
                                                    alt="QR Code"
                                                    style={{ width: '20px', height: '20px' }}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'placeholder.png'; 
                                                    }}
                                                />
                                            );
                                        }
                                    },
                                ]}
                                data={paginatedData}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                handlePrevPage={handlePrevPage}
                                handleNextPage={handleNextPage}
                                handlePageChange={handlePageChange}
                                showProductQR={false}
                                showEdit={false}
                                columnStyles={{
                                    'QR ID': 'text-[var(--primaries)] font-semibold',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductQRHistory;
