//helper functions
function getNumOfRightAnswers(serverQuestion, userQuestion) {
  let numOfRightAnswers = 0;

  for (let i = 0; i < serverQuestion.length; i++) {
    if (serverQuestion[i].answer.length === 0 && (userQuestion[i].myanswer?.length === 0 || userQuestion[i].myanswer?.length === undefined)) {
      numOfRightAnswers++;
    } else if (serverQuestion[i].answer.length !== userQuestion[i].myanswer?.length) {
      continue;
    } else if (isSubSet(serverQuestion[i].answer, userQuestion[i].myanswer) && isSubSet(userQuestion[i].myanswer, serverQuestion[i].answer)) {
      numOfRightAnswers++;
    }
  }
  return numOfRightAnswers
}

//is subset a subset of parent
function isSubSet(parent, subset) {
  for (let i = 0; i < subset.length; i++) {
    if (!parent.includes(subset[i])) {
      return false;
    }
  }
  return true;
}



module.exports = { getNumOfRightAnswers, isSubSet }