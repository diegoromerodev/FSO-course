/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from "../data/patients";
import { NewPatient, Patient, PrivatedPatient } from "../types";
import { v4 as uuid } from "uuid";

export const getPatients = (): Array<Patient> => {
  return patients;
};

export const getPrivatedPatients = (): Array<PrivatedPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

export const createPatient = (newPatient: NewPatient): PrivatedPatient => {
  const id = uuid() as string;
  const toAddPatient = {
    ...newPatient,
    id,
  };
  patients.push(toAddPatient);
  return toAddPatient;
};
