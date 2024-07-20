import React, { useState, useEffect } from 'react';

interface Session {
  id?: number;
  themeId: number;
  duration: number;
  price: number;
  minParticipants: number;
  availableSlots: string[];
  createdBy: number;
}

interface Theme {
  id: number;
  name: string;
  salle: number;
  histoire: string;
  photo?: string;
}

interface SessionFormProps {
  session?: Session;
  onSave: (session: Session) => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ session, onSave }) => {
  const [formData, setFormData] = useState<Session>({
    themeId: session?.themeId || 0,
    duration: session?.duration || 0,
    price: session?.price || 0,
    minParticipants: session?.minParticipants || 0,
    availableSlots: session?.availableSlots || [''],
    createdBy: session?.createdBy || 0
  });

  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/themes') // Assurez-vous que cette URL est correcte
      .then(response => response.json())
      .then(data => setThemes(data))
      .catch(error => console.error('Error fetching themes:', error));
  }, []);

  useEffect(() => {
    setFormData({
      themeId: session?.themeId || 0,
      duration: session?.duration || 0,
      price: session?.price || 0,
      minParticipants: session?.minParticipants || 0,
      availableSlots: session?.availableSlots || [''],
      createdBy: session?.createdBy || 0
    });
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSlotChange = (index: number, value: string) => {
    const slots = [...formData.availableSlots];
    slots[index] = value;
    setFormData(prevState => ({ ...prevState, availableSlots: slots }));
  };

  const handleAddSlot = () => {
    setFormData(prevState => ({ ...prevState, availableSlots: [...prevState.availableSlots, ''] }));
  };

  const handleRemoveSlot = (index: number) => {
    const slots = formData.availableSlots.filter((_, i) => i !== index);
    setFormData(prevState => ({ ...prevState, availableSlots: slots }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Thème</label>
        <select
          name="themeId"
          value={formData.themeId}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Choisir un thème</option>
          {themes.map(theme => (
            <option key={theme.id} value={theme.id}>{theme.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Durée (minutes)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Prix (€)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Participants minimum</label>
        <input
          type="number"
          name="minParticipants"
          value={formData.minParticipants}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Créneaux disponibles</label>
        {formData.availableSlots.map((slot, index) => (
          <div key={index} className="flex items-center mt-1">
            <input
              type="text"
              value={slot}
              onChange={(e) => handleSlotChange(index, e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button type="button" onClick={() => handleRemoveSlot(index)} className="ml-2 px-2 py-1 text-white bg-red-500 rounded">
              X
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddSlot} className="mt-2 px-4 py-2 text-white bg-green-500 rounded">
          Ajouter un créneau
        </button>
      </div>
      <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-500 rounded">
        Sauvegarder
      </button>
    </form>
  );
};

export default SessionForm;