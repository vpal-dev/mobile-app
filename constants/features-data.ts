import { FeatureBoxProps } from "@/components/feature-box";
import { PencilRulerIcon } from "lucide-react-native";

export type FeatureDataItem = FeatureBoxProps & { id: string, path: string }

export const FEATURES_DATA: Array<FeatureDataItem> = [
  {
    id: 'lesson-plans-index',
    path: '/home/lesson-plans/create',
    title: 'Create Lessons Plans in 2 mins',
    subtitle: '12k teachers',
    Icon: PencilRulerIcon,
    description: `Simply input your topic and requirements, and 
Vpal generates detailed lesson plans with objectives, activities, and assessments. 
Customise as needed and save your preferred templates.`
  },
  {
    id: 'generate-qa',
    path: '/home/generate-qa',
    title: 'Generate assessments',
    subtitle: '12k teachers',
    Icon: PencilRulerIcon,
    description: `
Tell Vpal your subject, topic, and difficulty level. 
Get balanced question papers with marking schemes instantly, 
following your school's format and curriculum requirements.
    `
  },
  {
    id: 'relevant-lesson-plans',
    path: '/home/relevant-lesson-plans',
    title: 'Make your lesson plan relevant',
    subtitle: '12k teachers',
    Icon: PencilRulerIcon,
    description: `
Vpal helps create engaging plans by suggesting real-world examples, local context, and interactive activities.
Keep your content fresh and relatable for today's students.
    `
  },
  {
    id: 'grade-papers',
    path: '/home/grade-papers',
    title: 'Grade Papers',
    subtitle: '12k teachers',
    Icon: PencilRulerIcon,
    description: `
Upload student responses and answer scripts and let VPal handle the grading using your marking scheme.
Get consistent evaluation and detailed feedback suggestions for each student.
    `
  },
  {
    id: 'leveller',
    path: '/home/leveller',
    title: 'Leveller',
    subtitle: '12k teachers',
    Icon: PencilRulerIcon,
    description: `
Make the assessment easy, medium & hard for different students.
    `
  },
]
