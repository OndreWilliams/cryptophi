import React from 'react';
import './Notes.css';
import { NotesProps } from '../DashboardController/dbcTypes';

const Notes: React.FC<NotesProps> = props => {

  return (
    <div className='notesContainer'>

      <div className="notesHeader">Notes</div>

      <div className="notesScroller">
        {/* {props.notes && props.notes.map((note) => {
          return (
            <div key={Math.random()} className="comment-card">
              {note}
            </div>
        )})} */}
      </div>
      <div className="noteFormContainer">
        <form
          method="POST"
          className="commentForm"
          onSubmit={(e) => props.addNoteHandler(e)}
        >
          <div className="textAreaFormField">
            <textarea
              id="currNote"
              className="commentFormTextarea"
              name="currNote"
              placeholder="Enter a comment..."
              cols={3}
              rows={4}
            >
            </textarea>
            <div className="commentFormButtons">
              <button
                type="submit"
                className="commentFormSubmit"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Notes;
