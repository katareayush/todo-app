import { useState } from "react";

export function CreateTodo(){
    // react-query

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return <div>

        <input type="text" placeholder="title" onChange={function(e){
            const value = e.target.value;
            setDescription(e.target.value);
        }}/> <br />
        <input type="text" placeholder="description" /> <br />

        <button onClick={() => {fetch ("http://localhost:3000/todo", {method:"POST", body: JSON.stringify({
            title : title,
            description : description
        }),
        headers: {
            "Content-Type": "application/json"
        }
        }).then(async function (res){
            const json = await res.json();
            console.log(json);
        })}}> Add a Todo </button>
    </div>
}