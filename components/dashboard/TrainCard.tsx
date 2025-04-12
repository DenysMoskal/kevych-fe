import React from 'react';
import { TrainScheduleFormData } from '@/types/trains_schedule';
import { TrainIcon } from '@/app/assets/svg';

interface TrainCardProps {
  schedule: TrainScheduleFormData;
  onEdit: () => void;
  onDelete: () => void;
  isOwner?: boolean;
}

const TrainCard = ({
  schedule,
  onEdit,
  onDelete,
  isOwner = false,
}: TrainCardProps) => {
  return (
    <div className="bg-white rounded-xl cursor-pointer shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <TrainIcon className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-bold text-xl">Train №{schedule.trainNumber}</h3>
          </div>
          {isOwner && (
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="bg-blue-500 cursor-pointer bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="bg-red-500 cursor-pointer bg-opacity-80 hover:bg-opacity-100 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="w-1/2">
            <div className="text-gray-500 text-sm">From</div>
            <div className="font-semibold text-gray-800 text-lg">
              {schedule.from}
            </div>
          </div>
          <div className="w-1/2 text-right">
            <div className="text-gray-500 text-sm">To</div>
            <div className="font-semibold text-gray-800 text-lg">
              {schedule.to}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 mt-2">
          <div className="flex justify-between mb-2">
            <div>
              <div className="text-gray-500 text-sm">Departure</div>
              <div className="font-medium text-blue-600">
                {schedule.departure}
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-500 text-sm">Arrival</div>
              <div className="font-medium text-indigo-600">
                {schedule.arrival}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainCard;
