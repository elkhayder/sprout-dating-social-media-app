const getAgeFromTimestamp = (birthdayTimestamp: number) => {
   return Math.floor(
      (new Date().getTime() - birthdayTimestamp) / (1000 * 60 * 60 * 24 * 365)
   );
};
export default getAgeFromTimestamp;
