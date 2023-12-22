import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import NavbarD from '../Pages/NavbarD';
import { db } from '../firebase-config';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Dashboard = () => {
    const cookies = new Cookies();
    const cookieValue = cookies.get('auth');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (cookieValue) {
            const fetchData = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'profile_user'));
                    const profileData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setData(profileData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [cookieValue]);
    const handleDelete = async (id) => {
        try {
            // Delete the document from Firestore
            await deleteDoc(doc(db, 'profile_user', id));
            // Remove the deleted item from the state
            setData((prevState) => prevState.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleResume = async (id) => {
        try {
            // Update the document's status to 'Live'
            await updateDoc(doc(db, 'profile_user', id), {
                status: 'Live',
                displayParam: true,
            });

            // Update the item's status and displayParam in the state
            setData((prevState) =>
                prevState.map((item) => {
                    if (item.id === id) {
                        item.status = 'Live';
                        item.displayParam = true;
                    }
                    return item;
                })
            );
        } catch (error) {
            console.error('Error resuming item:', error);
        }
    };
    const handleSuspend = async (id) => {
        try {
            // Update the document's displayParam to false
            await updateDoc(doc(db, 'profile_user', id), {
                displayParam: false,
                status: 'Suspended', // Update the status to 'Suspended'
            });

            // Update the item's status in the state
            setData((prevState) =>
                prevState.map((item) => {
                    if (item.id === id) {
                        item.displayParam = false;
                        item.status = 'Suspended';
                    }
                    return item;
                })
            );
        } catch (error) {
            console.error('Error suspending item:', error);
        }
    };

    const getStatusBadge = (status) => {
        if (status === 'Suspended') {
            return <span className="badge bg-danger text-white">Suspend</span>;
        }
        return <span className="badge bg-success text-white">Ongoing</span>;
    };

    return (
        <>
            {cookieValue ? (
                <>
                    <NavbarD />

                    <table className="table align-middle mb-0 bg-white mt-2">
                        <thead className="bg-light">
                            <tr>
                                <th>Username</th>
                                <th>Status</th>
                                <th>Prices</th>
                                <th>Followers</th>
                                <th>Actions</th>
                                <th>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={item.image}
                                                alt=""
                                                style={{ width: '45px', height: '45px' }}
                                                className="rounded-circle"
                                            />
                                            <div className="ms-3">
                                                <p className="fw-bold mb-1">{item.username}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{getStatusBadge(item.status)}</td>
                                    <td>
                                        <p className="fw-normal mb-1">
                                            Call : {item.callPrices} / Chat : {item.chatPrices} / Video : {item.videoCallPrices}
                                        </p>
                                    </td>
                                    <td>{item.followers}</td>
                                    <td>
                                        {
                                            item.displayParam ?
                                                (<button
                                                    type="button"
                                                    className="badge bg-danger text-white"
                                                    onClick={() => handleSuspend(item.id)}
                                                >
                                                    Suspend
                                                </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="badge bg-success text-white"
                                                        onClick={() => handleResume(item.id)}
                                                    >
                                                        Resume
                                                    </button>
                                                )
                                        }
                                    </td>
                                    <td>
                                        <Link to={`/update/${item.username}`}>
                                            <button type="button" className="btn btn-link btn-sm btn-rounded">
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-link btn-sm btn-rounded"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <Navigate to="/admin" />
            )}
        </>
    );
};

export default Dashboard;
