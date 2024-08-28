import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { API_KEY, API_SECRET, BASE_URL } from "../../../utils/constants";
import Pageheader from '@/components/common/pageheader/pageheader';
import TableComponent from '@/components/ui/tables/tablecompnent'; // Ensure correct path
import TableBoxComponent from '@/components/ui/tables/tableboxheader';
import '../../../assets/css/style.css';
import '../../../assets/css/pages/admindashboard.css';

interface QRCodeImage {
    qr_code_image: string;
    points: number;
}

interface DownloadProductQRCode {
    product_name?: string;
    generated_date?: string;
    total_product?: number;
    points?: number;
    qr_code_images?: QRCodeImage[];
}

const DownloadQRCode: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<DownloadProductQRCode[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [itemsPerPage] = useState(5);
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');

    useEffect(() => {
        const fetchData = async () => {
            if (!productName) {
                setError('Product name is missing in the URL');
                return;
            }
        
            try {
                const response = await axios.get(`/api/method/reward_management.api.print_qr_code.get_product_by_name`, {
                    params: { productName },
                   
                });

                if (response.data.message && Array.isArray(response.data.message.message)) {
                    console.log("data-------", response);
                    // Aggregate data by generated_date and product_name
                    const aggregatedData = response.data.message.message.map((item: any) => ({
                        product_name: item.qr_code_images[0]?.product_name || 'Unknown Product Name',
                        generated_date: item.generated_date,
                        total_product: item.total_product,
                        points: item.qr_code_images.reduce((acc: number, img: any) => acc + img.points, 0),
                        qr_code_images: item.qr_code_images, // Include qr_code_images here
                    }));
                    
                    setData(aggregatedData);
                } else {
                    setData([]);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch data');
            }
        };
        
        fetchData();
    }, [productName]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

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
        console.log("Search value:", value);
        // Implement search logic here
    };

    const handleAddProductClick = () => {
        console.log("Back button clicked");
        navigate('/product-master');
    };

    // Function to handle QR code image download
    const handleDownloadQR = (row: DownloadProductQRCode) => {
        if (row.qr_code_images) {
            row.qr_code_images.forEach((image) => {
                const link = document.createElement('a');
                link.href = image.qr_code_image;
                link.download = image.qr_code_image.split('/').pop() || 'qr_code.png';
                link.click();
            });
        }
    };

    return (
        <Fragment>
            <Pageheader currentpage="Download QR" activepage="Product Master" mainpage="Download QR" />
            <div className="grid grid-cols-12 gap-x-6 bg-white mt-5 rounded-lg shadow-lg">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <TableBoxComponent 
                            title="Download Product QR" 
                            onSearch={handleSearch} 
                            onAddButtonClick={handleAddProductClick} 
                            buttonText="Back" 
                            showButton={true} 
                            icon="ri-arrow-left-line"
                        />

                        <div className="box-body m-5">
                            <TableComponent<DownloadProductQRCode>
                                columns={[
                                    { header: 'Product Name', accessor: 'product_name' },
                                    { header: 'Reward Points', accessor: 'points' },
                                    { header: 'Generated Date', accessor: 'generated_date' },
                                    { header: 'Total QR', accessor: 'total_product' },
                                ]}
                                data={data}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                handlePrevPage={handlePrevPage}
                                handleNextPage={handleNextPage}
                                handlePageChange={handlePageChange}
                                showProductQR={false} 
                                editHeader='Download QR'
                                showEdit={true} // Adjust based on your needs
                                iconsConfig={{
                                    editIcon: "bi bi-download",
                                }}
                                onEdit={handleDownloadQR} // Pass the entire row to handleDownloadQR
                                columnStyles={{
                                    'Product Name': 'text-[var(--primaries)] font-semibold',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DownloadQRCode;
