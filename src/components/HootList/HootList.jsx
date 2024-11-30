// src/components/HootList/HootList.jsx
import { Link } from 'react-router-dom';


const HootList = (props) => {
    //console.log('props is being passed:', props.hoots)




    return (
    <main>
        {props.hoots.map((hoot) => (
            <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
                <article> 
                    <header>
                        <h2>{hoot.title}</h2>
                        <p>
                            {hoot.author.username} posted on
                            {new Date(hoot.createdAt).toLocaleDateString()} at 
                            {new Date(hoot.createdAt).toLocaleTimeString()}
                        </p>

                    </header>
                </article>
            </Link>
        ))}
    </main>
    )
}

export default HootList;