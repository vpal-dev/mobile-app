import { FeatureBoxProps } from "@/components/feature-box";
import { PencilRulerIcon } from "lucide-react-native";

export const FEATURES_DATA: Array<FeatureBoxProps & { id: string, path: string }> = [
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
    title: 'Generate question papers and assessments',
    subtitle: '12k teachers',
    Icon: PencilRulerIcon,
    description: `
Tell Vpal your subject, topic, and difficulty level. 
Get balanced question papers with marking schemes instantly, 
following your school's format and curriculum requirements.
    `
  }

]
