export const getAllJokes = () => {
    return fetch(`http://localhost:8088/jokes`).then((res) => res.json())
}

export const postNewJoke = async (newJoke) => {
   const postOptions = {
       method: "POST",
       headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJoke), 
    }
    return await fetch('http://localhost:8088/jokes', postOptions) 
}

export const updateJoke = async (jokeId, jokeObject) => {
    const putOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(jokeObject), 
     }
     return await fetch(`http://localhost:8088/jokes/${jokeId}`, putOptions).then((res) =>res.json());
 }

 export const deleteJoke = async (jokeId) => {
    
    const deleteOptions = {

        method: "DELETE",
    }
     return await fetch(`http://localhost:8088/jokes/${jokeId}`, deleteOptions)
}