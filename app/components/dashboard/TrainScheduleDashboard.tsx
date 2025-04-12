'use client';

import React, { useEffect, useState } from 'react';
import api from '@/api/axios';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import ErrorAlert from '../ui/ErrorAlert';
import TrainModal from './TrainModal';
import TrainCard from './TrainCard';
import ConfirmationModal from '../ui/ConfirmationModal';
import SearchPanel, { SortByType, SortOrderType } from './SearchPanel';
import {
  TrainScheduleResponse,
  TrainScheduleFormData,
  TrainScheduleUpdateParams,
} from '@/types/trains_schedule';
import useFetch from '@/hooks/useFetch';
import { TransportItem } from '@/types/transport_items';
import { toast } from 'react-toastify';
import { ApiError } from '@/types/error';
import { useUserStore } from '@/store';
import { useDebounce } from '@/hooks/useDebounce';

const TrainScheduleDashboard = () => {
  const {
    data: schedules,
    isLoading,
    error,
    execute,
  } = useFetch<TrainScheduleResponse[]>([]);

  const { user } = useUserStore();

  const { data: stations, execute: stationsExecute } = useFetch<
    TransportItem[]
  >([]);

  const { data: trains, execute: trainsExecute } = useFetch<TransportItem[]>(
    []
  );

  const [editingSchedule, setEditingSchedule] =
    useState<TrainScheduleFormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortByType>(SortByType.DEPARTURE_TIME);
  const [sortOrder, setSortOrder] = useState<SortOrderType>(SortOrderType.ASC);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    const fetchData = async () => {
      await stationsExecute(api.get('/transport-items/stations'));
      await trainsExecute(api.get('/transport-items/trains'));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      const params = new URLSearchParams();

      if (sortBy) params.append('sortBy', sortBy);
      if (sortOrder) params.append('sortOrder', sortOrder);
      if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);

      await execute(api.get(`/train-schedules?${params.toString()}`));
    };

    fetchSchedules();
  }, [sortBy, sortOrder, debouncedSearchTerm]);

  const handleEdit = async (schedule: TrainScheduleResponse) => {
    try {
      const response = await api.get(`/train-schedules/${schedule.id}`);
      const detailedSchedule = response.data;

      const departureDate = new Date(detailedSchedule.departureTime);
      const arrivalDate = new Date(detailedSchedule.arrivalTime);

      const formatTimeForInput = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      };

      const formData: TrainScheduleFormData = {
        id: detailedSchedule.id,
        trainNumber: detailedSchedule.trainNumber,
        trainId: detailedSchedule.trainId,
        from: detailedSchedule.departureStation,
        fromId: detailedSchedule.departureStationId,
        to: detailedSchedule.arrivalStation,
        toId: detailedSchedule.arrivalStationId,
        departure: formatTimeForInput(departureDate),
        arrival: formatTimeForInput(arrivalDate),
      };

      setEditingSchedule(formData);
      setIsModalOpen(true);
    } catch (err) {
      toast.error(
        (err as ApiError).response?.data.message ||
          'Failed to load schedule details. Please try again.'
      );
    }
  };

  const handleDeleteClick = (id: string) => {
    setScheduleToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!scheduleToDelete) return;

    try {
      const response = await api.delete(`/train-schedules/${scheduleToDelete}`);
      console.log(response);
      await execute(api.get('/train-schedules'));

      toast.success('Train schedule successfully deleted!');

      setIsDeleteModalOpen(false);
      setScheduleToDelete(null);
    } catch (err) {
      console.error('Error deleting train schedule:', err);

      toast.error(
        (err as ApiError).response?.data.message ||
          'Failed to delete train schedule. Please try again.'
      );
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setScheduleToDelete(null);
  };

  const handleAddNew = () => {
    setEditingSchedule({
      id: '',
      trainNumber: '',
      trainId: '',
      from: '',
      fromId: '',
      to: '',
      toId: '',
      departure: '',
      arrival: '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (formData: TrainScheduleFormData) => {
    try {
      const apiData: TrainScheduleUpdateParams = {
        trainId: formData.trainId,
        departureStationId: formData.fromId,
        arrivalStationId: formData.toId,
        departureTime: formatTimeForAPI(formData.departure),
        arrivalTime: formatTimeForAPI(formData.arrival),
      };

      if (formData.id) {
        apiData.trainNumber = formData.trainNumber;
        apiData.departureStation = formData.from;
        apiData.arrivalStation = formData.to;
        await api.patch(`/train-schedules/${formData.id}`, apiData);
        toast.success('Train schedule updated successfully!');
      } else {
        await api.post('/train-schedules', apiData);
        toast.success('New train schedule created successfully!');
      }

      await execute(api.get('/train-schedules'));
      setIsModalOpen(false);
      setEditingSchedule(null);
    } catch (err) {
      toast.error(
        (err as ApiError).response?.data.message ||
          'Failed to save train schedule. Please try again.'
      );
    }
  };

  const formatTimeForAPI = (timeString: string): string => {
    const now = new Date();
    const [hours, minutes] = timeString.split(':').map(Number);

    const date = new Date(now);
    date.setHours(hours, minutes, 0, 0);

    return date.toISOString();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSchedule(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-lg shadow-lg text-white">
        <h1 className="text-3xl font-bold">Train schedules</h1>
        <button
          onClick={handleAddNew}
          className="bg-white cursor-pointer text-blue-700 hover:bg-blue-50 px-5 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all shadow-md hover:shadow-lg"
        >
          <span className="text-xl">+</span> Add new
        </button>
      </div>

      <SearchPanel
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {isLoading && <LoadingSpinner />}

      {error && <ErrorAlert message={error.message} />}

      {!isLoading && !error && schedules?.length === 0 && (
        <EmptyState message="Train schedules are absent" />
      )}

      {schedules && schedules.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule) => (
            <TrainCard
              key={schedule.id}
              schedule={{
                id: schedule.id,
                trainNumber: schedule.trainNumber,
                trainId: schedule.trainId,
                from: schedule.departureStation,
                fromId: schedule.departureStationId,
                to: schedule.arrivalStation,
                toId: schedule.arrivalStationId,
                departure: new Date(schedule.departureTime).toLocaleTimeString(
                  [],
                  { hour: '2-digit', minute: '2-digit' }
                ),
                arrival: new Date(schedule.arrivalTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              }}
              isOwner={schedule.userId === user?.id}
              onEdit={() => handleEdit(schedule)}
              onDelete={() => handleDeleteClick(schedule.id)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <TrainModal
          schedule={editingSchedule}
          stations={stations || []}
          trains={trains || []}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Train Schedule"
        message="Are you sure you want to delete this train schedule? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />
    </div>
  );
};

export default TrainScheduleDashboard;
