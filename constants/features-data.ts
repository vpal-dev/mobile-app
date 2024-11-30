import { FeatureBoxProps } from "@/components/feature-box";
import { BookCheckIcon, BookUp2Icon, BoxesIcon, FileCheck2Icon, PencilRulerIcon, ScrollTextIcon, ShapesIcon } from "lucide-react-native";

type FeaturesKeys =
  'LESSON_PLANS' |
  'GENERATE_QA' |
  'RELEVANT_LESSON_PLANS' |
  'GRADE_PAPERS' |
  'LEVELLER' |
  'RUBRICS' |
  'DIFFERENTLY_ABLED'
export type FeatureType = "create" | "check" | "differentiate"
export type FeatureDataItem = FeatureBoxProps & { feature_type: FeatureType, id: string, path: string }

export const FEATURES_DATA: Record<FeaturesKeys, FeatureDataItem> = {
  LESSON_PLANS: {
    id: 'lesson-plans-index',
    path: '/home/lesson-plans/create',
    color: "#BBDBED",
    title: 'Create Lessons Plan',
    subtitle: 'used by teachers 5000 times',
    Icon: PencilRulerIcon,
    feature_type: "create",
    description: `Generate a lesson plan for a topic or objective you are teaching`
  },
  GENERATE_QA: {
    id: 'generate-qa',
    path: '/home/generate-qa/create',
    color: "#EFCEC8",
    title: 'Question paper',
    subtitle: 'used by teachers 5000 times',
    Icon: ScrollTextIcon,
    feature_type: "create",
    description: `Generate question papers and marking schemes for assessments, unit tests, half-yearly or final exams`
  },
  RELEVANT_LESSON_PLANS: {
    id: 'relevant-lesson-plans',
    path: '/home/relevant-lessons/create',
    color: "#E1DCA6",
    title: 'Make your lesson plan relevant',
    subtitle: 'used by teachers 5000 times',
    Icon: BookCheckIcon,
    feature_type: "differentiate",
    description: `Customize your lesson plan by making it relevant for your students with real-world examples`
  },
  GRADE_PAPERS: {
    id: 'grade-papers',
    path: '/home/grade-papers/create',
    color: "#C9BBED",
    title: 'Grade Question Papers',
    subtitle: 'used by teachers 5000 times',
    Icon: FileCheck2Icon,
    feature_type: "check",
    description: `Upload student responses and answer scripts and let Vpal handle the grading. Get detailed feedback and suggestions on each student`
  },
  LEVELLER: {
    id: 'leveller',
    path: '/home/leveller/create',
    color: "#EDBBC5",
    title: 'Content leveller',
    subtitle: 'used by teachers 5000 times',
    Icon: BookUp2Icon,
    feature_type: 'differentiate',
    description: `Make the content easy/difficult/hard`
  },
  RUBRICS: {
    id: 'rubrics',
    path: '/home/rubrics/create',
    color: "#C2EDBB",
    title: 'Create Rubrics',
    subtitle: 'used by teachers 5000 times',
    Icon: BoxesIcon,
    feature_type: 'create',
    description: `Write a Rubric for an assignment you are creating for a class`
  },
  DIFFERENTLY_ABLED: {
    id: 'differently-abled',
    path: '/home/differently-abled/create',
    color: "#FFDBAE",
    title: 'Gifted Students',
    subtitle: 'used by teachers 5000 times',
    Icon: ShapesIcon,
    feature_type: 'differentiate',
    description: `Differentiate content for gifted students`
  },
}
