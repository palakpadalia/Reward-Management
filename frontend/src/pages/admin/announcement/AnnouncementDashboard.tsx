import '../../../assets/css/style.css';
import '../../../assets/css/pages/admindashboard.css';
import Pageheader from '@/components/common/pageheader/pageheader';
import TableComponent from '@/components/ui/tables/tablecompnent';
import TableBoxComponent from '@/components/ui/tables/tableboxheader';
import ViewModalComponent from '@/components/ui/models/ViewModel';
import React, { Fragment, useState } from "react";
import { useFrappeGetDocList } from 'frappe-react-sdk';

interface Announcements {
    name: string,
    title?: string,
    subject: string,
    published_on?: string,
    end_date?: string
}

const AnnouncementDashboard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add'); // State to track if modal is for add or edit
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcements | null>(null); // State for selected announcement
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [date, setDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const { data: announcementsData, mutate: mutateAnnouncements } = useFrappeGetDocList<Announcements>('Announcements', {
        fields: ['name', 'title', 'subject', 'published_on', 'end_date']
    });

    const totalPages = Math.ceil((announcementsData?.length || 0) / itemsPerPage);

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
        setModalMode('add');
        setQuestion('');
        setAnswer('');
        setDate('');
        setEndDate('');
        setIsModalOpen(true); // Open the modal when the button is clicked
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const handleSubmit = async () => {
        const data = {
            title: question,
            subject: answer,
            published_on: date,
            end_date: endDate
        };

        try {
            const response = await fetch('/api/resource/Announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json(); // Add this line
            if (response.ok) {
                console.log("Announcement added successfully");
                alert('Announcement added successfully!');
                handleCloseModal();
                mutateAnnouncements(); // Refresh the announcements data
            } else {
                console.error("Failed to add announcement:", responseData); // Log the response data
            }
        } catch (error) {
            console.error("Error:", error.message || error);
            alert('An error occurred while adding the announcement.');
        }
    };
  
    const handleEditSubmit = async () => {
        if (!selectedAnnouncement) return;
    
        const data = {
            title: question,
            subject: answer,
            published_on: formatDateToMySQL(date),
            end_date: formatDateToMySQL(endDate)
        };
    
        try {
            const response = await fetch(`/api/resource/Announcements/${selectedAnnouncement.name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const responseData = await response.json();
            if (response.ok) {
                console.log("Announcement updated successfully");
                alert('Announcement updated successfully!');
                handleCloseModal();
                mutateAnnouncements();
            } else {
                console.error("Failed to update announcement:", responseData);
            }
        } catch (error) {
            console.error("Error:", error.message || error);
            alert('An error occurred while updating the announcement.');
        }
    };
    

    const handleDeleteAnnouncement = async (item: Announcements) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this announcement?');
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/resource/Announcements/${item.name}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    const responseData = await response.json(); // Add this line
                    throw new Error(`Error: ${responseData.message || response.statusText}`); // Use response data for detailed error
                }

                mutateAnnouncements(); 
                alert('Announcement deleted successfully!');
            } catch (error) {
                console.error('Error deleting announcement:', error.message || error);
                alert('Failed to delete announcement.');
            }
        }
    };

    const handleEditAnnouncement = (item: Announcements) => {
        setModalMode('edit');
        setSelectedAnnouncement(item);
        setQuestion(item.title || '');
        setAnswer(item.subject);
        setDate(item.published_on || '');
        setEndDate(item.end_date || '');
        setIsModalOpen(true); // Open the modal
    };

    const formatDateToMySQL = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };
    
    const formatDateToISO = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    

    const formattedAnnouncementsData = announcementsData?.map(announcement => ({
        ...announcement,
        published_on: announcement.published_on ? formatDateToMySQL(announcement.published_on) : '',
        end_date: announcement.end_date ? formatDateToMySQL(announcement.end_date) : '',
    })) || [];


    const filteredData = formattedAnnouncementsData.filter(announcementsData => {
        const query = searchQuery.toLowerCase();
        return (
            (announcementsData.name && announcementsData.name.toLowerCase().includes(query)) ||
            (announcementsData.title && announcementsData.title.toLowerCase().includes(query)) ||
            (announcementsData.subject && announcementsData.subject.toString().toLowerCase().includes(query)) ||
            (announcementsData.published_on && announcementsData.published_on.toLowerCase().includes(query)) ||
            (announcementsData.end_date && announcementsData.end_date.toString().toLowerCase().includes(query))
        );
    });


    return (
        <Fragment>
            <Pageheader currentpage="Announcement" activepage="Announcement" mainpage="Announcement" />

            <div className="grid grid-cols-12 gap-x-6 bg-white mt-5 rounded-lg shadow-lg">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <TableBoxComponent
                            title="Announcements"
                            onSearch={handleSearch}
                            onAddButtonClick={handleAddProductClick}
                            buttonText="Add Announcement" // Custom button text
                            showButton={true} // Show the button
                        />

                        <div className="box-body m-5">
                            <TableComponent<Announcements>
                                columns={[
                                    { header: 'ID', accessor: 'name' },
                                    { header: 'Title', accessor: 'title' },
                                    {
                                        header: 'Subject',
                                        accessor: 'subject',
                                    },
                                    { header: 'Published On', accessor: 'published_on' },
                                    { header: 'End Date', accessor: 'end_date' },
                                ]}
                                data={filteredData || []}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                handlePrevPage={handlePrevPage}
                                handleNextPage={handleNextPage}
                                handlePageChange={handlePageChange}
                                showProductQR={false}
                                showEdit={true}
                                onEdit={handleEditAnnouncement}
                                showDelete={true}
                                onDelete={handleDeleteAnnouncement}
                                showView={false}
                                editHeader='Action'
                                columnStyles={{
                                    'ID': 'text-[var(--primaries)] font-semibold', // Example style for QR ID column
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Render the modal conditionally */}
            {isModalOpen && (
                <ViewModalComponent
                    title={modalMode === 'add' ? "Add Announcement" : "Edit Announcement"}
                    questionLabel={"Title"}
                    answerLabel={"Subject"}
                    startDateLabel={"Published On"}
                    endDateLabel={"End Date"}
                    showDate={true}
                    showEndDate={true}
                    question={question}
                    answer={answer}
                    date={date}
                    endDate={endDate}
                    setQuestion={setQuestion}
                    setAnswer={setAnswer}
                    setDate={setDate}
                    setEndDate={setEndDate}
                    onClose={handleCloseModal}
                    onSubmit={modalMode === 'add' ? handleSubmit : handleEditSubmit}
                    onCancel={handleCloseModal}
                />
            )}
        </Fragment>
    );
};

export default AnnouncementDashboard;
