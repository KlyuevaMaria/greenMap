import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  selectLoading,
  selectError,
} from "../store/notificationSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/NotificationForm.css";

function NotificationForm() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(`Ошибка: ${error}`);
    }
  }, [error]);

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (img) {
      formData.append("img", img);
    }
    formData.append("userId", userId);

    dispatch(addNotification(formData))
      .unwrap()
      .then(() => {
        toast.success("Уведомление успешно добавлено!");
        setTitle("");
        setDescription("");
        setImg(null);
        setUserId("");
      })
      .catch((rejectedValue) => {
        console.error("Ошибка при добавлении:", rejectedValue);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Заголовок:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="img">Изображение:</label>
          <input type="file" id="img" onChange={handleFileChange} />
        </div>
        <div className="form-group">
          <label htmlFor="userId">ID пользователя:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Создать уведомление"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default NotificationForm;
