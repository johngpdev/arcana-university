import { classesForCollege } from './colleges'

export const PROFESSORS = [
  { id: 'p1', name: 'Rodriguez', dept: 'Mathematics', classes: ['MATH 1151', 'MATH 1152', 'MATH 2182H'], helped: 312, online: true },
  { id: 'p2', name: 'Alden', dept: 'Mathematics', classes: ['MATH 1151', 'MATH 1152', 'MATH 2153'], helped: 268, online: true },
  { id: 'p3', name: 'Lin', dept: 'Mathematics', classes: ['MATH 1152', 'MATH 2255', 'MATH 3345'], helped: 197, online: false },
  { id: 'p4', name: 'Hayes', dept: 'Physics', classes: ['PHYSICS 1250', 'PHYSICS 1251', 'PHYSICS 2300'], helped: 143, online: true },
  { id: 'p5', name: 'Nguyen', dept: 'Biology', classes: ['BIOLOGY 1113', 'BIOLOGY 1114', 'BIOLOGY 2100'], helped: 221, online: true },
  { id: 'p6', name: 'Chen', dept: 'Biology', classes: ['BIOLOGY 1101', 'BIOLOGY 3300'], helped: 96, online: false },
  { id: 'p7', name: 'Okafor', dept: 'Chemistry', classes: ['CHEM 1210', 'CHEM 1220', 'CHEM 2210'], helped: 188, online: true },
  { id: 'p8', name: 'Patel', dept: 'Computer Science', classes: ['CSE 2221', 'CSE 2231', 'CSE 2331'], helped: 154, online: true },
]

