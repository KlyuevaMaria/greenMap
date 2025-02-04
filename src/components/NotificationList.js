import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  selectNotifications,
  selectLoading,
  selectError,
} from "../store/notificationSlice";
import "./CSS/NotificationList.css"; // Импорт файла стилей

const NotificationList = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const handleOpenModal = (notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  const visibleNotifications = showAll
    ? notifications
    : notifications.slice(0, 3);

  return (
    <div>
      {" "}
      {/* Обертка для контейнера и кнопки */}
      <div className="notification-container">
        {visibleNotifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            {notification.img && (
              <img
                src={"http://localhost:8080/" + notification.img}
                alt={notification.title}
                className="notification-image"
              />
            )}
            <h3 className="notification-title">{notification.title}</h3>
            <p className="notification-date">
              Дата публикации: {notification.createdAt}
            </p>
            <p className="notification-description">
              {notification.description.substring(0, 100)}...
            </p>
            <button
              className="notification-button"
              onClick={() => handleOpenModal(notification)}
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>
      {selectedNotification && (
        <Modal notification={selectedNotification} onClose={handleCloseModal} />
      )}
      {!showAll && notifications.length > 3 && (
        <button className="view-all-button" onClick={handleShowAll}>
          Просмотреть все
        </button>
      )}
      {showAll && (
        <button className="view-less-button" onClick={handleShowLess}>
          Скрыть уведомления
        </button>
      )}
    </div>
  );
};

const Modal = ({ notification, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {notification.img && (
          <img
            src={process.env.REACT_APP_API_URL + notification.img}
            alt={notification.title}
            className="modal-image"
          />
        )}
        <h2 className="modal-title">{notification.title}</h2>
        <p className="modal-date">Дата публикации: {notification.createdAt}</p>
        <p className="modal-description">{notification.description}</p>
        <button className="modal-button" onClick={onClose}>
          Вернуться назад
        </button>
      </div>
    </div>
  );
};

export default NotificationList;
