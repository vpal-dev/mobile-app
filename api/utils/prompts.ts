export const JSON_PROMPT = `
create a JSON with \`title\`, \`shortDescription\` & \`content\` field. And only return a JSON, not simple text.
The \`title\` should be a string, \`shortDescription\` should also be a string.

And most importantly, \`content\` should be a string that is in Markdown format.
The \`content\` field should and only should be in a Markdown format.

It is connected with a service that expects that you will only return a proper JSON.
`


/* **************************************************************************************** */
/* FEATURE PROMPTS */
/* **************************************************************************************** */

type UserDetail = {
  board: string,
  subject: string,
  state_board: string
}

export const createLessonPlanPrompt = (
  { board, subject }: UserDetail,
  { grade, topic }: { grade: string, topic: string }
) => `
Create a lesson plan for:
- Board: ${board}
- Subject: ${subject}
- Grade: ${grade}
- Topic: ${topic}

Please make sure the following: 
- lesson plan follows NCERT standard 
- includes learning objectives
- includes duration
- includes required materials
- includes prior knowledge requirements
- includes teaching methodology
- includes activities and timeframes
- includes assessment strategies
- includes resources needed
- includes home assignments

${JSON_PROMPT}
`


export const generateQAPrompt = (
  { board, subject }: UserDetail,
  { grade, topic, noOfQuestions, type }: { grade: string, topic: string, noOfQuestions: number, type: string }
) => `
Generate an assessment for:
- Board: ${board}
- Subject: ${subject}
- Grade: ${grade}
- Topic: ${topic}
- Type: ${type} (e.g., MCQ, short answer, long answer)
- Number of Questions: ${noOfQuestions}

Please make sure the following:
- include clear marking scheme
- include question distribution across difficulty levels
- include mix of factual and analytical questions
- try to use previous years' pattern questions of ${board} where applicable

${JSON_PROMPT}
`


export const gradePaperPrompt = (
  { board, subject }: UserDetail,
  { grade, topic }: { grade: string, topic: string }
) => `
Grade the assignment for:
- Board: ${board}
- Subject: ${subject}
- Grade: ${grade}
- Topic: ${topic}

Please provide:
- Detailed marking scheme
- Question-wise feedback
- Overall strengths and areas for improvement
- Suggested grade with justification
- Tips for improvement
- Sample answers for questions that need work
  
${JSON_PROMPT}
`

export const levellerPrompt = (
  { board, subject }: UserDetail,
  { grade, description }: { grade: string, description: string }
) => `
Modify the assessment for:
- Board: ${board}
- Subject: ${subject}
- Grade: ${grade}
- Description: ${description} (e.g., "more challenging", "simplified")

Please include:
- Modified questions maintaining core concepts
- Adjusted difficulty level
- Updated marking scheme
- Modified instructions if needed
  
${JSON_PROMPT}
`


export const relevantLessonPlanPrompt = (
  { board, subject }: UserDetail,
  { learningObjective, classProfile }: { learningObjective: string, classProfile: string }
) => `
Create a contextualized lesson plan for:
- Board: ${board}
- Subject: ${subject}
- Learning Objective: ${learningObjective}
- Class Profile: ${classProfile}

Please include:
- Real-world applications
- Local context examples
- Interactive activities
- Digital integration where applicable
- Assessment strategies
- Differentiated learning approaches
- Cross-curricular connections

${JSON_PROMPT}
`




