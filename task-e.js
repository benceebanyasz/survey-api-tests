import axios from "axios";

//returns the list of surveys with statistics
export const getListOfSurveysWithStats = async () => {
  const url = `http://localhost:8080/api/surveys/statistics`;

  try {
    const response = await axios.get(url, {});

    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

console.log(await getListOfSurveysWithStats())