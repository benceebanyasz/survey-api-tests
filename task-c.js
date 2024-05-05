import axios from "axios";

//returns the list of points for a member grouped by surveys
const getListOfPointsForMemberPerSurvey = async (memberId) => {
  const url = `http://localhost:8080/api/members/${memberId}/points`;

  if (isNaN(memberId)) {
    console.error(
      `Invalid member ID: ${memberId}. The member ID must be a number.`
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

//returns the points gathered by a member with the related survey id
const listPointsForMember = async (memberId) => {
  const listOfPointsPerSurvey = await getListOfPointsForMemberPerSurvey(
    memberId
  );
  const arrayOfPointsWithRelatedSurvey = listOfPointsPerSurvey.map(
    (surveyWithPoint) => ({
      point: surveyWithPoint.point,
      surveyId: surveyWithPoint.survey.id,
    })
  );

  return arrayOfPointsWithRelatedSurvey;
};

//returns all the points gathered by a member
const pointsGatheredByMember = async (memberId) => {
  const listOfPointsAndSurveyId = await listPointsForMember(memberId);
  return listOfPointsAndSurveyId.reduce((total, item) => total + item.point, 0);
};

console.log(await listPointsForMember(1));
console.log(await pointsGatheredByMember(1));
