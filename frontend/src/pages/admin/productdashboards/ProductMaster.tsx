import '../../../assets/css/style.css';
import '../../../assets/css/pages/admindashboard.css';
import Pageheader from '@/components/common/pageheader/pageheader';
import { Link, useNavigate } from 'react-router-dom';
import React, { Fragment, useState, useEffect } from "react";
import { useFrappeGetDocList } from 'frappe-react-sdk';
import CreateQRCode from '@/components/ui/models/CreateQRModel.tsx';
import SuccessAlert from '@/components/ui/alerts/SuccessAlert';
import TableBoxComponent from '@/components/ui/tables/tableboxheader';
import axios from 'axios';
// import { BASE_URL, API_KEY, API_SECRET } from "../../../utils/constants";

interface Product {
    name: string,
    product_name?: string,
    category: string,
    reward_points?: number
}

const ProductMaster: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    
    const [itemsPerPage] = useState(5); // Number of items per page
    const { data: productsData } = useFrappeGetDocList<Product>('Product', {
        fields: ['name', 'product_name', 'category', 'reward_points']
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (showSuccessAlert) {
            const timer = setTimeout(() => setShowSuccessAlert(false), 3000); // Hide alert after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [showSuccessAlert]);

    console.log("data", productsData);

    // Pagination data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productsData?.slice(indexOfFirstItem, indexOfLastItem) || [];
    const totalPages = Math.ceil((productsData?.length || 0) / itemsPerPage);

    // Pagination handlers
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

    const openModal = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const handleConfirm = async (quantity: number) => {
        if (selectedProduct) {
            try {
                const response = await axios.post(`/api/method/reward_management.api.print_qr_code.create_product_qr`, {
                    product_name: selectedProduct.name,
                    quantity: quantity
                });
                setShowSuccessAlert(true);
                console.log('QR Codes created successfully:', response.data);
                // Optionally, close the modal or perform other actions here

                closeModal();
            } catch (error) {
                console.error('Error creating QR codes:', error);
                // Handle error, e.g., show an error message to the user
            }
        } else {
            console.error('No product selected');
            // Handle the case where no product is selectedAC
        }
    };


    const handleSearch = (value: string) => {
       console.log("first")
    };

    const handleAddProductClick = () => {
        console.log("Add Product button clicked");
        navigate('/add-product');
        // Implement add product logic here
    };



  


    return (
        <Fragment>
            <Pageheader currentpage="Product Master" activepage="Product Dashboard" mainpage="Product Master" />

            <div className="grid grid-cols-12 gap-x-6 bg-white mt-5 rounded-lg shadow-lg">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        {/* <div className="box-header flex justify-between items-center p-4 border-b">
                            <div className="box-title text-[.9375rem] font-bold text-defaulttextcolor">
                                Products
                            </div>

                            <div className="flex">
                                {/* search box start-- */}
                        {/* <div className='flex me-3 my-1 h-[36px]'>
                                    <input className="mb-[0.25rem] ti-form-control text-[0.8rem] form-control-sm rounded-sm" type="text" placeholder="Search Here" onChange={(ele) => { myfunction(ele.target.value); }}
                                        aria-label=".form-control-sm example" />
                                </div> */}
                        {/* end */}
                        {/* add products */}
                        {/* <button
                                        type="button"
                                        className="ti-btn !py-1 !px-2 text-xs !text-white !font-medium bg-[var(--primaries)]"
                                        onClick={() => navigate('/add-product')} // Redirect to /add-product
                                    >
                                        <i className="ri-add-line font-semibold align-middle me-1"></i> Add Product
                                    </button>
                            </div> */}
                        {/* end */}
                        {/* </div>  */}
                        <TableBoxComponent
                            title="Products"
                            onSearch={handleSearch}
                            onAddButtonClick={handleAddProductClick}
                            buttonText="Add Product" // Custom button text
                            showButton={true} // Show the button
                            icon="" // Empty icon
                            buttonOnClick={handleAddProductClick} // Handle button click
                        />
                        <div className="box-body m-5">
                            <div className="table-responsive pt-2">
                                <table className="table whitespace-nowrap min-w-full">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-start p-3 text-sm text-defaulttextcolor font-semibold border border-gray-300">S.No</th>
                                            <th scope="col" className="text-start p-3 text-sm text-defaulttextcolor font-semibold border border-gray-300">Product ID</th>
                                            <th scope="col" className="text-start p-3 text-sm text-defaulttextcolor font-semibold border border-gray-300">Product Name</th>
                                            <th scope="col" className="text-start p-3 text-sm text-defaulttextcolor font-semibold border border-gray-300">Product Category</th>
                                            <th scope="col" className="text-start p-3 text-sm text-defaulttextcolor font-semibold border border-gray-300">Reward Points</th>
                                            <th scope="col" className="text-start p-3 text-sm text-defaulttextcolor font-semibold border border-gray-300">Total QR</th>
                                            <th scope="col" className="text-start p-3 text-sm text-defaulttextcolor font-semibold border border-gray-300">Product QR</th>
                                            <th scope="col" className="text-start p-3 text-sm text-defaulttextcolor font-semibold border border-gray-300">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((product, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="p-3 text-defaultsize font-medium text-defaulttextcolor whitespace-nowrap border border-gray-300">{index + 1}</td>
                                                <td className="p-3 text-defaultsize font-semibold text-[var(--primaries)] whitespace-nowrap border border-gray-300">{product.name}</td>
                                                <td className="p-3 text-defaultsize font-medium text-defaulttextcolor whitespace-nowrap border border-gray-300">{product.product_name}</td>
                                                <td className="p-3 text-defaultsize font-medium text-defaulttextcolor whitespace-nowrap border border-gray-300">{product.category}</td>
                                                <td className="p-3 text-defaultsize font-medium text-defaulttextcolor whitespace-nowrap border border-gray-300">{product.reward_points}</td>
                                                <td className="p-3 text-defaultsize font-medium text-defaulttextcolor whitespace-nowrap border border-gray-300">{product.reward_points}</td>
                                                <td className="p-3 text-defaultsize font-medium text-defaulttextcolor whitespace-nowrap border border-gray-300">
                                                    <Link aria-label="anchor" to="#" onClick={() => openModal(product)} className="link-icon bg-[var(--bg-primary)] hover:bg-[var(--primaries)] py-2 px-[10px] rounded-full mr-2">
                                                        <i className="ri-qr-code-line"></i>
                                                    </Link>
                                                    <Link
                                                        aria-label="Download QR Code"
                                                        to={`/download-qr-code?product=${encodeURIComponent(product.name)}`}
                                                        className="link-icon bg-[var(--bg-primary)] hover:bg-[var(--primaries)] py-2 px-[10px] rounded-full mr-2"
                                                    >
                                                        <i className="ri-download-2-line"></i>
                                                    </Link>
                                                </td>
                                                <td className="p-3 text-defaultsize font-medium text-defaulttextcolor whitespace-nowrap border border-gray-300">
                                                    <Link aria-label="anchor" to={`/edit-product?product=${encodeURIComponent(product.name)}`} className="link-icon bg-[var(--bg-primary)] hover:bg-[var(--primaries)] py-2 px-[10px] rounded-full mr-2">
                                                        <i className="ri-edit-2-fill"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="box-footer p-4 border-t">
                                <div className="sm:flex items-center">
                                    <div className="text-defaulttextcolor dark:text-defaulttextcolor/70 font-normal text-defaultsize">
                                        Showing {currentItems.length} Entries <i className="bi bi-arrow-right ms-2 font-semibold"></i>
                                    </div>
                                    <div className="ms-auto">
                                        <nav aria-label="Page navigation" className="pagination-style-4">
                                            <ul className="ti-pagination flex items-center px-3 mb-0">
                                                <li className="page-item px-2">
                                                    <button
                                                        className="page-link"
                                                        onClick={handlePrevPage}
                                                        disabled={currentPage === 1}
                                                    >
                                                        Prev
                                                    </button>
                                                </li>
                                                {Array.from({ length: totalPages }, (_, index) => (
                                                    <li className="page-item px-2" key={index + 1}>
                                                        <button
                                                            className={`page-link px-2 rounded-md ${currentPage === index + 1 ? 'text-white bg-blue-800' : 'bg-gray-200'}`}
                                                            onClick={() => handlePageChange(index + 1)}
                                                        >
                                                            {index + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                                <li className="page-item px-2">
                                                    <button
                                                        className="page-link"
                                                        onClick={handleNextPage}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        Next
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && selectedProduct && (
                <CreateQRCode
                    isOpen={modalOpen}
                    onClose={closeModal}
                    onCancel={closeModal}
                    onConfirm={handleConfirm}
                    title={`Create QR Code for ${selectedProduct.name}`}
                />
            )}

            {/* Success Alert */}
            {showSuccessAlert && <SuccessAlert message="QR Codes created successfully!" />}
        </Fragment>
    );
};

export default ProductMaster;
