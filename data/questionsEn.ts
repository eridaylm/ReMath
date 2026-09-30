export const questionsEn: Record<string, any> = {
  'ALJ-SMA-01': {
    question: 'The roots of the quadratic equation x² - 5x + 6 = 0 are α and β. The value of α² + β² is...',
    options: ['13', '19', '25', '31'],
    explanation: 'From x² - 5x + 6 = 0 we get α + β = 5 and αβ = 6. So α² + β² = (α + β)² - 2αβ = 5² - 2(6) = 25 - 12 = 13.',
    conceptTag: 'Quadratic Equations (High School)',
    hint: 'Use the formula for the sum and product of roots: α + β = -b/a and αβ = c/a.'
  },
  'ALJ-SMA-02': {
    question: 'Given the function f(x) = 2x - 3 and g(x) = x² + 1. The value of the composite function (g ∘ f)(2) is...',
    options: ['2', '3', '5', '7'],
    explanation: 'Calculate f(2) first: f(2) = 2(2) - 3 = 1. Then substitute into g(x): g(f(2)) = g(1) = 1² + 1 = 2.',
    conceptTag: 'Composite Functions (High School)',
    hint: 'Solve the inner function first: find f(2), then substitute the result into function g.'
  },
  'ALJ-SMA-03': {
    question: 'If the system of linear equations x + y = 7 and 2x - y = 8 is satisfied by (x, y), then the value of 2x + 3y is...',
    options: ['16', '14', '18', '12'],
    explanation: 'Add both equations: 3x = 15 ⇒ x = 5. Substitute x = 5 into x + y = 7 ⇒ y = 2. So 2x + 3y = 2(5) + 3(2) = 10 + 6 = 16.',
    conceptTag: 'Linear Equations Elimination (High School)',
    hint: 'Eliminate variable y by adding both equations.'
  },
  'ALJ-SMP-01': {
    question: 'The simplified form of the algebraic operation 3(2x - 4y) - 2(x - 5y) is...',
    options: ['4x - 2y', '4x + 2y', '4x - 22y', '8x - 2y'],
    explanation: 'Multiply into the parentheses: 6x - 12y - 2x + 10y = (6x - 2x) + (-12y + 10y) = 4x - 2y.',
    conceptTag: 'Like Terms (Middle School)',
    hint: 'Pay attention to the negative sign when multiplying -2 with -5y.'
  },
  'ALJ-SMP-02': {
    question: 'The correct factorization of x² - 9x + 20 is...',
    options: ['(x - 4)(x - 5)', '(x - 2)(x - 10)', '(x + 4)(x + 5)', '(x - 1)(x - 20)'],
    explanation: 'Find two numbers that multiply to +20 and add up to -9. The numbers are -4 and -5.',
    conceptTag: 'Quadratic Factorization (Middle School)',
    hint: 'Two negative numbers result in a positive product and a negative sum.'
  },
  'ALJ-SMP-03': {
    question: 'The solution to the linear equation 4x - 7 = 2x + 5 is...',
    options: ['x = 6', 'x = 4', 'x = 3', 'x = 8'],
    explanation: 'Move variable terms to the left: 4x - 2x = 5 + 7 ⇒ 2x = 12 ⇒ x = 6.',
    conceptTag: 'Linear Equation 1 Variable (Middle School)',
    hint: 'Group terms with variable x on the left side and constants on the right side.'
  },
  'ALJ-SD-01': {
    question: 'If n + 17 = 35, then the correct value of n is...',
    options: ['18', '16', '22', '19'],
    explanation: 'Subtract 17 from both sides: n = 35 - 17 = 18.',
    conceptTag: 'Basic Variables (Elementary)',
    hint: 'The opposite of addition is subtraction.'
  },
  'ALJ-SD-02': {
    question: 'Look at the following number pattern: 4, 8, 12, 16, ..., the 6th number is...',
    options: ['24', '20', '28', '32'],
    explanation: 'This number pattern increases by 4 in each term (multiples of 4). The 5th number = 20, and the 6th number = 24.',
    conceptTag: 'Skip Counting (Elementary)',
    hint: 'Each term increases by 4 from the previous term.'
  },
  'ALJ-SD-03': {
    question: 'Mom bought 3 bags of oranges, each containing k oranges. If there are 24 oranges in total, what is the value of k?',
    options: ['8', '6', '7', '9'],
    explanation: '3 × k = 24. So k = 24 ÷ 3 = 8.',
    conceptTag: 'Multiplication Concept (Elementary)',
    hint: 'Divide the total number of oranges by the number of bags.'
  },
  'GEO-SMA-01': {
    question: 'Given a cube ABCD.EFGH with edge length 6 cm. The distance from point A to point G (space diagonal) is...',
    options: ['6√3 cm', '6√2 cm', '12 cm', '3√3 cm'],
    explanation: 'The length of the space diagonal of a cube with edge s is s√3. Since the edge = 6 cm, then AG = 6√3 cm.',
    conceptTag: '3D Space Diagonal (High School)',
    hint: 'Face diagonal = s√2, while space diagonal = s√3.'
  },
  'GEO-SMA-02': {
    question: 'The equation of a circle centered at (2, -3) with a radius of 5 is...',
    options: ['(x - 2)² + (y + 3)² = 25', '(x + 2)² + (y - 3)² = 25', '(x - 2)² + (y - 3)² = 25', '(x - 2)² + (y + 3)² = 5'],
    explanation: 'The general form of a circle centered at (a, b) with radius r is (x - a)² + (y - b)² = r². Substituting (2, -3) and r = 5 gives: (x - 2)² + (y + 3)² = 25.',
    conceptTag: 'Circle Equation (High School)',
    hint: 'Pay attention to the sign change: y - (-3) becomes (y + 3).'
  },
  'GEO-SMA-03': {
    question: 'Point P(3, -2) is translated by T = [-1, 4], then reflected across the X-axis. The final coordinates of point P are...',
    options: ['(2, -2)', '(2, 2)', '(-2, 2)', '(4, 2)'],
    explanation: 'Translation T[-1, 4] gives P\'(3 - 1, -2 + 4) = P\'(2, 2). Reflection across the X-axis changes the sign of the y-coordinate: P\'\'(2, -2).',
    conceptTag: 'Geometric Transformation (High School)',
    hint: 'Perform the translation first (add coordinates), then reflect across the X-axis (change the sign of y).'
  },
  'GEO-SMP-01': {
    question: 'A right triangle has leg lengths of 9 cm and 12 cm. The length of the hypotenuse is...',
    options: ['15 cm', '14 cm', '16 cm', '21 cm'],
    explanation: 'By the Pythagorean theorem: c² = a² + b² = 9² + 12² = 81 + 144 = 225. Thus c = √225 = 15 cm.',
    conceptTag: 'Pythagorean Theorem (Middle School)',
    hint: 'The basic 3-4-5 Pythagorean triple multiplied by 3 becomes 9-12-15.'
  },
  'GEO-SMP-02': {
    question: 'A cylinder has a base radius of 7 cm and a height of 10 cm. The volume of the cylinder is... (use π = 22/7)',
    options: ['1,540 cm³', '1,450 cm³', '770 cm³', '2,156 cm³'],
    explanation: 'Volume of cylinder = π × r² × h = (22/7) × 7 × 7 × 10 = 22 × 7 × 10 = 1,540 cm³.',
    conceptTag: 'Curved Surface Volume (Middle School)',
    hint: 'The formula for the volume of a cylinder is the base area times the height.'
  },
  'GEO-SMP-03': {
    question: 'Two angles are supplementary. If the first angle is 65°, then the second angle is...',
    options: ['115°', '25°', '125°', '95°'],
    explanation: 'Supplementary angles add up to 180°. The second angle = 180° - 65° = 115°.',
    conceptTag: 'Angle Relationships (Middle School)',
    hint: 'Remember that supplementary angles always sum to 180° (a straight line).'
  },
  'GEO-SD-01': {
    question: 'A rectangle has a length of 14 cm and a width of 8 cm. The perimeter of the rectangle is...',
    options: ['44 cm', '112 cm', '22 cm', '56 cm'],
    explanation: 'Perimeter of rectangle = 2 × (l + w) = 2 × (14 + 8) = 2 × 22 = 44 cm.',
    conceptTag: 'Rectangle Perimeter (Elementary)',
    hint: 'The perimeter is the sum of all outer side lengths.'
  },
  'GEO-SD-02': {
    question: 'A 3D shape that has 6 congruent square faces, 12 edges of equal length, and 8 vertices is a...',
    options: ['Cube', 'Cuboid', 'Triangular Prism', 'Square Pyramid'],
    explanation: 'A cube has 6 square faces that are equal in size and shape (congruent).',
    conceptTag: 'Cube Properties (Elementary)',
    hint: 'Look for the characteristic of square faces with all edges being equal.'
  },
  'GEO-SD-03': {
    question: 'A triangle has a base of 12 cm and a height of 7 cm. The area of the triangle is...',
    options: ['42 cm²', '84 cm²', '19 cm²', '38 cm²'],
    explanation: 'Area of triangle = (base × height) ÷ 2 = (12 × 7) ÷ 2 = 84 ÷ 2 = 42 cm².',
    conceptTag: 'Triangle Area (Elementary)',
    hint: 'Do not forget to divide the product of base and height by two.'
  },
  'KAL-SMA-01': {
    question: 'The first derivative of the function f(x) = 3x⁴ - 5x² + 7x - 2 is f\'(x) = ...',
    options: ['12x³ - 10x + 7', '12x³ - 5x + 7', '7x³ - 10x + 7', '12x⁴ - 10x² + 7'],
    explanation: 'Use the power rule for derivatives d/dx [a x^n] = a · n x^(n-1). f\'(x) = 3(4)x³ - 5(2)x + 7(1) - 0 = 12x³ - 10x + 7.',
    conceptTag: 'Derivative Power Rule (High School)',
    hint: 'Multiply the coefficient by the old power, then subtract 1 from the power.'
  },
  'KAL-SMA-02': {
    question: 'The result of the indefinite integral ∫ (6x² + 4x - 1) dx is...',
    options: ['2x³ + 2x² - x + C', '3x³ + 4x² - x + C', '12x + 4 + C', '2x³ + 4x² - x + C'],
    explanation: 'Use the integral rule ∫ a x^n dx = (a/(n+1)) x^(n+1). ∫ (6x² + 4x - 1) dx = (6/3)x³ + (4/2)x² - x + C = 2x³ + 2x² - x + C.',
    conceptTag: 'Polynomial Indefinite Integral (High School)',
    hint: 'Integral is the anti-derivative; add 1 to the power then divide by the new power.'
  },
  'KAL-SMA-03': {
    question: 'The value of lim (x→3) [(x² - 9) / (x - 3)] is...',
    options: ['6', '3', '0', 'Infinity'],
    explanation: 'Factor the numerator: (x² - 9) = (x - 3)(x + 3). The limit becomes lim (x→3) (x + 3) = 3 + 3 = 6.',
    conceptTag: 'Algebraic Limits Factoring (High School)',
    hint: 'Direct substitution yields the indeterminate form 0/0, so it needs to be factored first.'
  },
  'KAL-SMP-01': {
    question: 'The gradient (slope) of the line passing through points A(1, 2) and B(4, 11) is...',
    options: ['3', '2', '4', '5'],
    explanation: 'The gradient formula m = (y₂ - y₁) / (x₂ - x₁) = (11 - 2) / (4 - 1) = 9 / 3 = 3.',
    conceptTag: 'Straight Line Gradient (Middle School)',
    hint: 'Slope is the change in y divided by the change in x (average rate of change).'
  },
  'KAL-SMP-02': {
    question: 'Given the linear function f(x) = 4x - 5. If f(a) = 11, then the value of a is...',
    options: ['4', '3', '5', '6'],
    explanation: 'Substitute f(a) = 4a - 5 = 11 ⇒ 4a = 16 ⇒ a = 4.',
    conceptTag: 'Linear Function Value (Middle School)',
    hint: 'Set up an algebraic equation from the output value f(a) = 11.'
  },
  'KAL-SMP-03': {
    question: 'A car travels at a constant speed, covering a distance of 180 km in 3 hours. The rate of change of distance with respect to time (speed) is...',
    options: ['60 km/h', '50 km/h', '90 km/h', '45 km/h'],
    explanation: 'Average speed = Distance / Time = 180 km / 3 hours = 60 km/h.',
    conceptTag: 'Constant Rate of Change (Middle School)',
    hint: 'Speed is the most fundamental form of the derivative concept.'
  },
  'KAL-SD-01': {
    question: 'A water tap fills a bucket with 2 liters of water every minute. In 8 minutes, the bucket is filled with...',
    options: ['16 liters', '10 liters', '14 liters', '18 liters'],
    explanation: 'Total volume = Filling rate × Time = 2 liters/minute × 8 minutes = 16 liters.',
    conceptTag: 'Accumulation of Rate (Elementary)',
    hint: 'Multiply the rate per minute by the total elapsed time.'
  },
  'KAL-SD-02': {
    question: 'The price of 3 notebooks is Rp12,000.00. The price of 5 identical notebooks is...',
    options: ['Rp20,000.00', 'Rp18,000.00', 'Rp24,000.00', 'Rp15,000.00'],
    explanation: 'Price of 1 book = Rp12,000 ÷ 3 = Rp4,000. So 5 books = 5 × Rp4,000 = Rp20,000.00.',
    conceptTag: 'Direct Proportion (Elementary)',
    hint: 'Find the unit price first by dividing the total price.'
  },
  'KAL-SD-03': {
    question: 'A candle is lit. Every hour its length decreases by 3 cm. If the candle was initially 20 cm long, after 4 hours its length will be...',
    options: ['8 cm', '12 cm', '7 cm', '9 cm'],
    explanation: 'Total decrease = 4 hours × 3 cm = 12 cm. Remaining length = 20 cm - 12 cm = 8 cm.',
    conceptTag: 'Constant Decrease (Elementary)',
    hint: 'Calculate the total decrease over 4 hours first.'
  },
  'STA-SMA-01': {
    question: 'The variance of the data set: 3, 5, 7, 7, 8 is...',
    options: ['3.2', '4.0', '2.8', '1.6'],
    explanation: 'Mean x̄ = (3 + 5 + 7 + 7 + 8) / 5 = 30 / 5 = 6. Sum of squared deviations: (3-6)² + (5-6)² + (7-6)² + (7-6)² + (8-6)² = 9 + 1 + 1 + 1 + 4 = 16. Variance = 16 / 5 = 3.2.',
    conceptTag: 'Variance of Ungrouped Data (High School)',
    hint: 'Find the mean first, then calculate the sum of squared differences divided by n.'
  },
  'STA-SMA-02': {
    question: 'From 8 student council candidates, 3 people will be chosen as competition delegates. The number of possible selections is...',
    options: ['56 ways', '336 ways', '24 ways', '120 ways'],
    explanation: 'Since the order does not matter, use combinations: ₈C₃ = 8! / (3! × 5!) = (8 × 7 × 6) / (3 × 2 × 1) = 56 ways.',
    conceptTag: 'Combinations (High School)',
    hint: 'Use combinations because the selection does not depend on position/order.'
  },
  'STA-SMA-03': {
    question: 'A bag contains 5 red marbles and 3 blue marbles. Two marbles are drawn one by one without replacement. The probability that both marbles are red is...',
    options: ['5/14', '25/64', '5/28', '15/56'],
    explanation: 'Probability the first is red = 5/8. Since it is not replaced, remaining red = 4 out of 7 total. Probability the second is red = 4/7. Total probability = (5/8) × (4/7) = 20/56 = 5/14.',
    conceptTag: 'Conditional Probability (High School)',
    hint: 'Note that the total number of marbles decreases by 1 on the second draw.'
  },
  'STA-SMP-01': {
    question: 'The average math test score of 9 students is 70. When a new student\'s score is included, the average becomes 72. The new student\'s score is...',
    options: ['90', '88', '92', '86'],
    explanation: 'Total score of 9 students = 9 × 70 = 630. Total score of 10 students = 10 × 72 = 720. The new student\'s score = 720 - 630 = 90.',
    conceptTag: 'Combined Mean (Middle School)',
    hint: 'Calculate the total score sum before and after the new student joined.'
  },
  'STA-SMP-02': {
    question: 'The median of the data: 7, 4, 9, 5, 8, 6, 7, 8, 9 is...',
    options: ['7', '7.5', '8', '6.5'],
    explanation: 'Sort the data: 4, 5, 6, 7, 7, 8, 8, 9, 9. There are 9 data points (odd). The median is the (9+1)/2 = 5th data point, which is 7.',
    conceptTag: 'Median (Middle School)',
    hint: 'You must sort the data from smallest to largest first.'
  },
  'STA-SMP-03': {
    question: 'A six-sided die is rolled once. The probability of getting a prime number is...',
    options: ['1/2', '1/3', '2/3', '1/6'],
    explanation: 'Sample space S = {1, 2, 3, 4, 5, 6} (n(S) = 6). Prime numbers on the die = {2, 3, 5} (n(A) = 3). Probability = 3/6 = 1/2.',
    conceptTag: 'Theoretical Probability (Middle School)',
    hint: 'The prime numbers on a die are 2, 3, and 5 (remember 1 is not a prime number).'
  },
  'STA-SD-01': {
    question: 'The data of favorite colors of 20 students: Red 5 students, Blue 8 students, Green 4 students, and Yellow 3 students. The mode of the data is...',
    options: ['Blue', 'Red', 'Green', 'Yellow'],
    explanation: 'The mode is the data that appears most frequently. The color chosen by the most students is Blue (8 students).',
    conceptTag: 'Mode (Elementary)',
    hint: 'Find the color with the highest number of students.'
  },
  'STA-SD-02': {
    question: 'Budi scored 80, 75, 90, and 85 on his first 4 tests. Budi\'s average score is...',
    options: ['82.5', '80.5', '85', '83'],
    explanation: 'Average = Total sum / number of tests = (80 + 75 + 90 + 85) / 4 = 330 / 4 = 82.5.',
    conceptTag: 'Average (Elementary)',
    hint: 'Add all scores then divide by 4.'
  },
  'STA-SD-03': {
    question: 'Look at the bar chart of book sales. Mon: 10, Tue: 15, Wed: 5, Thu: 20. The total number of books sold over 4 days is...',
    options: ['50', '45', '55', '60'],
    explanation: 'Total = 10 + 15 + 5 + 20 = 50 books.',
    conceptTag: 'Bar Chart Interpretation (Elementary)',
    hint: 'Add up the number of books sold each day.'
  }
};
