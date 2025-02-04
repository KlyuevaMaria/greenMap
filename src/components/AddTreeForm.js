import React, { useState, useEffect } from 'react';
import './CSS/TreeForm.css'

const AddTreeForm = ({ onClose, initialCoordinates, onSubmit }) => {
    const [formData, setFormData] = useState({
        type: '',
        latitude: '',
        longitude: '',
        adress: '',
        owner: '',
        year_of_planting: '',
        height: '',
        diameter: '',
        number_of_barrels: '',
        crown_diameter: '',
        statusId: '',
        specialNoteId: '',
        environmentId: '',
        conditionId: '',
        document: null, 
        photo: null,  
    });

    useEffect(() => {
        if (initialCoordinates) {
           setFormData(prevState => ({
                ...prevState,
              latitude: initialCoordinates[1].toFixed(7).toString(),
              longitude: initialCoordinates[0].toFixed(7).toString()
          }));
        }
    }, [initialCoordinates]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    // Обработчик для загрузки файлов
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files[0]
        }));
    };
  const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Преобразуем строковые значения id в числа
      const transformedData = {
          ...formData,
          statusId: parseInt(formData.statusId, 10) || null, // Если строка пустая или не число, ставим null
          specialNoteId: parseInt(formData.specialNoteId, 10) || null,
          environmentId: parseInt(formData.environmentId, 10) || null,
          conditionId: parseInt(formData.conditionId, 10) || null,
          year_of_planting: parseInt(formData.year_of_planting, 10) || null,
          height: parseFloat(formData.height) || null,
          diameter: parseFloat(formData.diameter) || null,
          number_of_barrels: parseInt(formData.number_of_barrels, 10) || null,
          crown_diameter: parseFloat(formData.crown_diameter) || null,
      };
      onSubmit(transformedData);
      onClose();
      console.log('Form Data:', transformedData);
  };


    return (
        <div className="form-panel">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>Форма добавления дерева</h2>
            <form onSubmit={handleSubmit}>
            <label>
                    Тип дерева:
                    <input type="text" name="type" value={formData.type} onChange={handleChange} required />
                </label>
                <label>
                    Широта:
                    <input type="number" step="0.0000001" name="latitude" value={formData.latitude} onChange={handleChange} required />
                </label>
                <label>
                    Долгота:
                    <input type="number" step="0.0000001" name="longitude" value={formData.longitude} onChange={handleChange} required />
                </label>
                <label>
                    Адрес:
                    <input type="text" name="adress" value={formData.adress} onChange={handleChange} required />
                </label>
                <label>
                    Владелец:
                    <input type="text" name="owner" value={formData.owner} onChange={handleChange} required />
                </label>
                <label>
                    Год посадки:
                    <input type="number" name="year_of_planting" value={formData.year_of_planting} onChange={handleChange} required />
                </label>
                <label>
                    Высота:
                    <input type="number" step="0.01" name="height" value={formData.height} onChange={handleChange} required />
                </label>
                <label>
                    Диаметр:
                    <input type="number" step="0.01" name="diameter" value={formData.diameter} onChange={handleChange} required />
                </label>
                 <label>
                    Количество стволов:
                    <input type="number" name="number_of_barrels" value={formData.number_of_barrels} onChange={handleChange} required />
                </label>
                <label>
                    Диаметр кроны:
                    <input type="number" step="0.01" name="crown_diameter" value={formData.crown_diameter} onChange={handleChange} required />
                </label>
                 <label>
                    ID Статуса:
                    <input type="number" name="statusId" value={formData.statusId} onChange={handleChange} required />
                </label>
                <label>
                    ID Особой заметки:
                    <input type="number" name="specialNoteId" value={formData.specialNoteId} onChange={handleChange} required />
                </label>
                <label>
                    ID Окружения:
                    <input type="number" name="environmentId" value={formData.environmentId} onChange={handleChange} required />
                </label>
                  <label>
                    ID Состояния:
                    <input type="number" name="conditionId" value={formData.conditionId} onChange={handleChange} required />
                </label>
                <label>
                    Документ:
                    <input type="file" name="document"  onChange={handleFileChange} />
                </label>
                <label>
                    Фото:
                    <input type="file" name="photo" onChange={handleFileChange} />
                </label>

                <button type="submit">Добавить</button>
            </form>
        </div>
    );
};

export default AddTreeForm;
