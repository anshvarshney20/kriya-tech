import { db } from '../firebase-config';
import { collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from './AuthContext';
import { Modal, Form, Button, Alert } from "react-bootstrap";
import Avatar from 'react-avatar-edit'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap';
import { useState } from 'react';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../firebase-config';
import Cookies from 'universal-cookie';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [category, setCategory] = useState('');
    const [languages, setLanguages] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [youtube, setYoutube] = useState('');
    const [github, setGithub] = useState('');
    const [followers, setFollowers] = useState('');
    const [videoCallPrices, setVideoCallPrices] = useState('');
    const [chatPrices, setChatPrices] = useState('');
    const [callPrices, setCallPrices] = useState('');
    const { user } = useUserAuth();
    const [about, setAbout] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [displayParam, setDisplayParam] = useState(true);
    const [imageUpload, setImageUpload] = useState(false);
    const [image, setImage] = useState('');


    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(true);
    const [showAvatar, setShowAvatar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState('');

    const [btn, setBtn] = useState(false);
    const cookies = new Cookies();
    const navigate = useNavigate();

    // Check if the 'auth' cookie is set to 'loggedIn'
    const isLoggedIn = cookies.get('auth') === 'loggedIn';

    if (!isLoggedIn) {
        navigate('/signin');
        return null; // Render nothing here
    }

    const onClose = () => {
        setPreview(null);
    };

    const onCrop = view => {
        setPreview(view);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleDone = async () => {
        try {
            const uniqueFilename = uuidv4(); // Generate a UUID
            const storageRef = ref(storage, `profile_images/${uniqueFilename}`);
            const uploadTask = uploadString(storageRef, preview, 'data_url');
            const snapshot = await uploadTask;
            const imageUrl = await getDownloadURL(snapshot.ref);
            setImage(imageUrl);
            setShowAvatar(false);
            setShowModal(false);
            setImageUpload(true);
        } catch (error) {
            console.log('Error uploading image:', error);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
        setErrorMessage('');
    };

    const handleCallPricesChange = (event) => {
        setCallPrices(event.target.value);
    }
    const handleChatPricesChange = (event) => {
        setChatPrices(event.target.value);
    }
    const handleVideoCallPricesChange = (event) => {
        setVideoCallPrices(event.target.value)
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleLanguagesChange = (event) => {
        setLanguages(event.target.value);
    };

    const handleAboutChange = (event) => {
        setAbout(event.target.value);
    };

    const handleUsernameChange = async (event) => {
        const enteredUsername = event.target.value;
        if (enteredUsername.includes(' ')) {
            alert('Username should not contain spaces.');
        }
        setUsername(enteredUsername);
    };
    const handleFollowersChange = (event) => {
        setFollowers(event.target.value);
    }
    const handleInstagramChange = (event) => {
        const newInstagramValue = event.target.value;
        setInstagram(newInstagramValue);
    };

    const handleFacebookChange = (event) => {
        const newFacebookValue = event.target.value;
        setFacebook(newFacebookValue);
    };

    const handleYoutubeChange = (event) => {
        const newYoutubeValue = event.target.value;
        setYoutube(newYoutubeValue);
    };

    const handleTwitterChange = (event) => {
        const newTwitterValue = event.target.value;
        setGithub(newTwitterValue);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleGetStarted = async (event) => {
        event.preventDefault();

        if (username.includes(' ')) {
            alert('Username should not contain spaces.');
            return;
        }

        if (name === '' || category === '' || username === '' || instagram === '' || facebook === '' || youtube === '') {
            alert('Please fill in all mandatory fields.');
            return;
        }

        if (!imageUpload) {
            alert('Please upload an image before proceeding.');
            return;
        }

        const profileCollectionRef = collection(db, 'profile_user');
        const nameQuery = query(profileCollectionRef, where('username', '==', username));
        const querySnapshot = await getDocs(nameQuery);

        if (!querySnapshot.empty) {
            alert('Username already exists. Please choose a different name.');
            setErrorMessage('Username should not contain spaces.');
            return;
        }

        // Create the profile document in Firestore
        await setDoc(doc(profileCollectionRef, username), {
            image,
            name,
            displayParam,
            username,
            completed: false,
            category,
            videoCallPrices,
            chatPrices,
            callPrices,
            followers,
            languages,
            instagram,
            facebook,
            youtube,
            github,
        });

        toast.success('Successfully Created Account!', {
            onClose: () => navigate('/dashboard'), // Assuming you are using the navigate hook to redirect
        });
        cookies.set('auth', 'loggedIn');
    };

    return (
        <>
            <div className="container-xl px-4 mt-4">
                <br /><br /><br /><br />
                <ToastContainer />
                <hr className="mt-0 mb-4" />
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <div className="card-header">Profile Picture</div>
                            <div className="card-body text-center">
                                {image ? (
                                    <img className="img-account-profile rounded-circle mb-2" src={image} alt="" />
                                ) : (
                                    <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                )}
                                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                <button className="btn btn-primary" type="button" onClick={handleClick}>Upload new image</button>
                            </div>
                            <Modal centered show={showModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Choose Image</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Avatar
                                        onCrop={onCrop}
                                        onClose={onClose}
                                        width={350}
                                        height={350}
                                        src={src}
                                        style={{ borderRadius: '100%' }}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleClose}>Close</Button>
                                    <Button onClick={handleDone}>Crop</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="card mb-8">
                            <div className="card-header">Creators Details</div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <input className="form-control" id="inputUsername" type="text" value={name} onChange={handleNameChange} placeholder="Full Name" name="name" />
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control" id="inputLastName" type="text" name="username" onChange={handleUsernameChange} placeholder="Username" value={username} />
                                    </div>
                                    {/* Close the div here */}
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <input
                                                className="form-control"
                                                id="inputLocation"
                                                value={followers}
                                                onChange={handleFollowersChange}
                                                type="text"
                                                placeholder="Followers"
                                                name="Followers"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                className="form-control"
                                                id="inputLocation"
                                                value={chatPrices}
                                                onChange={handleChatPricesChange}
                                                type="text"
                                                placeholder="Chat Price"
                                                name="chatPrices"
                                            />
                                        </div>
                                    </div>

                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <input
                                                className="form-control"
                                                id="inputPhone"
                                                type="text"
                                                value={callPrices}
                                                onChange={handleCallPricesChange}
                                                placeholder="Call Price"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                className="form-control"
                                                id="inputBirthday"
                                                type="text"
                                                name="vediocall"
                                                value={videoCallPrices}
                                                onChange={handleVideoCallPricesChange}
                                                placeholder="Video Call Price"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control" id="inputEmailAddresss" type="text" placeholder="Category" value={category} onChange={handleCategoryChange} name="category" />
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control" id="inputEmailAddress" type="text" placeholder="Skill Languages" value={languages} onChange={handleLanguagesChange} name="languages" />
                                    </div>
                                    <div className="mb-3">
                                        <textarea className="form-control" id="inputEmailAddress" type="text" value={about} onChange={handleAboutChange} placeholder="Description" rows="4" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="card mb-8">
                            <div className="card-header">Freelancers Social Links</div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <input className="form-control" id="inputInstagram" type="text" placeholder="Instagram" onChange={handleInstagramChange} value={instagram} required />
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control" id="inputFacebook" type="text" placeholder="Facebook" onChange={handleFacebookChange} value={facebook} required />
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control" id="inputYoutube" type="text" placeholder="YouTube" onChange={handleYoutubeChange} value={youtube} required />
                                    </div>

                                    <div className="mb-3">
                                        <input className="form-control" id="inputTwitter" type="text" placeholder="GitHub" onChange={handleTwitterChange} value={github} required />
                                    </div>
                                    {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
                                    <button className="btn btn-primary" onClick={handleGetStarted}>Register Creator</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default CreateUser;