export const THREADS = [
  {
    id: 't-lizard',
    classCode: 'MATH 1151',
    classTitle: 'Calculus I',
    author: 'Clever Fox',
    question:
      'A lizard crosses the road at 100mph while a zebra flies perpendicular at 67mph at a height of 30 feet above the lizard. At what velocity does the lizard move away from the zebra at 30 minutes? Assume the lizard and zebra start at the same point (not including height).',
    posts: [
      {
        id: 'lz-1',
        author: 'Witty Otter',
        body: 'I am not entirely sure... have you asked Professor Rodriguez for help?',
        hearts: 3,
        role: 'student',
        depth: 0,
      },
      {
        id: 'lz-2',
        author: 'Professor Rodriguez',
        body: 'Write each velocity as a vector first. The lizard moves along x, the zebra along y at 30 feet. Distance between them is the hypotenuse, so differentiate that with respect to time.',
        hearts: 24,
        role: 'professor',
        depth: 0,
      },
      {
        id: 'lz-3',
        author: 'Brave Falcon',
        body: 'what is this, rocket science?',
        hearts: 5,
        role: 'student',
        depth: 0,
      },
      {
        id: 'lz-4',
        author: 'Sunny Wombat',
        body: 'LOL!',
        hearts: 1,
        role: 'student',
        depth: 1,
      },
      {
        id: 'lz-5',
        author: 'Steady Bison',
        body: 'u have to start with Newton First and Second laws of motion. you will be able to deduce your answer from there',
        hearts: 8,
        role: 'student',
        depth: 0,
      },
      {
        id: 'lz-6',
        author: 'Quiet Heron',
        body: 'no help for you here',
        hearts: 4,
        role: 'student',
        depth: 0,
      },
    ],
  },
  {
    id: 't-integral',
    classCode: 'MATH 1151',
    classTitle: 'Calculus I',
    author: 'Curious Osprey',
    question: 'Does anyone know how to solve the integral of 1/x?',
    posts: [
      {
        id: 'in-1',
        author: 'Professor Alden',
        body: 'The antiderivative of 1/x is ln|x| + C. You can verify it because the derivative of ln|x| is 1/x.',
        hearts: 31,
        role: 'professor',
        depth: 0,
      },
      {
        id: 'in-2',
        author: 'Gentle Raven',
        body: 'Also comes from the definition of the natural log as the integral of 1/t dt.',
        hearts: 10,
        role: 'student',
        depth: 0,
      },
      {
        id: 'in-3',
        author: 'Swift Lynx',
        body: 'That makes sense. I was only thinking of ln(x), not ln|x|.',
        hearts: 3,
        role: 'student',
        depth: 0,
      },
    ],
  },
  {
    id: 't-related-rates',
    classCode: 'MATH 1152',
    classTitle: 'Calculus II',
    author: 'Calm Badger',
    question: 'How do I approach a related rates ladder problem without plugging numbers in too early?',
    posts: [
      {
        id: 'rr-1',
        author: 'Professor Lin',
        body: 'Draw the diagram, label every length and rate, write the relation, then differentiate implicitly before substituting any values.',
        hearts: 19,
        role: 'professor',
        depth: 0,
      },
      {
        id: 'rr-2',
        author: 'Merry Panda',
        body: 'Writing down dx/dt and dy/dt as separate variables helped me a lot.',
        hearts: 7,
        role: 'student',
        depth: 0,
      },
    ],
  },
  {
    id: 't-chem',
    classCode: 'CHEM 1220',
    classTitle: 'General Chemistry II',
    author: 'Kind Wolf',
    question:
      'I am currently taking CHEM 1220 and I really need some help before my midterm this coming week. Can anyone tutor me?',
    posts: [
      {
        id: 'ch-1',
        author: 'Professor Okafor',
        body: 'Bring your practice exam to my office hours on Tuesday and we can walk through the equilibrium problems together.',
        hearts: 22,
        role: 'professor',
        depth: 0,
      },
      {
        id: 'ch-2',
        author: 'Vivid Koala',
        body: 'I can go over the practice exam with you if you want.',
        hearts: 7,
        role: 'student',
        depth: 0,
      },
    ],
  },
  {
    id: 't-honors',
    classCode: 'MATH 2182H',
    classTitle: 'Honors Calculus II',
    author: 'Lucky Tiger',
    question: 'Is anyone else taking Honors Calc 2 (2182H) this semester?',
    posts: [
      {
        id: 'hn-1',
        author: 'Noble Stag',
        body: 'Yes, section 002. The problem sets are long but the lectures are good.',
        hearts: 6,
        role: 'student',
        depth: 0,
      },
    ],
  },
  {
    id: 't-2plus2',
    classCode: 'MATH 1148',
    classTitle: 'Precalculus',
    author: 'Bold Turtle',
    question:
      'I have gotten the same wrong answer 14 times now for 2 + 2 = ? Can anyone help me? What is the answer???',
    posts: [
      {
        id: 'pp-1',
        author: 'Sharp Beetle',
        body: 'It is 4. Try counting on your fingers to double check.',
        hearts: 9,
        role: 'student',
        depth: 0,
      },
      {
        id: 'pp-2',
        author: 'Cosmic Sparrow',
        body: 'Also make sure you are not in base 3, where it would be 11.',
        hearts: 14,
        role: 'grad',
        depth: 0,
      },
    ],
  },
  {
    id: 't-photosynthesis',
    classCode: 'BIOLOGY 1113',
    classTitle: 'Biological Sciences: Energy Transfer',
    author: 'Radiant Comet',
    question:
      'What is the difference between light-dependent and light-independent reactions in photosynthesis?',
    posts: [
      {
        id: 'ph-1',
        author: 'Professor Nguyen',
        body: 'Light-dependent reactions happen in the thylakoid membranes and produce ATP and NADPH. The light-independent reactions, or Calvin cycle, happen in the stroma and use that ATP and NADPH to fix CO2 into sugar.',
        hearts: 27,
        role: 'professor',
        depth: 0,
      },
      {
        id: 'ph-2',
        author: 'Amber Lantern',
        body: 'Does the Calvin cycle need light directly?',
        hearts: 4,
        role: 'student',
        depth: 0,
      },
      {
        id: 'ph-3',
        author: 'Silent Quill',
        body: 'No, it uses the products of the light reactions, so it stops once ATP and NADPH run out.',
        hearts: 11,
        role: 'student',
        depth: 1,
      },
      {
        id: 'ph-4',
        author: 'Wandering Ember',
        body: 'O2 is released in the light-dependent stage from splitting water.',
        hearts: 9,
        role: 'student',
        depth: 0,
      },
    ],
  },
  {
    id: 't-recursion',
    classCode: 'CSE 2331',
    classTitle: 'Foundations II: Data Structures',
    author: 'Crafty Cipher',
    question: 'Why does my recursive binary search overflow the stack on large arrays?',
    posts: [
      {
        id: 'rc-1',
        author: 'Professor Patel',
        body: 'Each recursive call adds a stack frame. For very large inputs convert it to an iterative loop, or make the recursive call a tail call.',
        hearts: 17,
        role: 'professor',
        depth: 0,
      },
      {
        id: 'rc-2',
        author: 'Sunny Otter',
        body: 'Also check your base case, an off by one there causes infinite recursion.',
        hearts: 6,
        role: 'student',
        depth: 0,
      },
    ],
  },
]

