export const COLLEGES = [
  {
    id: 'osu',
    name: 'The Ohio State University',
    short: 'Ohio State',
    domain: 'osu.edu',
  },
  {
    id: 'umich',
    name: 'University of Michigan',
    short: 'Michigan',
    domain: 'umich.edu',
  },
  {
    id: 'purdue',
    name: 'Purdue University',
    short: 'Purdue',
    domain: 'purdue.edu',
  },
  {
    id: 'uiuc',
    name: 'University of Illinois Urbana-Champaign',
    short: 'Illinois',
    domain: 'illinois.edu',
  },
  {
    id: 'gatech',
    name: 'Georgia Institute of Technology',
    short: 'Georgia Tech',
    domain: 'gatech.edu',
  },
]

export const DEFAULT_COLLEGE_ID = 'osu'

const OSU_CLASSES = [
  { code: 'MATH 1050', title: 'College Algebra', dept: 'Mathematics' },
  { code: 'MATH 1060', title: 'Precalculus', dept: 'Mathematics' },
  { code: 'MATH 1075', title: 'Precalculus', dept: 'Mathematics' },
  { code: 'MATH 1116', title: 'Excursions in Mathematics', dept: 'Mathematics' },
  { code: 'MATH 1125', title: 'Mathematics for Architects', dept: 'Mathematics' },
  { code: 'MATH 1130', title: 'Finite Mathematics for the Life Sciences', dept: 'Mathematics' },
  { code: 'MATH 1131', title: 'Calculus for the Life Sciences I', dept: 'Mathematics' },
  { code: 'MATH 1141', title: 'Calculus for the Life Sciences II', dept: 'Mathematics' },
  { code: 'MATH 1148', title: 'Precalculus', dept: 'Mathematics' },
  { code: 'MATH 1150', title: 'Precalculus with Limits', dept: 'Mathematics' },
  { code: 'MATH 1151', title: 'Calculus I', dept: 'Mathematics' },
  { code: 'MATH 1152', title: 'Calculus II', dept: 'Mathematics' },
  { code: 'MATH 2153', title: 'Calculus III', dept: 'Mathematics' },
  { code: 'MATH 2162', title: 'Linear Algebra', dept: 'Mathematics' },
  { code: 'MATH 2173', title: 'Linear Algebra for Engineers', dept: 'Mathematics' },
  { code: 'MATH 2177', title: 'Mathematical Topics for Engineers', dept: 'Mathematics' },
  { code: 'MATH 2182H', title: 'Honors Calculus II', dept: 'Mathematics' },
  { code: 'MATH 2255', title: 'Differential Equations', dept: 'Mathematics' },
  { code: 'MATH 2415H', title: 'Honors Linear Algebra', dept: 'Mathematics' },
  { code: 'MATH 3345', title: 'Foundations of Higher Mathematics', dept: 'Mathematics' },
  { code: 'MATH 3350', title: 'Introduction to Abstract Algebra', dept: 'Mathematics' },
  { code: 'MATH 4507', title: 'Mathematical Modeling', dept: 'Mathematics' },
  { code: 'MATH 4530', title: 'Advanced Calculus I', dept: 'Mathematics' },
  { code: 'MATH 4547', title: 'Partial Differential Equations', dept: 'Mathematics' },
  { code: 'MATH 4557', title: 'Introduction to Probability', dept: 'Mathematics' },

  { code: 'PHYSICS 1103', title: 'Physics for the Life Sciences I', dept: 'Physics' },
  { code: 'PHYSICS 1104', title: 'Physics for the Life Sciences II', dept: 'Physics' },
  { code: 'PHYSICS 1200', title: 'Mechanics, Kinematics, Fluids, Waves', dept: 'Physics' },
  { code: 'PHYSICS 1250', title: 'Mechanics and Thermal Physics', dept: 'Physics' },
  { code: 'PHYSICS 1251', title: 'Electricity, Magnetism and Optics', dept: 'Physics' },
  { code: 'PHYSICS 2300', title: 'Modern Physics', dept: 'Physics' },
  { code: 'PHYSICS 2301', title: 'Intermediate Mechanics', dept: 'Physics' },
  { code: 'PHYSICS 2367', title: 'The History of Physics', dept: 'Physics' },

  { code: 'CHEM 1100', title: 'Chemistry in the World', dept: 'Chemistry' },
  { code: 'CHEM 1110', title: 'Elementary Chemistry', dept: 'Chemistry' },
  { code: 'CHEM 1210', title: 'General Chemistry I', dept: 'Chemistry' },
  { code: 'CHEM 1220', title: 'General Chemistry II', dept: 'Chemistry' },
  { code: 'CHEM 1610', title: 'Chemistry for Engineers', dept: 'Chemistry' },
  { code: 'CHEM 1910H', title: 'Honors General Chemistry I', dept: 'Chemistry' },
  { code: 'CHEM 2210', title: 'Organic Chemistry I', dept: 'Chemistry' },
  { code: 'CHEM 2310', title: 'Organic Chemistry II', dept: 'Chemistry' },
  { code: 'CHEM 2510', title: 'Analytical Chemistry', dept: 'Chemistry' },
  { code: 'CHEM 2910H', title: 'Honors Organic Chemistry I', dept: 'Chemistry' },
  { code: 'CHEM 4310', title: 'Advanced Organic Chemistry', dept: 'Chemistry' },
  { code: 'CHEM 4410', title: 'Physical Chemistry I', dept: 'Chemistry' },

  { code: 'BIOLOGY 1101', title: 'Introductory Biology', dept: 'Biology' },
  { code: 'BIOLOGY 1113', title: 'Biological Sciences: Energy Transfer', dept: 'Biology' },
  { code: 'BIOLOGY 1114', title: 'Biological Sciences: Form and Function', dept: 'Biology' },
  { code: 'BIOLOGY 2100', title: 'Genetics', dept: 'Biology' },
  { code: 'BIOLOGY 3300', title: 'Evolution', dept: 'Biology' },
  { code: 'BIOLOGY 3400', title: 'Microbiology', dept: 'Biology' },
  { code: 'BIOLOGY 4500', title: 'Molecular Biology', dept: 'Biology' },

  { code: 'CSE 1222', title: 'Introduction to Computer Programming', dept: 'Computer Science' },
  { code: 'CSE 1223', title: 'Introduction to Programming in Java', dept: 'Computer Science' },
  { code: 'CSE 1224', title: 'Introduction to Programming in Python', dept: 'Computer Science' },
  { code: 'CSE 2111', title: 'Modeling and Problem Solving with Spreadsheets', dept: 'Computer Science' },
  { code: 'CSE 2122', title: 'Data Structures Using C++', dept: 'Computer Science' },
  { code: 'CSE 2221', title: 'Software I: Software Components', dept: 'Computer Science' },
  { code: 'CSE 2231', title: 'Software II: Software Development', dept: 'Computer Science' },
  { code: 'CSE 2321', title: 'Foundations I: Discrete Structures', dept: 'Computer Science' },
  { code: 'CSE 2331', title: 'Foundations II: Data Structures', dept: 'Computer Science' },
  { code: 'CSE 2421', title: 'Systems I: Computer Organization', dept: 'Computer Science' },
  { code: 'CSE 2431', title: 'Systems II: Operating Systems', dept: 'Computer Science' },
  { code: 'CSE 2501', title: 'Social, Ethical and Professional Issues', dept: 'Computer Science' },
  { code: 'CSE 3241', title: 'Introduction to Databases', dept: 'Computer Science' },
  { code: 'CSE 3341', title: 'Principles of Programming Languages', dept: 'Computer Science' },
  { code: 'CSE 3421', title: 'Computer Architecture', dept: 'Computer Science' },
  { code: 'CSE 3431', title: 'Computer Networking', dept: 'Computer Science' },
  { code: 'CSE 3461', title: 'Computer Networking and Internet Technologies', dept: 'Computer Science' },
  { code: 'CSE 3521', title: 'Survey of Artificial Intelligence', dept: 'Computer Science' },
  { code: 'CSE 3541', title: 'Computer Game and Animation Techniques', dept: 'Computer Science' },
  { code: 'CSE 3901', title: 'Project: Design, Development and Documentation', dept: 'Computer Science' },

  { code: 'STAT 1350', title: 'Elementary Statistics', dept: 'Statistics' },
  { code: 'STAT 1430', title: 'Statistics for the Business Sciences', dept: 'Statistics' },
  { code: 'STAT 1450', title: 'Introduction to the Practice of Statistics', dept: 'Statistics' },
  { code: 'STAT 2450', title: 'Introduction to Statistical Analysis', dept: 'Statistics' },
  { code: 'STAT 3201', title: 'Introduction to Probability', dept: 'Statistics' },
  { code: 'STAT 3202', title: 'Introduction to Statistical Inference', dept: 'Statistics' },
  { code: 'STAT 3301', title: 'Statistics for Research Workers', dept: 'Statistics' },
  { code: 'STAT 3470', title: 'Introduction to Probability and Statistics', dept: 'Statistics' },
  { code: 'STAT 4201', title: 'Introduction to Mathematical Statistics', dept: 'Statistics' },
  { code: 'STAT 4210', title: 'Statistical Analysis', dept: 'Statistics' },

  { code: 'ENGLISH 1109', title: 'First-Year English Composition', dept: 'English' },
  { code: 'ENGLISH 1110', title: 'First-Year English Composition', dept: 'English' },
  { code: 'ENGLISH 2201', title: 'Selected Works of English Literature', dept: 'English' },
  { code: 'ENGLISH 2220', title: 'Shakespeare', dept: 'English' },
  { code: 'ENGLISH 2260', title: 'Introduction to Poetry', dept: 'English' },
  { code: 'ENGLISH 2261', title: 'Introduction to Fiction', dept: 'English' },
  { code: 'ENGLISH 2367', title: 'Writing for the Professions', dept: 'English' },
  { code: 'ENGLISH 3301', title: 'Technical Writing', dept: 'English' },

  { code: 'HISTORY 1151', title: 'World History to 1500', dept: 'History' },
  { code: 'HISTORY 1152', title: 'World History since 1500', dept: 'History' },
  { code: 'HISTORY 1681', title: 'The Rise of American Civilization', dept: 'History' },
  { code: 'HISTORY 1682', title: 'The Making of Modern America', dept: 'History' },
  { code: 'HISTORY 2001', title: 'The Historian Craft', dept: 'History' },
  { code: 'HISTORY 2201', title: 'African American History', dept: 'History' },
  { code: 'HISTORY 2367', title: 'American History and Film', dept: 'History' },
  { code: 'HISTORY 2700', title: 'History of Ohio', dept: 'History' },

  { code: 'PSYCH 1100', title: 'Introduction to Psychology', dept: 'Psychology' },
  { code: 'PSYCH 2220', title: 'Data Analysis in Psychology', dept: 'Psychology' },
  { code: 'PSYCH 2300', title: 'Research Methods in Psychology', dept: 'Psychology' },
  { code: 'PSYCH 3310', title: 'Human Memory', dept: 'Psychology' },
  { code: 'PSYCH 3320', title: 'Social Psychology', dept: 'Psychology' },
  { code: 'PSYCH 3410', title: 'Counseling Psychology', dept: 'Psychology' },

  { code: 'ECON 2001', title: 'Principles of Microeconomics', dept: 'Economics' },
  { code: 'ECON 2002', title: 'Principles of Macroeconomics', dept: 'Economics' },
  { code: 'ECON 4001', title: 'Intermediate Microeconomic Theory', dept: 'Economics' },
  { code: 'ECON 4002', title: 'Intermediate Macroeconomic Theory', dept: 'Economics' },
  { code: 'ECON 4130', title: 'Labor Economics', dept: 'Economics' },
  { code: 'ECON 4140', title: 'Public Economics', dept: 'Economics' },

  { code: 'ENGR 1181', title: 'Fundamentals of Engineering I', dept: 'Engineering' },
  { code: 'ENGR 1182', title: 'Fundamentals of Engineering II', dept: 'Engineering' },
  { code: 'ENGR 1186', title: 'Fundamentals of Engineering Honors I', dept: 'Engineering' },
  { code: 'ENGR 1187', title: 'Fundamentals of Engineering Honors II', dept: 'Engineering' },
  { code: 'ENGR 1188', title: 'Fundamentals of Engineering Honors III', dept: 'Engineering' },

  { code: 'PHILOSOP 1100', title: 'Introduction to Philosophy', dept: 'Philosophy' },
  { code: 'PHILOSOP 1332', title: 'Ethics', dept: 'Philosophy' },
  { code: 'PHILOSOP 1500', title: 'Logic', dept: 'Philosophy' },
  { code: 'PHILOSOP 2332', title: 'Environmental Ethics', dept: 'Philosophy' },
  { code: 'PHILOSOP 2500', title: 'Symbolic Logic', dept: 'Philosophy' },

  { code: 'SOCIOL 1101', title: 'Introduction to Sociology', dept: 'Sociology' },
  { code: 'SOCIOL 2202', title: 'Social Problems', dept: 'Sociology' },
  { code: 'SOCIOL 3304', title: 'Sociology of Education', dept: 'Sociology' },

  { code: 'POLITSC 1100', title: 'Introduction to American Politics', dept: 'Political Science' },
  { code: 'POLITSC 1200', title: 'Introduction to Comparative Politics', dept: 'Political Science' },
  { code: 'POLITSC 1300', title: 'Global Politics', dept: 'Political Science' },
  { code: 'POLITSC 2300', title: 'American Foreign Policy', dept: 'Political Science' },

  { code: 'ANTHROP 1100', title: 'Introduction to Anthropology', dept: 'Anthropology' },
  { code: 'ANTHROP 2201', title: 'Peoples and Cultures of the World', dept: 'Anthropology' },
  { code: 'ANTHROP 2202', title: 'Introduction to Archaeology', dept: 'Anthropology' },

  { code: 'COMM 1100', title: 'Principles of Effective Public Speaking', dept: 'Communication' },
  { code: 'COMM 2110', title: 'Principles of Interpersonal Communication', dept: 'Communication' },
  { code: 'COMM 2367', title: 'Persuasive Communication', dept: 'Communication' },
  { code: 'COMM 3110', title: 'Communication in Organizations', dept: 'Communication' },

  { code: 'ASTRON 1101', title: 'Planets and the Solar System', dept: 'Astronomy' },
  { code: 'ASTRON 1141', title: 'The Solar System', dept: 'Astronomy' },
  { code: 'ASTRON 1142', title: 'Stars and Galaxies', dept: 'Astronomy' },

  { code: 'EARTHSC 1100', title: 'Planet Earth', dept: 'Earth Sciences' },
  { code: 'EARTHSC 1105', title: 'Geology of the National Parks', dept: 'Earth Sciences' },
  { code: 'EARTHSC 2205', title: 'Introduction to Oceanography', dept: 'Earth Sciences' },

  { code: 'ENR 2100', title: 'Introduction to Environmental Science', dept: 'Environment' },
  { code: 'ENR 2300', title: 'Society and Natural Resources', dept: 'Environment' },

  { code: 'BUSMHR 2291', title: 'Business Skills and Environment', dept: 'Business' },
  { code: 'BUSMHR 3201', title: 'Organizational Behavior', dept: 'Business' },
  { code: 'BUSMHR 4490', title: 'Strategic Management', dept: 'Business' },
  { code: 'ACCTMIS 2200', title: 'Introduction to Accounting', dept: 'Business' },
  { code: 'ACCTMIS 2300', title: 'Introduction to Managerial Accounting', dept: 'Business' },
  { code: 'MKTG 3250', title: 'Principles of Marketing', dept: 'Business' },
  { code: 'MKTG 3360', title: 'Consumer Behavior', dept: 'Business' },

  { code: 'SPANISH 1101', title: 'Spanish I', dept: 'Spanish' },
  { code: 'SPANISH 1102', title: 'Spanish II', dept: 'Spanish' },
  { code: 'SPANISH 1103', title: 'Spanish III', dept: 'Spanish' },
  { code: 'SPANISH 2201', title: 'Intermediate Spanish I', dept: 'Spanish' },
  { code: 'FRENCH 1101', title: 'French I', dept: 'French' },
  { code: 'FRENCH 1102', title: 'French II', dept: 'French' },
  { code: 'FRENCH 1103', title: 'French III', dept: 'French' },
  { code: 'GERMAN 1101', title: 'German I', dept: 'German' },
  { code: 'GERMAN 1102', title: 'German II', dept: 'German' },
  { code: 'JAPANESE 1101', title: 'Japanese I', dept: 'Japanese' },
  { code: 'JAPANESE 1102', title: 'Japanese II', dept: 'Japanese' },
  { code: 'CHINESE 1101', title: 'Chinese I', dept: 'Chinese' },
  { code: 'CHINESE 1102', title: 'Chinese II', dept: 'Chinese' },

  { code: 'MUSIC 2201', title: 'The History of Western Music I', dept: 'Music' },
  { code: 'MUSIC 2202', title: 'The History of Western Music II', dept: 'Music' },
  { code: 'MUSIC 2261', title: 'Introduction to Music in the United States', dept: 'Music' },

  { code: 'PUBHLTH 2010', title: 'Introduction to Public Health', dept: 'Public Health' },
  { code: 'PUBHLTH 3200', title: 'Health Promotion', dept: 'Public Health' },
  { code: 'NURSING 2100', title: 'Introduction to Nursing', dept: 'Nursing' },
]

