export default [
  {
    id: '3873',
    title: 'France',
    description: 'France current affairs',
    img: 'set.jpeg',
    questions: [
      //array of questions
      {
        question: 'What is the capital of France?',
        options: {
          A: 'Paris',
          B: 'Rome',
          C: 'London',
          D: 'Berlin',
        },
        answer: ['A'],
      },
    ],
    score: '12/30',
  },
  {
    id: '2984',
    title: 'History',
    description: 'World history trivia',
    img: '',
    questions: [
      {
        question: 'Which year did World War II end?',
        options: {
          A: '1939',
          B: '1945',
          C: '1918',
          D: '1953',
        },
        answer: ['B'],
      },
      {
        question: 'Who was the first President of the United States?',
        options: {
          A: 'George Washington',
          B: 'Abraham Lincoln',
          C: 'Thomas Jefferson',
          D: 'John F. Kennedy',
        },
        answer: ['A'],
      },
    ],
    score: '18/20',
  },
  {
    id: '7632',
    title: 'Sports',
    description: 'Test your sports knowledge',
    img: '',
    questions: [
      {
        question: 'Who won the FIFA World Cup in 2018?',
        options: {
          A: 'Brazil',
          B: 'Germany',
          C: 'France',
          D: 'Spain',
        },
        answer: ['C'],
      },
      {
        question: 'Which country has won the most Olympic gold medals?',
        options: {
          A: 'United States',
          B: 'China',
          C: 'Russia',
          D: 'Germany',
        },
        answer: ['A'],
      },
    ],
    score: '15/20',
  },
  // Add more quiz objects as needed
];
