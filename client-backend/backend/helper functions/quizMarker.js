//helper functions
function getNumOfRightAnswers (serverQuestion, userQuestion){
    let numOfRightAnswers = 0;
  
    for (let i=0; i< serverQuestion.length; i++){
      if (!userQuestion[i].myanswer || userQuestion[i].myanswer.length === 0){
        continue;
      }
      if (isSubSet(serverQuestion[i].answer,userQuestion[i].myanswer) && isSubSet(userQuestion[i].myanswer,serverQuestion[i].answer)){
        numOfRightAnswers++;
      }
    }
    return numOfRightAnswers
  }
  
  //is subset a subset of parent
  function isSubSet(parent, subset){
    for (let i=0; i < subset.length; i++){
      if (!parent.includes(subset[i])){
        return false;
      }
    }
    return true;
  }



  module.exports ={getNumOfRightAnswers, isSubSet}