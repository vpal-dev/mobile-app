import { FeatureBoxProps } from "@/components/feature-box";
import { BookCheckIcon, BookUp2Icon, FileCheck2Icon, PencilRulerIcon, ScrollTextIcon } from "lucide-react-native";

type FeaturesKeys = 'LESSON_PLANS' | 'GENERATE_QA' | 'RELEVANT_LESSON_PLANS' | 'GRADE_PAPERS' | 'LEVELLER'
export type FeatureType = "create" | "check" | "differentiate"
export type FeatureDataItem = FeatureBoxProps & { feature_type: FeatureType, id: string, path: string }


export const FEATURES_DATA: Record<FeaturesKeys, FeatureDataItem> = {
  LESSON_PLANS: {
    id: 'lesson-plans-index',
    path: '/home/lesson-plans/create',
    color: "#BBDBED",
    title: 'Create Lessons Plans in 2 mins',
    subtitle: 'used by teachers 5000 times',
    Icon: PencilRulerIcon,
    feature_type: "create",
    description: `Simply input your topic and requirements, and 
Vpal generates detailed lesson plans with objectives, activities, and assessments. 
Customise as needed and save your preferred templates.`
  },
  GENERATE_QA: {
    id: 'generate-qa',
    path: '/home/generate-qa/create',
    color: "#EFCEC8",
    title: 'Generate assessments',
    subtitle: 'used by teachers 5000 times',
    Icon: ScrollTextIcon,
    feature_type: "create",
    description: `
Tell Vpal your subject, topic, and difficulty level. 
Get balanced question papers with marking schemes instantly, 
following your school's format and curriculum requirements.
    `
  },
  RELEVANT_LESSON_PLANS: {
    id: 'relevant-lesson-plans',
    path: '/home/relevant-lessons/create',
    color: "#E1DCA6",
    title: 'Make your lesson plan relevant',
    subtitle: 'used by teachers 5000 times',
    Icon: BookCheckIcon,
    feature_type: "differentiate",
    description: `
Vpal helps create engaging plans by suggesting real-world examples, local context, and interactive activities.
Keep your content fresh and relatable for today's students.
    `
  },
  GRADE_PAPERS: {
    id: 'grade-papers',
    path: '/home/grade-papers/create',
    color: "#C9BBED",
    title: 'Grade Papers',
    subtitle: 'used by teachers 5000 times',
    Icon: FileCheck2Icon,
    feature_type: "check",
    description: `
Upload student responses and answer scripts and let VPal handle the grading using your marking scheme.
Get consistent evaluation and detailed feedback suggestions for each student.
    `
  },
  LEVELLER: {
    id: 'leveller',
    path: '/home/leveller/create',
    color: "#EDBBC5",
    title: 'Leveller',
    subtitle: 'used by teachers 5000 times',
    Icon: BookUp2Icon,
    feature_type: 'differentiate',
    description: `
Make the assessment easy, medium & hard for different students.
    `
  },
}
