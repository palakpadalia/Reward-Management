import React, { Fragment, useState } from "react";
import '../../../assets/css/style.css';
import '../../../assets/css/pages/admindashboard.css';
import Pageheader from '@/components/common/pageheader/pageheader';
import TableComponent from '@/components/ui/tables/tablecompnent';
import TableBoxComponent from '@/components/ui/tables/tableboxheader';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 
import { useFrappeGetDocList, useFrappeCreateDoc, useFrappeUpdateDoc, useFrappeDeleteDoc } from 'frappe-react-sdk';

interface FAQ {
    name: string;
    question?: string;
    answer:string;
    status: string;
    created_date?: string;
}

const FAQDashboard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
    const [faqData, setFaqData] = useState<FAQ[]>([]);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [searchQuery , setSearchQuery] = useState('');

    const { data } = useFrappeGetDocList<FAQ>('FAQ', {
        fields: ['name', 'question', 'status', 'created_date','answer'],
        page: currentPage,
        filters: [['status', '=', 'Active']],
        pageSize: itemsPerPage
    });

    React.useEffect(() => {
        if (data) {
            setFaqData(data);   
        }
    }, [data]);

    console.log("faqData",faqData);

    const totalPages = Math.ceil((faqData?.length || 0) / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value); // Update search query
        setCurrentPage(1);
        console.log("Search value:", value);
    };

    const { createDoc } = useFrappeCreateDoc();
    const { updateDoc } = useFrappeUpdateDoc();
    const { deleteDoc } = useFrappeDeleteDoc();

    const handleAddProductClick = () => {
        setModalTitle('Add New FAQ');
        setQuestion('');
        setAnswer('');
        setIsReadOnly(false);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Question:", question);
        console.log("Answer:", answer);
    
        if (!answer || !question) {
            alert("Please enter a valid question and answer.");
            return;
        }
    
        const data = {
            question,
            answer,
            status: "Active",
            created_date: new Date().toISOString().split('T')[0],
        };
    
        try {
            if (selectedFAQ) {
                // Update existing FAQ
                await updateDoc('FAQ', selectedFAQ.name, data);
                alert('FAQ updated successfully!');
            } else {
                // Add new FAQ
                await createDoc('FAQ', data);
                alert('FAQ created successfully!');
            }
            setQuestion('');
            setAnswer('');
            handleCloseModal();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to save FAQ.');
        }
    };

    const handleDeleteFAQ = async (item: FAQ) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this FAQ?');
        if (confirmDelete) {
            try {
                await deleteDoc('FAQ', item.name);
                setFaqData(prevData => prevData.filter(faq => faq.name !== item.name));
                alert('FAQ deleted successfully!');
            } catch (error) {
                console.error('Error deleting FAQ:', error);
                alert('Failed to delete FAQ.');
            }
        }
    };

    const handleEditFAQ = (item: FAQ) => {
        setSelectedFAQ(item); 
        setModalTitle('Edit FAQ');
        setQuestion(item.question || '');
        setAnswer(item.answer || '');
        setIsReadOnly(false);
        setIsModalOpen(true);
    };
    
    const handleView = (item: FAQ) => {
        setSelectedFAQ(item);
        setModalTitle('View FAQ');
        setQuestion(item.question || '');
        setAnswer(item.answer || '');
        setIsReadOnly(true);
        setIsModalOpen(true);
    };

    const sortedFontOptions = [
        "Arial", "Logical", "Salesforce Sans", "Garamond", "Sans-Serif", "Serif",
        "Times New Roman", "Helvetica", "Comic Sans MS", "Courier New", "Impact",
        "Georgia", "Tahoma", "Trebuchet MS", "Verdana"
    ].sort();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formattedFAQData = faqData?.map(faq => ({
        ...faq,
        created_date: faq.created_date ? formatDate(faq.created_date) : '',
    })) || [];

    const filteredData = formattedFAQData.filter(faqData => {
        const query = searchQuery.toLowerCase();
        return (
            (faqData.name && faqData.name.toLowerCase().includes(query)) ||
            (faqData.question && faqData.question.toLowerCase().includes(query)) ||
            (faqData.status && faqData.status.toString().toLowerCase().includes(query)) ||
            (faqData.created_date && faqData.created_date.toLowerCase().includes(query))
        );
    });

    return (
        <Fragment>
            <Pageheader currentpage="FAQ" activepage="Faq's" mainpage="Faq's" />
            <div className="grid grid-cols-12 gap-x-6 bg-white mt-5 rounded-lg shadow-lg">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <TableBoxComponent
                            title="FAQ"
                            onSearch={handleSearch}
                            onAddButtonClick={handleAddProductClick}
                            buttonText="Add New FAQ"
                            showButton={true}
                        />
                        <div className="box-body m-5">
                            <TableComponent<FAQ>
                                columns={[
                                    { header: 'FAQ ID', accessor: 'name' },
                                    { header: 'Question', accessor: 'question' },
                                    { header: 'Status', accessor: 'status' },
                                    { header: 'Created Date', accessor: 'created_date' },
                                ]}
                                data={filteredData || []}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                handlePrevPage={handlePrevPage}
                                handleNextPage={handleNextPage}
                                handlePageChange={handlePageChange}
                                showProductQR={false}
                                showEdit={true}
                                onEdit={handleEditFAQ}
                                showDelete={true}
                                onDelete={handleDeleteFAQ}
                                showView={true}
                                onView={handleView} 
                                editHeader='Update'
                                columnStyles={{
                                    'FAQ ID': 'text-[var(--primaries)] font-semibold',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
                        <div className="ti-modal-content">
                            <div className="ti-modal-header flex justify-between border-b p-4">
                                <h6 className="modal-title text-1rem font-semibold text-primary">{modalTitle}</h6>
                                <button onClick={handleCloseModal} type="button" className="text-1rem font-semibold text-defaulttextcolor">
                                    <span className="sr-only">Close</span>
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                            <div className="ti-modal-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="text-defaulttextcolor mb-2 block">Question</label>
                                        <textarea
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            placeholder="Enter your question"
                                            className="inputti-box shadow-sm form-control w-full p-2"
                                            rows={3}
                                            readOnly={isReadOnly}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-defaulttextcolor mb-2 block">Answer</label>
                                        <SunEditor
                                            onChange={(content) => setAnswer(content)}
                                            setOptions={{
                                                height: 200,
                                                buttonList: [
                                                    ["undo", "redo", "font", "fontSize", "formatBlock"],
                                                    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
                                                    ["align", "horizontalRule", "list", "table"],
                                                    ["link", "image", "video", "fullScreen"],
                                                ],
                                                defaultTag: 'div',
                                                font: sortedFontOptions,
                                            }}
                                            readOnly={isReadOnly}
                                            setContents={answer}
                                        />
                                    </div>
                                    {!isReadOnly && (
                                        <div className="ti-modal-footer flex justify-end border-t p-4">
                                            <button
                                                onClick={handleCloseModal}
                                                type="button"
                                                className="ti-btn ti-btn-secondary mr-2"
                                            >
                                                Close
                                            </button>
                                            <button type="submit" className="ti-btn ti-btn-primary">
                                                {selectedFAQ ? 'Update FAQ' : 'Add FAQ'}
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default FAQDashboard;
