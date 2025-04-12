import { User } from './user';

export interface TrainScheduleResponse {
  id: string;
  trainNumber: string;
  trainId: string;
  departureStation: string;
  departureStationId: string;
  arrivalStation: string;
  arrivalStationId: string;
  departureTime: string;
  arrivalTime: string;
  user: User;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrainScheduleFormData {
  id: string;
  trainNumber: string;
  trainId: string;
  from: string;
  fromId: string;
  to: string;
  toId: string;
  departure: string;
  arrival: string;
}

export interface TrainScheduleUpdateParams {
  trainId: string;
  departureStationId: string;
  arrivalStationId: string;
  departureTime: string;
  arrivalTime: string;
  trainNumber?: string;
  departureStation?: string;
  arrivalStation?: string;
}
