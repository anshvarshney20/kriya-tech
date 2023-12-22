import React, { useState, useEffect } from 'react';
import '../Assets/Styles/Creators.css'
import { db } from '../firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Navbar from './Navbar';
import Footer from './Footer';

const Creators = () => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [creatorsPerPage] = useState(4);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const creatorsCollection = collection(db, 'profile_user');
                const snapshot = await getDocs(creatorsCollection);
                const creatorsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setCreators(creatorsData);
                setLoading(false);

                let loadingProgress = 0;
                const increment = 100 / creatorsData.length;
                for (let i = 0; i < creatorsData.length; i++) {
                    loadingProgress += increment;
                    setProgress(loadingProgress);
                }
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            }
        };

        fetchCreators();
    }, []);

    const indexOfLastCreator = currentPage * creatorsPerPage;
    const indexOfFirstCreator = indexOfLastCreator - creatorsPerPage;
    const currentCreators = creators.slice(indexOfFirstCreator, indexOfLastCreator);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
        <Navbar/>
            <section className="hero-section inner-page">
                <div className="wave">
                    <svg width="1920px" height="265px" viewBox="0 0 1920 265" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Apple-TV" transform="translate(0.000000, -402.000000)" fill="#FFFFFF">
                                <path d="M0,439.134243 C175.04074,464.89273 327.944386,477.771974 458.710937,477.771974 C654.860765,477.771974 870.645295,442.632362 1205.9828,410.192501 C1429.54114,388.565926 1667.54687,411.092417 1920,477.771974 L1920,667 L1017.15166,667 L0,667 L0,439.134243 Z" id="Path"></path>
                            </g>
                        </g>
                    </svg>
                </div>

                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <div className="row justify-content-center">
                                <div className="col-md-7 text-center hero-text">
                                    <h1 data-aos="fade-up" data-aos-delay="">Creators</h1>
                                    <p className="mb-5" data-aos="fade-up" data-aos-delay="100">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <LoadingBar
                color="#f11946"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            <br />
            <br />
            <br />
            <br />

            <div class="container">
                <div class="row text-center">
                    {currentCreators.map((item, i) => (
                        <div class="col-xl-3 col-sm-6 mb-5" key={item.id}>
                            <Link to={`/${item.username}`}>
                                <div class="rounded shadow-sm py-5 px-4" style={{ backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)' }}>
                                    {loading ? (
                                        <Skeleton width={100} height={100} />
                                    ) : (
                                        <img src={item.image} alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                    )}
                                    <h5 class="mb-0 text-white" >{item.name}</h5>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div class="pagination-container">
                    <ul class="pagination items-center text-center">
                        {Array(Math.ceil(creators.length / creatorsPerPage))
                            .fill()
                            .map((_, i) => (
                                <li class={`page-item ${i + 1 === currentPage ? 'active' : ''}`} key={i}>
                                    <button class="page-link" onClick={() => paginate(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Creators;
