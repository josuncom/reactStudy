import React, { useState } from "react";
import { dbService, storageService } from "fbase";


const Jweet1 = ({ JweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(JweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbService.doc(`Jweets/${JweetObj.id}`).delete();
      if(JweetObj.attachmentURL !== ""){
      await storageService.refFromURL(JweetObj.attachmentURL).delete();
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`Jweets/${JweetObj.id}`).update({
      text: newJweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewJweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newJweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Jweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{JweetObj.text}</h4>
          {JweetObj.attachmentURL && (<img src={JweetObj.attachmentURL} width="50px" height="50px"/>
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Jweet</button>
              <button onClick={toggleEditing}>Edit Jweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Jweet1;