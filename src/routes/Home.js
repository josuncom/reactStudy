import React from "react";
import {useState} from "react";


const Home = () => {
    const [Jweet, setJweet] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
    };
    const onChange = (event) => {
        const {target : {value},
        } = event;
        setJweet(value);
    };
    
return(
<div>
    <form onSubmit={onSubmit}>
        <input value={Jweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Jweet" />
    </form>
</div>
);
};
export default Home;