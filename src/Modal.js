import React, {useState} from 'react';

const Modal = ({title, description, onSave, onCancel}) => {
    const [titleValue, setTitleValue] = useState(title);
    const [descriptionValue, setDescriptionValue] = useState(description);

    console.log(titleValue, "title");
    console.log(descriptionValue, "description");

const handleTitle =(e)=>{
    setTitleValue(e.target.value)
}

    return (
        <div className="modal">
            <input
                type="text"
                placeholder="Title"
                value={titleValue}
                onChange={handleTitle}
            />
            <input
                type="text"
                placeholder="Description"
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
            />
            <button onClick={onSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default Modal;