const UMICH_CLASSES = [
  { code: 'MATH 115', title: 'Calculus I', dept: 'Mathematics' },
  { code: 'MATH 116', title: 'Calculus II', dept: 'Mathematics' },
  { code: 'MATH 215', title: 'Multivariable Calculus', dept: 'Mathematics' },
  { code: 'PHYSICS 140', title: 'General Physics I', dept: 'Physics' },
  { code: 'PHYSICS 240', title: 'General Physics II', dept: 'Physics' },
  { code: 'CHEM 130', title: 'General Chemistry I', dept: 'Chemistry' },
  { code: 'CHEM 210', title: 'Organic Chemistry I', dept: 'Chemistry' },
  { code: 'BIOLOGY 171', title: 'Introductory Biology', dept: 'Biology' },
  { code: 'EECS 183', title: 'Elementary Programming', dept: 'Computer Science' },
  { code: 'EECS 280', title: 'Programming and Data Structures', dept: 'Computer Science' },
  { code: 'STATS 250', title: 'Introduction to Statistics', dept: 'Statistics' },
  { code: 'ENGLISH 125', title: 'College Writing', dept: 'English' },
  { code: 'ECON 101', title: 'Principles of Economics', dept: 'Economics' },
]

const PURDUE_CLASSES = [
  { code: 'MA 16100', title: 'Plane Analytic Geometry and Calculus I', dept: 'Mathematics' },
  { code: 'MA 16200', title: 'Plane Analytic Geometry and Calculus II', dept: 'Mathematics' },
  { code: 'MA 26100', title: 'Multivariate Calculus', dept: 'Mathematics' },
  { code: 'PHYS 17200', title: 'Modern Mechanics', dept: 'Physics' },
  { code: 'PHYS 27200', title: 'Electric and Magnetic Interactions', dept: 'Physics' },
  { code: 'CHM 11500', title: 'General Chemistry', dept: 'Chemistry' },
  { code: 'CHM 25500', title: 'Organic Chemistry I', dept: 'Chemistry' },
  { code: 'BIOL 11000', title: 'Fundamentals of Biology', dept: 'Biology' },
  { code: 'CS 18000', title: 'Problem Solving and Object-Oriented Programming', dept: 'Computer Science' },
  { code: 'CS 24000', title: 'Programming in C', dept: 'Computer Science' },
  { code: 'STAT 30100', title: 'Elementary Statistical Methods', dept: 'Statistics' },
  { code: 'ENGL 10600', title: 'First-Year Composition', dept: 'English' },
]

