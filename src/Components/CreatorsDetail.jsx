import React, { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faSnapchat, faTwitter, faGgCircle, faYoutube, faLinkedinIn, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { getDoc, collection, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import '../Assets/Styles/Details.css'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const CreatorsDetail = () => {
    const [showModal, setShowModal] = useState(false);
    const { username } = useParams();
    const [details, setDetails] = useState(null);
    const [copied, setCopied] = useState(false);
    const [mode, setmode] = useState(false);
    const [imageLoading, setImageLoading] = useState(true); // Add image loading state

    function copy() {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
    }

    const handleLinkClick = (url) => {
        window.open(url, "_blank");
    };

    const handleFacebookShare = () => {
        const profileUrl = window.location.href;
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
        window.open(facebookShareUrl, '_blank');
    };

    const handleInstagramShare = () => {
        const profileUrl = window.location.href;
        const instagramShareUrl = `https://www.instagram.com/?url=${encodeURIComponent(profileUrl)}`;
        window.open(instagramShareUrl, '_blank');
    };

    const handleTwitterShare = () => {
        const profileUrl = window.location.href;
        const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}`;
        window.open(twitterShareUrl, '_blank');
    };

    const handleClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const dark = () => {
        setmode((prevMode) => !prevMode);
    };

    useEffect(() => {
        async function fetchData() {
            const docRef = doc(db, "profile_user", username);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setDetails(data);
            setImageLoading(false); // Mark image loading as complete
        }

        fetchData();
    }, [username]);

    return (
        <>
        <Navbar/>
        <section className="hero-section inner-page">
            <div className="wave">
                <svg width="1920px" height="350px" viewBox="0 0 1920 265" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Apple-TV" transform="translate(0.000000, -402.000000)" fill="#FFFFFF">
                            <path d="M0,439.134243 C175.04074,464.89273 327.944386,477.771974 458.710937,477.771974 C654.860765,477.771974 870.645295,442.632362 1205.9828,410.192501 C1429.54114,388.565926 1667.54687,411.092417 1920,477.771974 L1920,667 L1017.15166,667 L0,667 L0,439.134243 Z" id="Path"></path>
                        </g>
                    </g>
                </svg>
            </div>
        
           
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="cardss p-4">
                    <div className="position-absolute top-10 end-5 h-16 w-16">
                        <svg
                            onClick={handleClick}
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            className="bi bi-box-arrow-up"
                            viewBox="0 0 16 16"
                        >
                            <path fillRule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z" />
                            <path fillRule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z" />
                        </svg>
                    </div>
                    <Modal centered show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Share This Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content col-12">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Share on Social Media</h5>
                                    </div>
                                    <div className="modal-body">
                                        <div className="icon-container1 d-flex">
                                            <div className="smd">
                                                <Facebook onClick={handleFacebookShare} className="img-thumbnail fab fa-twitter fa-2x" style={{ color: "#4c6ef5", backgroundColor: "aliceblue", width: '30', height: '30' }} />
                                            </div>
                                            <div className="smd">
                                                <Instagram onClick={handleInstagramShare} className="img-thumbnail fab fa-twitter fa-2x" style={{ color: "#4c6ef5", backgroundColor: "aliceblue", width: '30', height: '30' }} />
                                            </div>
                                            <div className="smd">
                                                <Twitter onClick={handleTwitterShare} className="img-thumbnail fab fa-twitter fa-2x" style={{ color: "#4c6ef5", backgroundColor: "aliceblue", width: '30', height: '30' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <div className="input-group">
                                            <input type="text" id="tooltipExample" className="form-control" value={window.location.href} readOnly />
                                            <div className="input-group-append">
                                                <a className="js-clipboard input-group-text" onClick={copy} href="javascript:;"
                                                    data-toggle="tooltip"
                                                    title="Copy to clipboard!"
                                                    data-type="tooltip"
                                                    data-success-text="Copied!"
                                                    data-content-target="#tooltipExample">
                                                    <span className="nova-layers">{!copied ? "Copy link" : "Copied!"}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                    {details ? (
                        <div className="image d-flex flex-column justify-content-center align-items-center">

                            {imageLoading ? (
                                <CircularProgress />
                            ) : (
                                <img src={details.image} alt="Profile Image" style={{ height: '180px', width: '180px', borderRadius: '50%' }} />
                            )}

                            <span className="name mt-3">{details.name}</span>
                            <span className="idd">{details.category}</span>
                            <div className="text mt-3">
                                <span>{details.description}</span>
                            </div>
                            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center" style={{ fontSize: '12px' }}>
                                {details && details.linkedin && (
                                    <a href={details.linkedin} target="_blank" rel="noopener noreferrer">
                                        <i className="bx bxl-linkedin"></i>
                                    </a>
                                )}
                                {details && details.instagram && (
                                    <a href={details.instagram} target="_blank" rel="noopener noreferrer">
                                        <i className="bx bxl-instagram"></i>
                                    </a>
                                )}
                                {details && details.youtube && (
                                    <a href={details.youtube} target="_blank" rel="noopener noreferrer">
                                        <i className="bx bxl-youtube"></i>
                                    </a>
                                )}
                                {details && details.facebook && (
                                    <a href={details.facebook} target="_blank" rel="noopener noreferrer">
                                        <i className="bx bxl-facebook"></i>
                                    </a>
                                )}
                                {details && details.behance && (
                                    <a href={details.behance} target="_blank" rel="noopener noreferrer">
                                        <i className="bi bi-behance"></i>
                                    </a>
                                )}
                                {details && details.github && (
                                    <a href={details.github} target="_blank" rel="noopener noreferrer">
                                        <i className="bi bi-github"></i>
                                    </a>
                                )}
                                {details && details.dribble && (
                                    <a href={details.dribble} target="_blank" rel="noopener noreferrer">
                                        <i className="bi bi-dribble"></i>
                                    </a>
                                )}

                            </div>
                        </div>
                    ) : (
                        <CircularProgress />
                    )}
                </div>
            </div>
            </section>
            <Footer/>
        </>
    );
}

export default CreatorsDetail;
