import { dbService } from "fbase";
import React from "react";
import {useState, useEffect} from "react"; 

const Home = () => {
    const [Jweet, setJweet] = useState("");
    const [Jweets, setJweets] = useState([]);
    const getJweets = async() => {
        const dbJweets = await dbService.collection("Jweets").get();
        dbJweets.forEach((document) => {
            const JweetObject = {
                ...document.data(),
                id : document.id,
            };
            setJweets((prev) => [JweetObject, ...prev]);
    });
};
    useEffect(() => {
      getJweets();
    }, [])
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("Jweets").add({
            Jweet,
            createdAt : Date.now(),
        });
        setJweet("");
    };


    const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setJweet(value);
      };

return(
<div>
    <form onSubmit={onSubmit}>
        <input onChange={onChange} value={Jweet} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Jweet" />
    </form>
    <div>
        {Jweets.map((Jweet) => ( 
        <div key={Jweet.id}>
            <h4>{Jweet.Jweet}</h4>
        </div>
        ))}
    </div>
</div>
        );
    };
export default Home;