const SEED_EXTRA = [
  {
    code: 'MATH 1151', title: 'Calculus I', author: 'Curious Osprey',
    question: 'Why does the limit definition of a derivative have h in the denominator?',
    replies: [
      ['Professor Alden', 'h is the gap between your two points. Dividing by h is literally slope, and as h shrinks the secant line becomes the tangent.', 21, 'professor'],
      ['Gentle Raven', 'Thinking of it as rise over run where the run is h made it click for me.', 6, 'student'],
    ],
  },
  {
    code: 'MATH 1151', title: 'Calculus I', author: 'Swift Lynx',
    question: 'Why does the chain rule feel backwards when functions are nested?',
    replies: [
      ['Professor Alden', 'You differentiate outside first, then multiply by the inside derivative. It feels backwards because you read the function inside out.', 18, 'professor'],
      ['Strong Octopus', 'Writing f(g(x)) with colored brackets helped me track which layer I was on.', 4, 'student'],
    ],
  },
  {
    code: 'MATH 1152', title: 'Calculus II', author: 'Merry Panda',
    question: 'How do I know when a series converges with the ratio test?',
    replies: [
      ['Professor Lin', 'Take the limit of the ratio of consecutive terms. Below 1 converges absolutely, above 1 diverges, and exactly 1 tells you nothing.', 24, 'professor'],
      ['Calm Badger', 'The inconclusive case is where I always lost points. It really does mean try another test.', 8, 'student'],
    ],
  },
  {
    code: 'MATH 1152', title: 'Calculus II', author: 'Vivid Koala',
    question: 'When should I use integration by parts instead of substitution?',
    replies: [
      ['Professor Lin', 'Use parts when the integrand is a product of unlike functions, like x times e to the x. Substitution is for a function and its own derivative.', 19, 'professor'],
    ],
  },
  {
    code: 'MATH 2153', title: 'Calculus III', author: 'Bold Turtle',
    question: 'How do I set the bounds for a double integral over a triangular region?',
    replies: [
      ['Professor Alden', 'Sketch the region first. Pick an outer variable with constant limits, then the inner variable limits become functions of it.', 16, 'professor'],
      ['Noble Stag', 'Drawing the region is not optional, I learned that the hard way.', 5, 'student'],
    ],
  },
  {
    code: 'MATH 2162', title: 'Linear Algebra', author: 'Silent Quill',
    question: 'What does an eigenvector actually mean geometrically?',
    replies: [
      ['Professor Lin', 'It is a direction that the transformation does not rotate, it only stretches or flips it. The eigenvalue is how much.', 27, 'professor'],
      ['Sharp Beetle', 'So the matrix only scales that line. That is a much better mental model.', 9, 'student'],
    ],
  },
  {
    code: 'MATH 2255', title: 'Differential Equations', author: 'Amber Lantern',
    question: 'How do I separate variables in a first order differential equation?',
    replies: [
      ['Professor Lin', 'Move every y term to one side and every x term to the other, then integrate both sides and solve for the constant.', 14, 'professor'],
    ],
  },
  {
    code: 'MATH 3345', title: 'Foundations of Higher Mathematics', author: 'Crafty Cipher',
    question: 'How do I write a proof by contradiction properly?',
    replies: [
      ['Grader Williams', 'Assume the negation of what you want, derive a statement that contradicts a known fact, then point out the contradiction explicitly.', 12, 'grad'],
    ],
  },
  {
    code: 'PHYSICS 1250', title: 'Mechanics and Thermal Physics', author: 'Radiant Comet',
    question: 'Why do Newton third law pairs not cancel out if they are equal and opposite?',
    replies: [
      ['Professor Hayes', 'They act on different objects. Cancellation only applies to forces on the same object.', 23, 'professor'],
      ['Witty Otter', 'That one sentence fixed three chapters for me.', 11, 'student'],
    ],
  },
  {
    code: 'PHYSICS 1250', title: 'Mechanics and Thermal Physics', author: 'Sunny Wombat',
    question: 'Work energy theorem versus kinematics, which should I use?',
    replies: [
      ['Professor Hayes', 'If the question gives forces and distances, energy is usually faster. If it gives times, kinematics is usually faster.', 17, 'professor'],
    ],
  },
  {
    code: 'PHYSICS 1251', title: 'Electricity, Magnetism and Optics', author: 'Bold Turtle',
    question: 'When do I use Gauss law instead of Coulomb law?',
    replies: [
      ['Professor Hayes', 'Gauss law shines when the charge distribution has symmetry, like a sphere, cylinder, or infinite sheet. Otherwise integrate Coulomb contributions.', 20, 'professor'],
    ],
  },
  {
    code: 'PHYSICS 2300', title: 'Modern Physics', author: 'Noble Stag',
    question: 'Why does the photoelectric effect need a threshold frequency?',
    replies: [
      ['Professor Hayes', 'Light delivers energy in discrete packets. Below the work function, one photon simply cannot free an electron no matter how many arrive.', 22, 'professor'],
    ],
  },
  {
    code: 'CHEM 1210', title: 'General Chemistry I', author: 'Lucky Tiger',
    question: 'How do I find the limiting reagent quickly?',
    replies: [
      ['Professor Okafor', 'Convert both reactants to moles, divide each by its stoichiometric coefficient, and the smaller number is limiting.', 25, 'professor'],
      ['Vivid Koala', 'Doing that division step is what I kept skipping.', 6, 'student'],
    ],
  },
  {
    code: 'CHEM 1220', title: 'General Chemistry II', author: 'Kind Wolf',
    question: 'How does pressure shift equilibrium in the Haber process?',
    replies: [
      ['Professor Okafor', 'Increasing pressure favors the side with fewer gas moles, which is the ammonia side here.', 18, 'professor'],
    ],
  },
  {
    code: 'CHEM 2210', title: 'Organic Chemistry I', author: 'Quiet Heron',
    question: 'How do I decide between SN1 and SN2 for a secondary alkyl halide?',
    replies: [
      ['Professor Okafor', 'Secondary is genuinely borderline. Look at the nucleophile strength and the solvent: strong nucleophile and polar aprotic pushes SN2, weak nucleophile and polar protic pushes SN1.', 29, 'professor'],
      ['Cosmic Sparrow', 'Our TA said memorize the extremes, reason through the middle. That helped.', 10, 'grad'],
    ],
  },
  {
    code: 'BIOLOGY 1113', title: 'Biological Sciences: Energy Transfer', author: 'Wandering Ember',
    question: 'How are cellular respiration and photosynthesis basically reverse processes?',
    replies: [
      ['Professor Nguyen', 'Photosynthesis stores energy from light in glucose and releases oxygen. Respiration breaks glucose down and releases that energy, consuming oxygen.', 26, 'professor'],
    ],
  },
  {
    code: 'BIOLOGY 1114', title: 'Biological Sciences: Form and Function', author: 'Amber Lantern',
    question: 'What is the real difference between osmosis and diffusion?',
    replies: [
      ['Professor Nguyen', 'Osmosis is specifically water moving across a semipermeable membrane. Diffusion is any particle moving down its gradient.', 15, 'professor'],
    ],
  },
  {
    code: 'BIOLOGY 2100', title: 'Genetics', author: 'Brave Falcon',
    question: 'How do I set up a dihybrid Punnett square without losing track?',
    replies: [
      ['Professor Chen', 'Write the four gamete combinations for each parent along the edges, then fill the grid. Never combine alleles from the same gene in one gamete.', 13, 'professor'],
    ],
  },
  {
    code: 'CSE 1222', title: 'Introduction to Computer Programming', author: 'Sharp Beetle',
    question: 'When should I use a while loop instead of a for loop?',
    replies: [
      ['Professor Patel', 'Use for when you know how many iterations, while when you are waiting for a condition to change. Either can emulate the other.', 16, 'professor'],
    ],
  },
  {
    code: 'CSE 2221', title: 'Software I: Software Components', author: 'Crafty Cipher',
    question: 'What is the difference between an interface and an abstract class?',
    replies: [
      ['Professor Patel', 'An interface is a contract with no state, an abstract class can carry shared state and partial implementation. Java lets you implement many interfaces but extend one class.', 21, 'professor'],
    ],
  },
  {
    code: 'CSE 2331', title: 'Foundations II: Data Structures', author: 'Sunny Otter',
    question: 'How do I work out the big O of a nested loop?',
    replies: [
      ['Professor Patel', 'Multiply the bounds. Two nested loops over n give n squared. A loop that halves its counter each time gives log n.', 19, 'professor'],
      ['Steady Bison', 'The halving one always tricks me.', 3, 'student'],
    ],
  },
  {
    code: 'CSE 2421', title: 'Systems I: Computer Organization', author: 'Merry Panda',
    question: 'Why does array order matter for cache performance?',
    replies: [
      ['Professor Patel', 'Caches load whole lines, so touching memory in the order it is stored reuses each line instead of evicting it constantly.', 14, 'professor'],
    ],
  },
  {
    code: 'CSE 3241', title: 'Introduction to Databases', author: 'Silent Quill',
    question: 'When do I use a left join instead of an inner join?',
    replies: [
      ['Professor Patel', 'Left join keeps every row from the left table even when there is no match on the right, filling nulls. Inner join drops unmatched rows.', 17, 'professor'],
    ],
  },
  {
    code: 'STAT 1450', title: 'Introduction to the Practice of Statistics', author: 'Bold Turtle',
    question: 'How do I actually interpret a p-value?',
    replies: [
      ['Grader Williams', 'It is the probability of seeing data this extreme if the null hypothesis were true. It is not the probability that the null is true.', 23, 'grad'],
      ['Witty Otter', 'That distinction came up on our quiz twice.', 5, 'student'],
    ],
  },
  {
    code: 'STAT 3201', title: 'Introduction to Probability', author: 'Noble Stag',
    question: 'How do I compute expected value for a discrete distribution?',
    replies: [
      ['Grader Williams', 'Multiply each outcome by its probability and add them up. Think of it as a probability weighted average.', 15, 'grad'],
    ],
  },
  {
    code: 'ECON 2001', title: 'Principles of Microeconomics', author: 'Kind Wolf',
    question: 'Why is demand elastic at high prices and inelastic at low prices?',
    replies: [
      ['Cosmic Sparrow', 'At high prices a small percentage change is a large dollar change, so people respond more. At low prices the same percentage barely moves the total.', 11, 'grad'],
    ],
  },
  {
    code: 'ECON 2002', title: 'Principles of Macroeconomics', author: 'Lucky Tiger',
    question: 'Why can inflation and unemployment move in opposite directions?',
    replies: [
      ['Grader Williams', 'The short run Phillips curve captures that tradeoff, but it weakens in the long run once expectations adjust.', 13, 'grad'],
    ],
  },
  {
    code: 'ENGLISH 1110', title: 'First-Year English Composition', author: 'Radiant Comet',
    question: 'How specific should a thesis statement be?',
    replies: [
      ['Sunny Wombat', 'Specific enough that someone could disagree with it. If nobody could argue the opposite, it is a summary, not a thesis.', 12, 'student'],
    ],
  },
  {
    code: 'PSYCH 1100', title: 'Introduction to Psychology', author: 'Quiet Heron',
    question: 'What is the difference between classical and operant conditioning?',
    replies: [
      ['Vivid Koala', 'Classical pairs a neutral stimulus with a reflex. Operant shapes behavior with consequences like rewards and punishments.', 10, 'student'],
    ],
  },
  {
    code: 'ASTRON 1141', title: 'The Solar System', author: 'Swift Lynx',
    question: 'Why are planetary orbits elliptical instead of circular?',
    replies: [
      ['Amber Lantern', 'Circular orbits are just the special case of an ellipse with zero eccentricity. Real orbits have some eccentricity from how they formed and from gravitational nudges.', 9, 'student'],
    ],
  },
  {
    code: 'ENGR 1181', title: 'Fundamentals of Engineering I', author: 'Steady Bison',
    question: 'Why is MATLAB indexing one based instead of zero based?',
    replies: [
      ['Crafty Cipher', 'MATLAB was built for matrix math, where one based indexing matches how mathematicians write vectors and matrices.', 8, 'student'],
    ],
  },
  {
    code: 'SPANISH 1101', title: 'Spanish I', author: 'Brave Falcon',
    question: 'How do I remember when to use ser versus estar?',
    replies: [
      ['Sunny Otter', 'Ser for identity and inherent traits, estar for states and locations. If it could change by tomorrow, it is probably estar.', 14, 'student'],
    ],
  },
]

