import React, { useState } from "react";
import { authService, dbService  } from "fbase";
import { useHistory } from "react-router";

export default ( {userObj} ) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
                await userObj.updateProfile({
                displayName : newDisplayName,
            });
        }
    };

    /*
    const getMyJweets = async() => {
        const jweets = await dbService.collection("Jweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
        console.log(jweets.docs.map((doc) => doc.data()));
    };

    useEffect(() => {
        getMyJweets();
    }, []);
    */

    return (
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName}/>
            <input type="submit" value="Update Profile" />
        </form>
        <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};
