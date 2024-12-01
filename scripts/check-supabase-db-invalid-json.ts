import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_KEY || "";

const supabase = createClient(supabaseUrl, serviceRoleKey);

const checkSupabaseDbInvalidJson = async (tableName: string, columnName: string) => {
  console.log(``);
  console.log(`-----------`);
  console.log(`checking ${tableName}`);
  console.log(``);

  const { data, error } = await supabase.from(tableName).select('*');
  if (error) {
    console.error(error);
    return;
  }

  data.forEach((row) => {
    try {
      JSON.parse(row[columnName]);
      // console.log(`${row.id} - valid`);
    } catch (e) {
      console.error(`${row.id} - in-valid`);
    }
  });
};

const checkDB = async () => {
  await checkSupabaseDbInvalidJson('lesson-plans', 'content');
  await checkSupabaseDbInvalidJson('leveller', 'content');
  await checkSupabaseDbInvalidJson('grade-papers', 'content');
  await checkSupabaseDbInvalidJson('differently-abled', 'content');
  await checkSupabaseDbInvalidJson('qa', 'content');
  await checkSupabaseDbInvalidJson('relevant-lessons', 'content');
  await checkSupabaseDbInvalidJson('rubrics', 'content');
}


checkDB()
