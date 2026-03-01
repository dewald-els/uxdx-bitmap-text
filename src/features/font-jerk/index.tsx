import styles from './FontJerk.module.css';
import {useEffect, useState} from "react";

const FontJerk = () => {

    const [rootClass, setRootClass] = useState("");
    const [titleClass, setTitleClass] = useState("");
    const [bodyClass, setBodyClass] = useState("");

    const [doggo, setDoggo] = useState("");

    const getMoreCuteness = () => {
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(r => r.json())
            .then(dog => setDoggo(dog?.message))
            .catch(err => console.log("Could not get a cute dog,", err));
    }

    useEffect(() => {
        getMoreCuteness();
    }, []);

    useEffect(() => {

        const titleTimeout = setTimeout(() => {
            setRootClass(styles.FontJerk);
            setTitleClass(styles.Title);
        }, 2000);

        const bodyTimeout = setTimeout(() => {
            setBodyClass(styles.Body);
        }, 3200);

        return () => {
            clearTimeout(titleTimeout);
            clearTimeout(bodyTimeout);
        }
    }, []);

    return (
        <div className={rootClass}>
            <section>
                <h4 className={titleClass}>Hello, World!</h4>
                <p className={bodyClass}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid,
                    aperiam architecto
                    consectetur corporis dignissimos ducimus eum facere nam nihil odit perferendis quas qui rem sit
                    suscipit temporibus veritatis voluptates!</p>

            </section>

            <section className={styles.SectionFlex}>
                <div>

                    <div className={styles.DoggoContainer}>
                        <>
                            {!doggo && <span className={styles.Block}>Loading a cute doggo...</span>}
                            {doggo && <img className={styles.Block} src={doggo} alt="A cute doggo" width={300}/>}
                        </>

                        <button onClick={getMoreCuteness}>More cuteness please</button>
                    </div>


                </div>

                <p className={bodyClass}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus deleniti
                    dicta
                    eos eveniet ex,
                    illo labore libero omnis sunt voluptates. Neque numquam placeat saepe vero. Ad eius itaque molestiae
                    mollitia! Lorem ipsum dolor sit amet, consectetur adipisicing elit. <i>Alias aliquid delectus
                        deserunt
                        dolor expedita fuga id impedit repellendus, saepe?</i> Blanditiis facere id impedit magnam
                    pariatur quas
                    voluptatibus. Expedita, libero reiciendis?</p>
            </section>

            <section>
                <h4 className={titleClass}>Good bye, world!</h4>
                <p className={bodyClass}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi corporis cum
                    deserunt enim eum,
                    explicabo labore modi odit perspiciatis quae quas quod ratione rerum sunt unde vel
                    voluptas. <strong>Hic,
                        illum?</strong></p>
            </section>
        </div>
    )
        ;
}

export default FontJerk;