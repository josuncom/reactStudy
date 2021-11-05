import { dbService, storageService } from "fbase";
import React from "react";
import {useState, useEffect} from "react"; 
import Jweet1 from 'component/Jweet';
import { v4 as uuidv4 } from "uuid";

const Home = ({userObj}) => {
    const [Jweet, setJweet] = useState("");
    const [Jweets, setJweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    useEffect(() => {
      dbService.collection("Jweets").orderBy("createdAt").onSnapshot((snapshot) => {
          const JweetArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
          setJweets(JweetArray);
      });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        let attachmentURL = "";

        const jweetObj = {
            text : Jweet,
            createdAt : Date.now(),
            creatorId : userObj.uid,
            attachmentURL,
        };

        if(attachment !== "")
        {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentURL = await response.ref.getDownloadURL();
            
        }
        
        await dbService.collection("Jweets").add(jweetObj);
        setJweet("");
    };

    const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setJweet(value);
      };

      const onFileChange = (event) => {
        const {
            target : {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget : {result },
            } = finishedEvent;
            setAttachment(result);
        };  
        reader.readAsDataURL(theFile)
      };

      const onClearAttachment = () => setAttachment("");

return(
<div>
    <form onSubmit={onSubmit}>
        <input onChange={onChange}
        value={Jweet}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Jweet" />
        {attachment && (
        <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
        </div>
        )}
    </form>
    <div>
        {Jweets.map((Jweet) => (
        <Jweet1
            key={Jweet.id}
            JweetObj={Jweet}
            isOwner={Jweet.creatorId === userObj.uid}
        />
        ))}
    </div>
</div>
        );
    };  

export default Home;