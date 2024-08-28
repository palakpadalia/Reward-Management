// components/common/BoxHeader.tsx

import React from 'react';

interface BoxHeaderProps {
    title: string;
    onSearch: (value: string) => void;
    onAddButtonClick: () => void;
    buttonText?: string;
    showButton?: boolean;
    icon?: string;
}

const BoxHeader: React.FC<BoxHeaderProps> = ({ title, onSearch, onAddButtonClick, icon , buttonText = "Add Product", showButton = true }) => {
    return (
        <div className="box-header flex justify-between items-center p-4 border-b">
            <div className="box-title text-[.9375rem] font-bold text-defaulttextcolor">
                {title}
            </div>
            <div className="flex me-3 my-1 h-[36px]" >
                <div className='flex '>
                    <input
                        className="mb-[0.25rem] text-[0.8rem] ti-form-control form-control-sm rounded-sm"
                        type="text"
                        placeholder="Search Here"
                        onChange={(e) => onSearch(e.target.value)}
                        aria-label=".form-control-sm example"
                    />
                </div>
                {showButton && (
                    <div className='flex ms-2'>
                        <button
                            type="button"
                            className="ti-btn !py-1 !px-2  text-xs !text-white !font-medium bg-[var(--primaries)]"
                            onClick={onAddButtonClick}
                        >
                            {icon && <i className={`${icon} font-semibold align-middle me-1`}></i>} 
                            {buttonText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoxHeader;
