export const timelineData = [
  {
    id: 1,
    title: "1. Preparation and Notification",
    description: "The Election Commission of India (ECI) announces the election schedule. The President (for Lok Sabha) or Governor (for State Assemblies) issues the formal notification.",
    details: [
      "Delimitation of constituencies to ensure fair representation.",
      "Updating and publishing of the final electoral rolls.",
      "Model Code of Conduct comes into effect immediately after the announcement."
    ]
  },
  {
    id: 2,
    title: "2. Candidature",
    description: "Candidates file their nomination papers, which are then scrutinized.",
    details: [
      "Candidates submit nominations to the Returning Officer along with a security deposit.",
      "Scrutiny of documents is done to verify eligibility.",
      "Candidates are given a specific window to withdraw their nomination if they choose to do so."
    ]
  },
  {
    id: 3,
    title: "3. Campaigning",
    description: "Political parties and candidates officially begin their election campaigns.",
    details: [
      "Parties release their manifestos outlining their promises.",
      "Public rallies, roadshows, and door-to-door campaigning take place.",
      "All campaigning must strictly adhere to the Model Code of Conduct.",
      "Campaigning officially ends 48 hours before the voting process begins."
    ]
  },
  {
    id: 4,
    title: "4. Polling Day",
    description: "Voters cast their ballots at designated polling stations.",
    details: [
      "Voting is conducted using Electronic Voting Machines (EVMs) and VVPAT systems.",
      "Voter identification is verified against the electoral roll.",
      "Indelible ink is applied to the left forefinger to prevent multiple voting.",
      "After polling ends, EVMs are sealed and transported to secure strong rooms."
    ]
  },
  {
    id: 5,
    title: "5. Counting and Results",
    description: "Votes are counted, and the final results are declared.",
    details: [
      "Counting takes place under the supervision of the Returning Officer on a pre-determined date.",
      "Postal ballots are typically counted first, followed by EVM votes.",
      "The candidate with the highest number of votes in a constituency is declared the winner (First Past the Post system).",
      "The process of forming the new government begins."
    ]
  }
];

export const flashcardData = [
  {
    id: 1,
    term: "ECI",
    definition: "Election Commission of India. An autonomous constitutional authority responsible for administering election processes in India."
  },
  {
    id: 2,
    term: "EVM",
    definition: "Electronic Voting Machine. A device used to cast and record votes electronically, replacing traditional paper ballots."
  },
  {
    id: 3,
    term: "VVPAT",
    definition: "Voter Verified Paper Audit Trail. An independent verification system for voting machines that allows voters to verify that their vote was cast correctly."
  },
  {
    id: 4,
    term: "Model Code of Conduct (MCC)",
    definition: "A set of guidelines issued by the ECI for the conduct of political parties and candidates during elections, mainly concerning speeches, polling day, polling booths, and portfolios."
  },
  {
    id: 5,
    term: "Delimitation",
    definition: "The act or process of fixing limits or boundaries of territorial constituencies in a country or a province having a legislative body."
  },
  {
    id: 6,
    term: "NOTA",
    definition: "None of the Above. A ballot option that allows voters to indicate disapproval of all the candidates in a voting system."
  }
];

export const quizData = [
  {
    id: 1,
    question: "Who issues the formal notification for Lok Sabha elections in India?",
    options: ["The Prime Minister", "The Election Commission of India", "The President of India", "The Chief Justice of India"],
    correctAnswer: "The President of India",
    explanation: "While the ECI announces the schedule, the formal notification calling upon constituencies to elect members is issued by the President of India."
  },
  {
    id: 2,
    question: "What does VVPAT stand for?",
    options: [
      "Voter Voting Paper Audit Trail",
      "Voter Verified Paper Audit Trail",
      "Valid Vote Paper Audit Trail",
      "Verified Voting Process Audit Trail"
    ],
    correctAnswer: "Voter Verified Paper Audit Trail",
    explanation: "VVPAT stands for Voter Verified Paper Audit Trail. It provides a paper slip to the voter confirming their choice."
  },
  {
    id: 3,
    question: "When does election campaigning officially end before the polling process?",
    options: ["24 hours before", "48 hours before", "12 hours before", "On the morning of polling day"],
    correctAnswer: "48 hours before",
    explanation: "According to ECI guidelines, all public campaigning must stop 48 hours before the time fixed for the conclusion of the poll."
  },
  {
    id: 4,
    question: "Which voting system is primarily used in Lok Sabha elections to determine the winner?",
    options: ["Proportional Representation", "Ranked Choice Voting", "First Past the Post", "Two-Round System"],
    correctAnswer: "First Past the Post",
    explanation: "India uses the 'First Past the Post' system, where the candidate who secures the highest number of votes in a constituency is declared elected, regardless of whether they have a majority."
  },
  {
    id: 5,
    question: "What is the minimum voting age for citizens in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correctAnswer: "18 years",
    explanation: "The voting age in India was reduced from 21 to 18 years by the 61st Constitutional Amendment Act of 1988."
  }
];
