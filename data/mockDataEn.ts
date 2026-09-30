import { MasteryStatus, SubTopic } from '@/types';

export const ROOT_CAUSE_MAP_EN: Record<SubTopic, Record<MasteryStatus, { title: string; description: string; missingPrerequisite: string; modules: string[] }>> = {
  Aljabar: {
    SMA_MASTERED: {
      title: 'Very Strong High School Algebra Conceptual Understanding',
      description: 'Student has mastered composite functions, linear equation systems, and quadratic root characteristics with sharp analytical thinking.',
      missingPrerequisite: 'No significant gaps.',
      modules: ['Olympiad Algebra Enrichment', 'Advanced Matrices & Transformations']
    },
    SMP_FOUNDATIONAL: {
      title: 'Difficulty with Complex High School Modeling Rooted in Abstract Algebra Manipulation',
      description: 'Student understands basic middle school algebraic operations, but struggles when variables are combined in quadratic functions or multi-level composite forms.',
      missingPrerequisite: 'Perfect square factorization and function discriminant analysis.',
      modules: ['Complete SMP Factorization Review', 'SMA Quadratic Function Transition', 'Symbolic Manipulation Practice']
    },
    SD_FOUNDATIONAL: {
      title: 'Algebra Hurdle Rooted in Middle School Equation Logic',
      description: 'Student masters basic elementary variable operations, but hesitates when transposing negative signs and operating on unlike terms.',
      missingPrerequisite: 'Concept of value equality in one-variable equations and distributive property of algebraic multiplication.',
      modules: ['Foundation of One-Variable Linear Equations', 'Mastery of Algebraic Distributive Property', 'Value Balance Visualization']
    },
    BASIC_REMEDIAL: {
      title: 'Elementary Arithmetic Numeracy and Symbolic Foundation Needs Building',
      description: 'Student feels overwhelmed by high school algebra because the concepts of number patterns and variables as placeholders are not intuitively internalized.',
      missingPrerequisite: 'Basic number multiple patterns and meaning of letter symbols as number placeholders.',
      modules: ['SD Number Pattern Logic Remedial', 'Intro to Intuitive Letter Placeholders', 'Step-by-Step Arithmetic Practice']
    }
  },
  Geometri: {
    SMA_MASTERED: {
      title: 'Excellent 3D Spatial and Analytical Skills',
      description: 'Visualization of point projections onto planes and formulation of circle equations are comprehensively mastered.',
      missingPrerequisite: 'No gaps.',
      modules: ['Advanced R3 Space Vectors', 'Analytic Conic Sections']
    },
    SMP_FOUNDATIONAL: {
      title: '3D Geometry Hurdle Rooted in Weak 3D Pythagorean Concepts',
      description: 'Student memorizes middle school plane formulas, but cannot yet abstract right triangles within a cube/block space.',
      missingPrerequisite: 'Right-angle line projection in space and unfolding 3D shapes into 2D nets.',
      modules: ['Applied Pythagorean Triple Exploration', 'Digital Space Frame Construction', 'Distance from Point to Line']
    },
    SD_FOUNDATIONAL: {
      title: 'Geometry Hurdle Rooted in Middle School Area & Volume Concepts',
      description: 'Student understands elementary perimeters and planes, but has not linked length dimensions to volume capacity.',
      missingPrerequisite: 'Relationship between base area and prism/cylinder height, and angle relationship formulas.',
      modules: ['Flat-Sided 3D Shapes Foundation', 'Supplementary & Alternate Angles Concepts', 'Surface Area Visualization']
    },
    BASIC_REMEDIAL: {
      title: 'Understanding of Plane Properties and Dimension Units Needs Guidance',
      description: 'Student has not intuitively distinguished between 1D (perimeter), 2D (area), and 3D (volume) measurements.',
      missingPrerequisite: 'Recognition of geometric shape characteristics and basic elementary length measurement.',
      modules: ['Basic Plane Shape Exploration', 'Perimeter Measurement via Concrete Objects', 'Standard Units Practice']
    }
  },
  Kalkulus: {
    SMA_MASTERED: {
      title: 'Very Mature Intuition of Rate of Change and Accumulation',
      description: 'Proficient in applying polynomial derivative rules and integral anti-derivatives with a solid foundation in limits.',
      missingPrerequisite: 'No prerequisite issues.',
      modules: ['Extreme Derivatives & Optimization Applications', 'Substitution & Partial Integration Methods']
    },
    SMP_FOUNDATIONAL: {
      title: 'Calculus Chain Rule Difficulty Rooted in Gradient & Graph Understanding',
      description: 'Student can calculate simple linear functions, but does not yet see the derivative f\'(x) as the instantaneous tangent gradient.',
      missingPrerequisite: 'Physical and geometric meaning of line slope (Δy/Δx) and algebraic limit fraction manipulation.',
      modules: ['Dissecting Dynamic Tangent Gradients', 'Factoring Techniques for 0/0 Indeterminate Forms', 'Average Rate of Change Concept']
    },
    SD_FOUNDATIONAL: {
      title: 'Difficulty Grasping Derivatives Rooted in Elementary Rate & Ratio Concepts',
      description: 'The concept of speed as the rate of change of distance over time is not understood as a ratio per unit time.',
      missingPrerequisite: 'Proportional reasoning and unit rate.',
      modules: ['Understanding Ratio and Unit Rate', 'Simple Motion Graphs', 'Changing Variables Foundation']
    },
    BASIC_REMEDIAL: {
      title: 'Needs Strengthening in Proportional Addition & Subtraction Concepts',
      description: 'Student needs real visual analogies of how a value increases or shrinks regularly over time.',
      missingPrerequisite: 'Relationship of multiplication as accumulation of repeated addition.',
      modules: ['Concrete Addition Accumulation Patterns', 'Faucet & Container Filling Analogy', 'Simple Rate Arithmetic']
    }
  },
  Statistika: {
    SMA_MASTERED: {
      title: 'Excellent Probabilistic Thinking and Data Distribution Analysis',
      description: 'Student can calculate variability measures (variance/standard deviation) and complex compound probability combinations with high accuracy.',
      missingPrerequisite: 'No gaps.',
      modules: ['Normal Probability Distribution', 'Statistical Inference & Hypothesis Testing']
    },
    SMP_FOUNDATIONAL: {
      title: 'Spread Measure Difficulty Rooted in Middle School Weighted Average Concepts',
      description: 'Student can calculate simple single averages, but is confused by frequency weighting and sample combination concepts.',
      missingPrerequisite: 'Total summation of frequency values and logic of grouped data medians.',
      modules: ['Mastery of Combined Averages', 'Logic of Two-Event Sample Spaces', 'Patterned Variance Practice']
    },
    SD_FOUNDATIONAL: {
      title: 'Probability Hurdle Rooted in Table Reading & Fraction Proportions',
      description: 'Student understands mode data directly, but struggles to express event probability as a fraction n(A)/n(S).',
      missingPrerequisite: 'Converting data frequency into a fractional representation of the total.',
      modules: ['Data Representation as Fractions', 'Critical Chart Reading', 'Simple Experimental Probability']
    },
    BASIC_REMEDIAL: {
      title: 'Object Grouping and Frequency Counting Need Strengthening',
      description: 'Needs guidance in reading visual table data and counting total observations before moving to average concepts.',
      missingPrerequisite: 'Tally data recording and equal cake sharing division operations.',
      modules: ['Calculating Averages via Concrete Object Division', 'Tally Recording & Bar Charts', 'Mode Concept']
    }
  },
  Aritmatika: {
    SMA_MASTERED: {
      title: 'Very Fluent Exponential and Financial Number Literacy',
      description: 'Thoroughly masters convergent infinite series concepts, logarithm laws, and compound interest modeling.',
      missingPrerequisite: 'None.',
      modules: ['Logarithm Applications: Richter Scale & pH', 'Annuities & Loan Amortization']
    },
    SMP_FOUNDATIONAL: {
      title: 'High School Exponential Hurdle Rooted in Middle School Exponent Properties',
      description: 'Student understands basic arithmetic series, but is still confused applying negative and fractional exponent properties to logarithms.',
      missingPrerequisite: 'Exponent multiplication properties a^m·a^n and constant difference series addition rules.',
      modules: ['Mastery of Middle School Exponent Properties', 'Bridge from Exponents to Logarithms', 'Social Arithmetic Percentages']
    },
    SD_FOUNDATIONAL: {
      title: 'Number Sequence Hurdle Rooted in Elementary Fractions & LCM',
      description: 'Student can calculate integers, but slows down significantly when series or ratio questions involve different denominator fractions.',
      missingPrerequisite: 'Least Common Multiple (LCM) for equating fraction denominators.',
      modules: ['Mastery of Different Denominator Fractions', 'Factor Tree Method for GCD & LCM', 'Mixed Arithmetic Operations Sequence']
    },
    BASIC_REMEDIAL: {
      title: 'Mixed Arithmetic Operations (BODMAS) Foundation Must Be Fixed',
      description: 'Student often makes operation order mistakes (calculating addition before multiplication) and basic multiplication errors.',
      missingPrerequisite: 'Basic arithmetic operation hierarchy and 1-10 multiplication tables.',
      modules: ['Interactive BODMAS Hierarchy Rules', 'Multiplication Table Automation Strengthening', 'Guided Word Problem Practice']
    }
  }
};