SEED_EXTRA.forEach(function (row, index) {
  THREADS.push({
    id: 't-seed-' + index,
    classCode: row.code,
    classTitle: row.title,
    author: row.author,
    question: row.question,
    posts: row.replies.map(function (r, j) {
      return {
        id: 'ts' + index + 'p' + j,
        author: r[0],
        body: r[1],
        hearts: r[2],
        role: r[3],
        depth: 0,
      }
    }),
  })
})

const SEED_MORE = [
  {
    code: 'HISTORY 1151', title: 'World History to 1500', author: 'Noble Stag',
    question: 'How do I remember all the dates for the midterm without cramming?',
    replies: [
      ['Silent Quill', 'Build a timeline around cause and effect instead of memorizing isolated years. If you know why something followed something else, the dates stick.', 14, 'student'],
      ['Cosmic Sparrow', 'Our TA suggested grouping by century and theme. That cut the list in half.', 6, 'grad'],
    ],
  },
  {
    code: 'PHILOSOPH 1500', title: 'Logic', author: 'Crafty Cipher',
    question: 'What is the difference between a valid and a sound argument?',
    replies: [
      ['Grader Williams', 'Valid means the conclusion must follow if the premises are true. Sound means it is valid and the premises actually are true.', 22, 'grad'],
      ['Amber Lantern', 'So a valid argument can still be sound-free if a premise is false. That framing helped.', 5, 'student'],
    ],
  },
  {
    code: 'SOCIOL 1101', title: 'Introduction to Sociology', author: 'Gentle Raven',
    question: 'How do I apply the sociological imagination to a news story?',
    replies: [
      ['Sunny Wombat', 'Connect the personal trouble to a public pattern. Ask what institutions and structures made that individual outcome likely.', 12, 'student'],
    ],
  },
  {
    code: 'POLITSC 1100', title: 'Introduction to American Politics', author: 'Bold Turtle',
    question: 'How does the electoral college actually work?',
    replies: [
      ['Swift Lynx', 'Each state gets electors equal to its House seats plus two senators. Almost all states are winner take all, so the national popular vote is not the deciding number.', 17, 'student'],
    ],
  },
  {
    code: 'ANTHROP 1100', title: 'Introduction to Anthropology', author: 'Merry Panda',
    question: 'What is the difference between ethnography and archaeology?',
    replies: [
      ['Kind Wolf', 'Ethnography studies living people through fieldwork and interviews. Archaeology reconstructs past societies from material remains.', 11, 'student'],
    ],
  },
  {
    code: 'COMM 1100', title: 'Principles of Effective Public Speaking', author: 'Vivid Koala',
    question: 'How do I deal with public speaking anxiety before a speech?',
    replies: [
      ['Lucky Tiger', 'Practice the first thirty seconds until it is automatic. Most of the fear is in the opening, and once that is smooth the rest follows.', 15, 'student'],
      ['Professor Nguyen', 'Also reframe the nerves as energy rather than fear. Physiologically they are almost identical.', 19, 'professor'],
    ],
  },
  {
    code: 'EARTHSC 1100', title: 'Planet Earth', author: 'Radiant Comet',
    question: 'Why do tectonic plates actually move?',
    replies: [
      ['Sharp Beetle', 'Mantle convection and slab pull. Dense subducting plates drag the rest of the plate along, which is the biggest single driver.', 13, 'student'],
    ],
  },
  {
    code: 'ENR 2100', title: 'Introduction to Environmental Science', author: 'Quiet Heron',
    question: 'How do carbon sinks actually work?',
    replies: [
      ['Witty Otter', 'Oceans absorb carbon by dissolving it and through biological uptake, and forests store it in biomass and soil. Both are finite and can reverse.', 12, 'student'],
    ],
  },
  {
    code: 'BUSMHR 3201', title: 'Organizational Behavior', author: 'Steady Bison',
    question: 'What is the real difference between leadership and management?',
    replies: [
      ['Cosmic Sparrow', 'Management reduces uncertainty through planning and control. Leadership creates direction and commitment. Most roles need both.', 14, 'grad'],
    ],
  },
  {
    code: 'FRENCH 1101', title: 'French I', author: 'Sunny Otter',
    question: 'How do I know when to use the passe compose?',
    replies: [
      ['Brave Falcon', 'Use it for completed actions in the past. If the action is ongoing or habitual in the past, that is the imperfect instead.', 9, 'student'],
    ],
  },
  {
    code: 'GERMAN 1102', title: 'German II', author: 'Lucky Tiger',
    question: 'How do I remember der, die and das for new nouns?',
    replies: [
      ['Noble Stag', 'Always learn the article with the noun, never the noun alone. Endings and categories help, but memorizing the pair is the reliable method.', 10, 'student'],
    ],
  },
  {
    code: 'JAPANESE 1101', title: 'Japanese I', author: 'Wandering Ember',
    question: 'How do I learn hiragana quickly without forgetting it?',
    replies: [
      ['Amber Lantern', 'Write them by hand daily for a week and read simple words you already know. Recognition plus production together is what makes them stick.', 11, 'student'],
    ],
  },
  {
    code: 'CHINESE 1101', title: 'Chinese I', author: 'Crafty Cipher',
    question: 'How do tones change in connected speech?',
    replies: [
      ['Calm Badger', 'Third tones in a row change before another third tone, and neutral tones flatten the following syllable. Learn the sandhi rules as pairs, not single syllables.', 8, 'student'],
    ],
  },
  {
    code: 'MUSIC 2201', title: 'The History of Western Music I', author: 'Silent Quill',
    question: 'What should I listen for in a Baroque concerto?',
    replies: [
      ['Radiant Comet', 'Listen for the ritornello returning in different keys, and how the soloist decorates it each time. That contrast is the whole form.', 9, 'student'],
    ],
  },
  {
    code: 'PUBHLTH 2010', title: 'Introduction to Public Health', author: 'Bold Turtle',
    question: 'What is the difference between incidence and prevalence?',
    replies: [
      ['Kind Wolf', 'Incidence is new cases over a period. Prevalence is all existing cases at a point in time. Prevalence rises when people live longer with a condition.', 16, 'student'],
    ],
  },
  {
    code: 'NURSING 2100', title: 'Introduction to Nursing', author: 'Merry Panda',
    question: 'How do I write better clinical notes?',
    replies: [
      ['Professor Nguyen', 'Use a consistent framework like SOAP, keep objective observations separate from interpretation, and chart in real time rather than from memory.', 12, 'professor'],
    ],
  },
]

