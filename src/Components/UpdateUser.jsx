import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import {
    collection,
    doc,
    query,
    where,
    getDocs,
    updateDoc,
    getDoc
} from 'firebase/firestore';
import { Modal, Button } from 'react-bootstrap';
import Avatar from 'react-avatar-edit';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../firebase-config';
import debounce from 'lodash/debounce';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
const UpdateUser = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [languages, setLanguages] = useState('');
    const [chatPrices, setChatPrices] = useState('');
    const [callPrices, setCallPrices] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [youtube, setYoutube] = useState('');
    const [twitter, setTwitter] = useState('');
    const [followers, setFollowers] = useState('');
    const [videoCallPrices, setVideoCallPrices] = useState('');
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
    const [isEditingEnabled, setIsEditingEnabled] = useState(false);
    // Check if the 'auth' cookie is set to 'loggedIn'
    const isLoggedIn = cookies.get('auth') === 'loggedIn';

    // Profile ID for updating an existing profile
    const [profileId, setProfileId] = useState(null);

    // Get the 'username' parameter from the route
    const { username } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const profileCollectionRef = collection(db, 'profile_user');
            const nameQuery = query(profileCollectionRef, where('username', '==', username));
            const querySnapshot = await getDocs(nameQuery);

            if (!querySnapshot.empty) {
                const profileData = querySnapshot.docs[0].data();
                setName(profileData.name);
                setImage(profileData.image);
                setCategory(profileData.category);
                setLanguages(profileData.languages);
                setChatPrices(profileData.chatPrices);
                setCallPrices(profileData.callPrices);
                setInstagram(profileData.instagram);
                setFacebook(profileData.facebook);
                setYoutube(profileData.youtube);
                setTwitter(profileData.twitter);
                setFollowers(profileData.followers);
                setVideoCallPrices(profileData.callPrices);
                setAbout(profileData.about);
            }
        };

        fetchData();
    }, [username]);


    const onClose = () => {
        setPreview(null);
    };

    const onCrop = (view) => {
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
        if (!isEditingEnabled) {
            setName(event.target.value);
            setErrorMessage('');
        }
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleFollowersChange = (event) => {
        setFollowers(event.target.value);
    };

    const handleLanguagesChange = (event) => {
        setLanguages(event.target.value);
    };

    const handleChatPricesChange = (event) => {
        setChatPrices(event.target.value);
    };

    const handleCallPricesChange = (event) => {
        setCallPrices(event.target.value);
    };

    const handleVideoCallPricesChange = (event) => {
        setVideoCallPrices(event.target.value);
    };

    const handleAboutChange = (event) => {
        setAbout(event.target.value);
    };

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
        setTwitter(newTwitterValue);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUpdateProfile = async () => {
        try {
            const profileCollectionRef = collection(db, 'profile_user');
            const nameQuery = query(profileCollectionRef, where('username', '==', username));
            const querySnapshot = await getDocs(nameQuery);

            if (!querySnapshot.empty) {
                const profileDocRef = querySnapshot.docs[0].ref;
                await updateDoc(profileDocRef, {
                    name,
                    category,
                    languages,
                    chatPrices,
                    callPrices,
                    videoCallPrices,
                    followers,
                    about,
                    // Social links
                    instagram,
                    facebook,
                    youtube,
                    twitter,
                    image,
                });
                setIsEditingEnabled(false);
                navigate('/dashboard');
            } else {
                setErrorMessage('Profile not found.');
            }
        } catch (error) {
            console.log('Error updating profile:', error);
        }
    };

    return (
        <div className="container-xl px-4 mt-4">
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
                                <img
                                    className="img-account-profile rounded-circle mb-2"
                                    src="http://bootdey.com/img/Content/avatar/avatar1.png"
                                    alt=""
                                />
                            )}
                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                            <button className="btn btn-primary" type="button" onClick={handleClick}>
                                Upload new image
                            </button>
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
                                    <input
                                        className="form-control"
                                        id="inputUsername"
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
                                        placeholder="Full Name"
                                        name="name"
                                        disabled={!isEditingEnabled}
                                    />
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <input
                                            className="form-control"
                                            id="inputFirstName"
                                            type="text"
                                            name="followers"
                                            value={followers}
                                            onChange={handleFollowersChange}
                                            placeholder="Followers"
                                            disabled={!isEditingEnabled}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            className="form-control"
                                            id="inputLastName"
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            value={username}
                                            disabled={!isEditingEnabled} // Disable username field when editing
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <input
                                            className="form-control"
                                            id="inputOrgName"
                                            type="text"
                                            onChange={handleCategoryChange}
                                            value={category}
                                            name="category"
                                            placeholder="Category"
                                            disabled={!isEditingEnabled}
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
                                            disabled={!isEditingEnabled}
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
                                            disabled={!isEditingEnabled}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            className="form-control"
                                            id="inputBirthday"
                                            type="text"
                                            name="vediocall"
                                            disabled={!isEditingEnabled}
                                            value={videoCallPrices}
                                            onChange={handleVideoCallPricesChange}
                                            placeholder="Vediocall Price"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        id="inputEmailAddress"
                                        type="text"
                                        placeholder="Languages"
                                        disabled={!isEditingEnabled}
                                        value={languages}
                                        onChange={handleLanguagesChange}
                                        name="languages"
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        className="form-control"
                                        id="inputEmailAddress"
                                        type="text"
                                        value={about}
                                        onChange={handleAboutChange}
                                        disabled={!isEditingEnabled}
                                        placeholder="Description"
                                        rows="4"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="card mb-8">
                        <div className="card-header">Creators Social Links</div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        id="inputInstagram"
                                        type="text"
                                        placeholder="Instagram"
                                        onChange={handleInstagramChange}
                                        disabled={!isEditingEnabled}
                                        value={instagram}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        id="inputFacebook"
                                        type="text"
                                        placeholder="Facebook"
                                        disabled={!isEditingEnabled}
                                        onChange={handleFacebookChange}
                                        value={facebook}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        id="inputYoutube"
                                        type="text"
                                        placeholder="Youtube"
                                        disabled={!isEditingEnabled}
                                        onChange={handleYoutubeChange}
                                        value={youtube}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        id="inputTwitter"
                                        type="text"
                                        placeholder="Twitter"
                                        onChange={handleTwitterChange}
                                        disabled={!isEditingEnabled}
                                        value={twitter}
                                    />
                                </div>
                                {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
                                {isEditingEnabled ? (
                                    <a
                                        className="bl-btn bl-btn-md bl-bg text-white rounded-sm leading-17 relative flex-both-center mt-24 w-full uppercase tracking-2"
                                        onClick={handleUpdateProfile}
                                    >
                                        <span className="bl-circle-loader absolute hidden"></span>
                                        Save Changes
                                    </a>
                                ) : (
                                    <a 
                                        className="bl-btn bl-btn-md bl-bg text-white rounded-sm leading-17 relative flex-both-center mt-24 w-full uppercase tracking-2"
                                        onClick={() => setIsEditingEnabled(true)}
                                    >
                                        Edit Profile
                                    </a>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;