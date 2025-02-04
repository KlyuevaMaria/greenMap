import React from 'react';
import './CSS/TreeButton.css';

const AddTreeButton = ({ onClick }) => {
    return (
        <button className="add-tree-button" onClick={onClick}>
            Добавить дерево
        </button>
    );
};

export default AddTreeButton;
