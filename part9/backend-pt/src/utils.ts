/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatient } from "./types";

type Fields = {
  id: unknown;
  name: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
};

const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};

const parseString = (str: unknown) => {
  if (!str || !isString(str)) {
    throw new Error("invalid string argument " + str);
  }
  return str;
};

const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown) => {
  if (!gender || !isGender(gender)) {
    throw new Error("invalid gender argument " + gender);
  }
  return gender;
};

const isDate = (date: string) => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("invalid date argument " + date);
  }
  return date;
};

export const toNewPatientEntry = ({
  name,
  ssn,
  dateOfBirth,
  occupation,
  gender,
}: Fields): NewPatient => {
  return {
    name: parseString(name),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseString(occupation),
  };
};