const UIUC_CLASSES = [
  { code: 'MATH 221', title: 'Calculus I', dept: 'Mathematics' },
  { code: 'MATH 231', title: 'Calculus II', dept: 'Mathematics' },
  { code: 'MATH 241', title: 'Calculus III', dept: 'Mathematics' },
  { code: 'PHYS 211', title: 'University Physics: Mechanics', dept: 'Physics' },
  { code: 'PHYS 212', title: 'University Physics: Electricity and Magnetism', dept: 'Physics' },
  { code: 'CHEM 102', title: 'General Chemistry I', dept: 'Chemistry' },
  { code: 'CHEM 232', title: 'Elementary Organic Chemistry I', dept: 'Chemistry' },
  { code: 'IB 150', title: 'Organismal and Evolutionary Biology', dept: 'Biology' },
  { code: 'CS 124', title: 'Introduction to Computer Science I', dept: 'Computer Science' },
  { code: 'CS 225', title: 'Data Structures', dept: 'Computer Science' },
  { code: 'STAT 100', title: 'Statistics', dept: 'Statistics' },
  { code: 'RHET 105', title: 'Writing and Research', dept: 'English' },
]

const GATECH_CLASSES = [
  { code: 'MATH 1551', title: 'Differential Calculus', dept: 'Mathematics' },
  { code: 'MATH 1552', title: 'Integral Calculus', dept: 'Mathematics' },
  { code: 'MATH 2551', title: 'Multivariable Calculus', dept: 'Mathematics' },
  { code: 'PHYS 2211', title: 'Introductory Physics I', dept: 'Physics' },
  { code: 'PHYS 2212', title: 'Introductory Physics II', dept: 'Physics' },
  { code: 'CHEM 1310', title: 'General Chemistry', dept: 'Chemistry' },
  { code: 'CHEM 2311', title: 'Organic Chemistry I', dept: 'Chemistry' },
  { code: 'BIOL 1510', title: 'Biological Principles', dept: 'Biology' },
  { code: 'CS 1301', title: 'Intro to Computing', dept: 'Computer Science' },
  { code: 'CS 1332', title: 'Data Structures and Algorithms', dept: 'Computer Science' },
  { code: 'ISYE 3770', title: 'Statistics and Applications', dept: 'Statistics' },
  { code: 'ENGL 1101', title: 'English Composition I', dept: 'English' },
]

const CATALOG = {
  osu: OSU_CLASSES,
  umich: UMICH_CLASSES,
  purdue: PURDUE_CLASSES,
  uiuc: UIUC_CLASSES,
  gatech: GATECH_CLASSES,
}

export function classesForCollege(collegeId) {
  return CATALOG[collegeId] || OSU_CLASSES
}

export function findCollege(collegeId) {
  return COLLEGES.find(function (c) {
    return c.id === collegeId
  }) || COLLEGES[0]
}

export function classLabel(cls) {
  if (!cls) return ''
  return cls.code + ' - ' + cls.title
}

export function findClass(collegeId, code) {
  return classesForCollege(collegeId).find(function (c) {
    return c.code === code
  }) || null
}

export function departmentsForCollege(collegeId) {
  const seen = {}
  classesForCollege(collegeId).forEach(function (c) {
    seen[c.dept] = true
  })
  return Object.keys(seen).sort()
}
