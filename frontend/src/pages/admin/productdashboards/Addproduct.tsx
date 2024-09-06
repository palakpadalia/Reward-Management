import React, { Fragment, useState } from 'react';
import Pageheader from '@/components/common/pageheader/pageheader';
import SunEditor from 'suneditor-react';
import { useNavigate } from 'react-router-dom';
import 'suneditor/dist/css/suneditor.min.css'; // Import SunEditor styles

import '../../../assets/css/style.css';
import '../../../assets/css/pages/admindashboard.css';

import axios from 'axios';
// import { BASE_URL, API_KEY, API_SECRET } from "../../../utils/constants";

const AddProduct: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [productName, setProductName] = useState('');
    const [rewardPoints, setRewardPoints] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const navigate = useNavigate(); // Initialize navigate



    // Handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const fileArray = Array.from(selectedFiles);
            setFiles(fileArray);

            // Create image previews
            const previewArray = fileArray.map(file => URL.createObjectURL(file));
            setPreviews(previewArray);
        }
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("is_private", "0");
        formData.append("folder", "");
        formData.append("file_name", file.name);
      
        try {
            const response = await axios.post(`/api/method/upload_file`, formData, {
                headers: {
                    'Accept': 'application/json',
                   
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.data.message && response.data.message.file_url) {
                return response.data.message.file_url;
            } else {
                console.error("File URL not found in response:", response.data);
                return null;
            }
        } catch (error) {
            console.error("Error uploading file:", error.response ? error.response.data : error.message);
            return null;
        }
    };
    

    const addProduct = async (fileUrls: string[]) => {
        const data = {
            productName: productName,
            rewardPoints: rewardPoints,
            discription: productDescription, // Ensure this is correctly mapped
            productCategory: productCategory,
            productImage: fileUrls.length > 0 ? fileUrls[0] : null // Assuming you use the first image if available
        };
    
        try {
            const response = await axios.post(`/api/method/reward_management.api.product_master.add_product`, data);
            console.log("Product added successfully:", response.data);
            
            alert("Product added successfully!!!");
            navigate('/product-master');
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    // Reset all form fields
    const resetForm = () => {
        setFiles([]);
        setPreviews([]);
        setProductName('');
        setRewardPoints('');
        setProductDescription('');
        setProductCategory('');
    };

    // Basic form submission handler
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const fileUrls = [];

        for (const file of files) {
            const fileUrl = await uploadFile(file);
            if (fileUrl) {
                fileUrls.push(fileUrl);
            }
        }

        if (fileUrls.length === files.length) {
            await addProduct(fileUrls);
        }
    };

    return (
        <Fragment>
            <Pageheader currentpage="Add Product" activepage="Product Master" mainpage="Add Product" />
            <div className="grid grid-cols-12 gap-6 bg-white mt-5 rounded-lg shadow-lg">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-body add-products !p-0">
                            <form onSubmit={handleSubmit}>
                                <div className="p-6">
                                    <div className="grid grid-cols-12 md:gap-x-[3rem] gap-0">
                                        <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12">
                                            <div className="grid grid-cols-12 gap-4">
                                                <div className="xl:col-span-12 col-span-12">
                                                    <label htmlFor="product-name-add" className="form-label text-sm font-semibold text-defaulttextcolor">Product Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control w-full border border-defaultborder text-defaultsize text-defaulttextcolor rounded-[0.5rem] mt-2" 
                                                        id="product-name-add" 
                                                        placeholder="Name" 
                                                        value={productName}
                                                        onChange={(e) => setProductName(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                             
                                                <div className="xl:col-span-12 col-span-12">
                                                    <label htmlFor="product-cost-add" className="form-label text-sm font-semibold text-defaulttextcolor">Reward Points</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control w-full text-defaultsize text-defaulttextcolor border border-defaultborder rounded-[0.5rem] mt-2" 
                                                        id="product-cost-add" 
                                                        placeholder="Reward points" 
                                                        value={rewardPoints}
                                                        onChange={(e) => setRewardPoints(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="xl:col-span-12 col-span-12 mb-4">
                                                    <label className="form-label text-sm font-semibold text-defaulttextcolor">Product Description</label>
                                                    <div id="product-features" className="mt-2">
                                                        <SunEditor 
                                                            setContents={productDescription}
                                                            onChange={setProductDescription}
                                                            setOptions={{
                                                                buttonList: [
                                                                    ['undo', 'redo'],
                                                                    ['formatBlock', 'font', 'fontSize'],
                                                                    ['bold', 'underline', 'italic'],
                                                                    ['fontColor', 'hiliteColor'],
                                                                    ['align', 'list', 'lineHeight'],
                                                                    ['table', 'link'],
                                                                    ['fullScreen', 'showBlocks', 'codeView']
                                                                ]
                                                            }}
                                                            height="200px"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12 gap-4">
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="product-category-add" className="form-label text-sm font-semibold text-defaulttextcolor">Category</label>
                                                <input 
                                                    id="product-category-add" 
                                                    name="product-category-add" 
                                                    className="w-full border border-defaultborder text-defaultsize text-defaulttextcolor rounded-[0.5rem] mt-2" 
                                                    placeholder="Category"
                                                    value={productCategory}
                                                    onChange={(e) => setProductCategory(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12 product-documents-container mt-4">
                                                <p className="font-semibold mb-2 text-sm text-defaulttextcolor">Product Image</p>
                                                <input 
                                                    type="file" 
                                                    accept="image/*" 
                                                    multiple 
                                                    onChange={handleFileChange}
                                                    className="form-control w-full text-defaultsize text-defaulttextcolor border border-defaultborder rounded-[0.5rem] p-2 "
                                                />
                                                <div className="image-preview-grid mt-4">
                                                    {previews.map((src, index) => (
                                                        <img key={index} src={src} alt={`Preview ${index}`} className="preview-image"/>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-4 border-t border-dashed dark:border-defaultborder/10 sm:flex justify-end">
                                    <button 
                                        type="submit" 
                                        className="ti-btn ti-btn-primary !font-medium m-1">
                                        Add Product<i className="bi bi-plus-lg ms-2"></i>
                                    </button>
                                    <button 
                                        type="button" 
                                        className="ti-btn ti-btn-success bg-defaulttextcolor ti-btn text-white !font-medium m-1"
                                        onClick={resetForm} // Add the onClick event to reset the form
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AddProduct;
