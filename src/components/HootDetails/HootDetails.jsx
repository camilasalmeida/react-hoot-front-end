// src/components/HootDetails/HootDetails.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as hootService from '../../services/hootService';


const HootDetails = (props) => {
        const {hootId} = useParams()                     // Make sure to destructure the hootId when calling upon useParams().
        console.log('hootId is:', hootId)
        const [hoot, setHoot] = useState(null)

    useEffect(() => {
        const fetchHoot = async () => {
            const hootData = await hootService.show(hootId)
            console.log('single hootData is:', hootData )
            setHoot(hootData);
        }
        fetchHoot()
    }, [hootId]);

    console.log('hoot state:', hoot);


if (!hoot) return <main>Loading...</main>
    return (
        <main>
           <header>
            <p>{hoot.category.toUpperCase()}</p>
            <h1>{hoot.title}</h1>
            <p>
                {hoot.author.username} posted on
                {new Date(hoot.createdAt).toLocaleDateString()}
            </p>
           </header>
           <p>{hoot.text}</p>
           <section>

            <h2>Comments</h2>
        {!hoot.comments.length && <p>There are no comments.</p>}
        {hoot.comments.map((comment) => (
            <article key={comment._id}>
                <header>
                    <p>
                        {comment.author.username} posted on
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                </header>
            <p>{comment.text}</p>
            </article>
        ))}
           </section>
        </main>
    )
};


export default HootDetails;




