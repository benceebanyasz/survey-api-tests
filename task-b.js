import axios from "axios";
import { getMembersWhoCompletedSurvey } from "./task-a.js";

//returns all the surveys a member participated in
const getAllSurveysForMember = async (memberId) => {
  const url = `http://localhost:8080/api/members/${memberId}`;

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

//returns all the surveys a member completed
const getSurveysCompletedByMember = async (memberId) => {
  let completedSurveys = [];
  const allSurveysForMember = await getAllSurveysForMember(memberId);
  const surveyIdsForMember = allSurveysForMember.map((survey) => survey.id);

  for (const surveyId of surveyIdsForMember) {
    const membersWhoCompleted = await getMembersWhoCompletedSurvey(surveyId);
    if (membersWhoCompleted.some((member) => member.id == memberId)) {
      completedSurveys.push(surveyId);
    }
  }

  return completedSurveys;
};

console.log(await getSurveysCompletedByMember(2));
