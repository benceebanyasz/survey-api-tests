import axios from "axios";

//returns all the members who have not been invited to a given survey yet
const getMembersToBeInvited = async (surveyId) => {
  const url = `http://localhost:8080/api/surveys/${surveyId}/members/not-invited`;

  if (isNaN(surveyId)) {
    console.error(
      `Invalid survey ID: ${surveyId}. The survey ID must be a number.`
    );
    return;
  }

  try {
    const response = await axios.get(url, {});

    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

console.log(await getMembersToBeInvited(1));