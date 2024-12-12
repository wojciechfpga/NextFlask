import axios from 'axios';
import { API_ROUTES } from '../config/apiRoutes';
import { ERROR_MESSAGES } from '../config/errorMessages';
import { ALERT_MESSAGES } from '../config/alertMessages';

export const apiGetRetriveMyReservations = async (token) => {
  try {
    const response = await axios.get(API_ROUTES.MY_RESERVATIONS, {
      headers: { Authorization: `${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
};

export const apiPostSendReservation = async (formData, token) => {
  try {
    await axios.post(API_ROUTES.RESERVATIONS, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    alert(ALERT_MESSAGES.RESERVATION_CREATED);
  } catch {
    alert(ALERT_MESSAGES.RESERVATION_CREATION_ERROR);
  }
};

export const apiGetRetrieveRooms = async () => {
  try {
    const { data } = await axios.get(API_ROUTES.ROOMS);
    return data;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.FETCH_ROOMS_ERROR);
  }
};

export const apiPatchUpdateReservation = async (token, event) => {
  try {
    const response = await axios.patch(
      `${API_ROUTES.RESERVATIONS}/${event.id}`,
      event,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
