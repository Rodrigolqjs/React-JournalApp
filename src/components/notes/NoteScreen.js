import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active:note } = useSelector(state => state.notes)
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {

        if(note.id !== activeId.current ) {
            reset(note)
            activeId.current = note.id
        }

    }, [note, reset])

    useEffect(() => {

        dispatch(activeNote(formValues.id, {...formValues}))

    }, [formValues])

    const handleDelete = () => {
        dispatch(startDeleting( note.id ))
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />
            
            <div className="notes__content">
                <input
                    type="text"
                    placeholder='Este es el titulo'
                    name='title'
                    value={ title }
                    className="notes__title-input"
                    autoComplete= "false"
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder='algo asombroso aqui'
                    name='body'
                    value={body}
                    className="notes__textarea"
                    onChange={ handleInputChange }
                ></textarea>

                {
                    ( note.url ) && 
                    (<div className="notes__image">   
                        <img
                        src={ note.url }
                        alt="imagen" 
                        />
                    </div>)
                }
            </div>
            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>
        </div>
    )
}