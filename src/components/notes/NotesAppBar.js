import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const { active } = useSelector(state => state.notes)

    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch( startSaveNote( active ) );
    }

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading(file) )
        }
    }

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <input 
                id="fileSelector"
                type="file"
                style={{display: 'none'}}
                onChange={ handleFileChange }
            >
            </input>
            <div>   
                <button 
                    className="btn"
                    onClick={handlePictureUpload}
                >
                    Picture
                </button>  
                <button 
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>  
            </div>
        </div>
    )
}