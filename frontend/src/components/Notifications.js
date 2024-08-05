// frontend/src/components/Notifications.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [formData, setFormData] = useState({ title: '', message: '', type: 'general' });
    const [selectedNotification, setSelectedNotification] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:5080/api/notifications');
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedNotification) {
            await updateNotification();
        } else {
            await createNotification();
        }
        setFormData({ title: '', message: '', type: 'general' });
        setSelectedNotification(null);
        fetchNotifications();
    };

    const createNotification = async () => {
        try {
            await axios.post('http://localhost:5080/api/notifications', formData);
        } catch (error) {
            console.error('Error creating notification', error);
        }
    };

    const updateNotification = async () => {
        try {
            await axios.put(`http://localhost:5080/api/notifications/${selectedNotification._id}`, formData);
        } catch (error) {
            console.error('Error updating notification', error);
        }
    };

    const deleteNotification = async (id) => {
        try {
            await axios.delete(`http://localhost:5080/api/notifications/${id}`);
            fetchNotifications();
        } catch (error) {
            console.error('Error deleting notification', error);
        }
    };

    const pushNotifications = async () => {
        try {
            await axios.post('http://localhost:5080/api/notifications/push');
            alert('Notifications pushed successfully');
        } catch (error) {
            console.error('Error pushing notifications', error);
        }
    };

    const handleEdit = (notification) => {
        setSelectedNotification(notification);
        setFormData({ title: notification.title, message: notification.message, type: notification.type });
    };

    const handleHome = () => {
        navigate('/home');
    };

    return (
        <div className="notifications-container">
            <button onClick={handleHome}>Home</button>
            <h2>Notifications</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="general">General</option>
                    <option value="daily-reminder">Daily Reminder</option>
                    <option value="urgent">Urgent</option>
                </select>
                <div className="notifications-buttons">
                    <button type="submit">{selectedNotification ? 'Update' : 'Create'} Notification</button>
                    <button type="button" onClick={pushNotifications}>Push Notifications</button>
                </div>
            </form>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification._id}>
                        <h3>{notification.title}</h3>
                        <p>{notification.message}</p>
                        <p><strong>Type:</strong> {notification.type}</p>
                        <button onClick={() => handleEdit(notification)}>Edit</button>
                        <button onClick={() => deleteNotification(notification._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
