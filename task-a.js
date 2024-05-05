import axios from "axios";

//returns all the members who completed a given survey
export const getMembersWhoCompletedSurvey = async (surveyId) => {
  const url = `http://localhost:8080/api/surveys/${surveyId}/members`;

  if (isNaN(surveyId)) {
    console.error(
      `Invalid survey ID: ${surveyId}. The survey ID must be a number.`
    );
    return;
  }

  try {
    const response = await axios.get(url, {
      params: {
        status: "COMPLETED",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

console.log(await getMembersWhoCompletedSurvey(1));