SEED_MORE.forEach(function (row, index) {
  THREADS.push({
    id: 't-seed-more-' + index,
    classCode: row.code,
    classTitle: row.title,
    author: row.author,
    question: row.question,
    posts: row.replies.map(function (r, j) {
      return {
        id: 'tm' + index + 'p' + j,
        author: r[0],
        body: r[1],
        hearts: r[2],
        role: r[3],
        depth: 0,
      }
    }),
  })
})

const extraThreads = []

export function addThread(thread) {
  extraThreads.unshift(thread)
}

export function getAllThreads() {
  return extraThreads.concat(THREADS)
}

export function findThread(id) {
  return getAllThreads().find(function (t) {
    return t.id === id
  }) || null
}

const KEYWORD_CLASSES = [
  { code: 'MATH 1151', words: ['integral', 'derivative', 'limit', 'lizard', 'zebra'] },
  { code: 'MATH 1152', words: ['related rates', 'ladder', 'series', 'sequence'] },
  { code: 'MATH 2182H', words: ['honors calc'] },
  { code: 'PHYSICS 1250', words: ['physics', 'velocity', 'newton', 'kinematics', 'force'] },
  { code: 'CHEM 1220', words: ['chem', 'equilibrium', 'acid', 'mole', 'titration'] },
  { code: 'BIOLOGY 1113', words: ['photosynthesis', 'biology', 'cell', 'calvin', 'enzyme'] },
  { code: 'CSE 2331', words: ['recursion', 'data structure', 'binary search', 'code', 'program'] },
]

