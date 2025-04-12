import React, { useState, useEffect } from 'react';
import { TrainScheduleFormData } from '@/types/trains_schedule';
import { TransportItem } from '@/types/transport_items';

interface TrainModalProps {
  schedule: TrainScheduleFormData | null;
  onSave: (schedule: TrainScheduleFormData) => void;
  onClose: () => void;
  stations: TransportItem[];
  trains: TransportItem[];
}

const TrainModal = ({
  schedule,
  onSave,
  onClose,
  stations,
  trains,
}: TrainModalProps) => {
  const [formData, setFormData] = useState<TrainScheduleFormData>({
    id: '',
    trainNumber: '',
    trainId: '',
    departure: '',
    arrival: '',
    from: '',
    fromId: '',
    to: '',
    toId: '',
  });

  useEffect(() => {
    if (schedule) {
      setFormData(schedule);
    }
  }, [schedule]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'trainNumber') {
      const selectedTrain = trains.find((train) => train.id === value);
      setFormData({
        ...formData,
        trainNumber: selectedTrain ? selectedTrain.name : '',
        trainId: value,
      });
    } else if (name === 'from') {
      const selectedStation = stations.find((station) => station.id === value);
      setFormData({
        ...formData,
        from: selectedStation ? selectedStation.name : '',
        fromId: value,
      });
    } else if (name === 'to') {
      const selectedStation = stations.find((station) => station.id === value);
      setFormData({
        ...formData,
        to: selectedStation ? selectedStation.name : '',
        toId: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
          <h2 className="text-xl font-bold">
            {formData.id ? 'Edit schedule' : 'Add new schedule'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Train
              </label>
              <select
                name="trainNumber"
                value={formData.trainId}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              >
                <option value="">Select a train</option>
                {trains &&
                  trains.map((train) => (
                    <option key={train.id} value={train.id}>
                      {train.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  From
                </label>
                <select
                  name="from"
                  value={formData.fromId}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                >
                  <option value="">Select departure station</option>
                  {stations &&
                    stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  To
                </label>
                <select
                  name="to"
                  value={formData.toId}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                >
                  <option value="">Select arrival station</option>
                  {stations &&
                    stations.map((station) => (
                      <option key={station.id} value={station.id}>
                        {station.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Departure
                </label>
                <input
                  type="time"
                  name="departure"
                  value={formData.departure}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Arrival
                </label>
                <input
                  type="time"
                  name="arrival"
                  value={formData.arrival}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 font-medium transition-colors shadow-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainModal;