export function detectClass(prompt, classCode, collegeId) {
  const pool = classesForCollege(collegeId)

  if (classCode) {
    const picked = pool.find(function (c) {
      return c.code === classCode
    })
    if (picked) return picked
  }

  const text = (prompt || '').toLowerCase()
  for (let i = 0; i < KEYWORD_CLASSES.length; i++) {
    const entry = KEYWORD_CLASSES[i]
    for (let j = 0; j < entry.words.length; j++) {
      if (text.indexOf(entry.words[j]) !== -1) {
        const found = pool.find(function (c) {
          return c.code === entry.code
        })
        if (found) return found
      }
    }
  }

  return pool.find(function (c) {
    return c.code === 'MATH 1151'
  }) || pool[0]
}

export function professorsForClass(cls) {
  if (!cls) return PROFESSORS.slice(0, 3)
  const direct = PROFESSORS.filter(function (p) {
    return p.classes.indexOf(cls.code) !== -1
  })
  if (direct.length > 0) return direct

  const byDept = PROFESSORS.filter(function (p) {
    return p.dept === cls.dept
  })
  if (byDept.length > 0) return byDept

  return PROFESSORS.slice(0, 3)
}

export function threadsForClass(cls) {
  if (!cls) return THREADS
  const direct = THREADS.filter(function (t) {
    return t.classCode === cls.code
  })
  if (direct.length > 0) return direct

  const loose = THREADS.filter(function (t) {
    return t.classTitle === cls.title
  })
  if (loose.length > 0) return loose

  return THREADS
}

export function searchThreads(threads, query) {
  const q = (query || '').trim().toLowerCase()
  if (!q) return threads
  return threads.filter(function (t) {
    const haystack = (
      t.question +
      ' ' +
      t.classCode +
      ' ' +
      t.classTitle +
      ' ' +
      t.author +
      ' ' +
      t.posts
        .map(function (p) {
          return p.body + ' ' + p.author
        })
        .join(' ')
    ).toLowerCase()
    return haystack.indexOf(q) !== -1
  })
}

export function searchClasses(classes, query) {
  const q = (query || '').trim().toLowerCase()
  if (!q) return classes
  return classes.filter(function (c) {
    return (c.code + ' ' + c.title + ' ' + c.dept).toLowerCase().indexOf(q) !== -1
  })
}
