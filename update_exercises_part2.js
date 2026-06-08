const fs = require('fs');
const content = fs.readFileSync('src/data/course-exercises.tsx', 'utf8');

const additionalExercises = `
      {
        id: "serie1-ex3",
        title: "Exercise 3: Voltage Divider Theorem",
        problem: (
          <div className="space-y-4">
            <p>Using the Voltage Divider Theorem:</p>
            <ul className="list-disc list-inside">
               <li>Determine <Latex>{\`$U_{BM}$\`}</Latex> as a function of <Latex>{\`$U_{AM}$\`}</Latex>.</li>
               <li>Determine <Latex>{\`$U_{AM}$\`}</Latex>, then <Latex>{\`$U_{BM}$\`}</Latex>, as a function of <Latex>{\`$E$\`}</Latex>.</li>
            </ul>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
            <p>By the Voltage Divider rule for two resistors <Latex>{\`$R_1$\`}</Latex> and <Latex>{\`$R_2$\`}</Latex> in series under voltage <Latex>{\`$E$\`}</Latex>:</p>
            <p><Latex>{\`$$ U_{AM} = E \\\\frac{R_1}{R_1 + R_2} $$\`}</Latex></p>
            <p><Latex>{\`$$ U_{BM} = E \\\\frac{R_2}{R_1 + R_2} $$\`}</Latex></p>
            <p>Therefore, the relationship between them is:</p>
            <p><Latex>{\`$$ \\\\frac{U_{BM}}{U_{AM}} = \\\\frac{R_2}{R_1} \\\\implies U_{BM} = U_{AM} \\\\frac{R_2}{R_1} $$\`}</Latex></p>
          </div>
        )
      },
      {
        id: "serie1-ex4",
        title: "Exercise 4: Kirchhoff & Superposition",
        problem: (
          <div className="space-y-4">
            <p>Calculate the current intensity in the AB branch by applying:</p>
            <ul className="list-disc list-inside">
               <li>Kirchhoff's Laws</li>
               <li>The Superposition Theorem</li>
            </ul>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
             <p>Using Kirchhoff's Laws, you establish the Node and Mesh equations to solve the system matrix.</p>
             <p>Using Superposition, you turn off all independent sources except one, compute the partial current in AB, and sum the partial currents.</p>
          </div>
        )
      },
      {
        id: "serie1-ex5",
        title: "Exercise 5: Superposition & Potentials",
        problem: (
          <div className="space-y-4">
            <p>Using the superposition method, find the currents <Latex>{\`$I_1, I_2, I_3, I_4$\`}</Latex>.</p>
            <p>Derive the potentials <Latex>{\`$V_A, V_B, V_C, V_D, V_H$\`}</Latex>, taking point D as the origin of potentials.</p>
            <p>Given: <Latex>{\`$R_1 = 100\\\\Omega, R_2 = 50\\\\Omega, R_3 = 100\\\\Omega, R_4 = 50\\\\Omega, R_5 = 50\\\\Omega$\`}</Latex>.</p>
          </div>
        ),
        formalSolution: (
          <div className="space-y-4">
             <p><strong>Step 1: Superposition</strong></p>
             <p>Calculate partial currents with each voltage source isolated.</p>
             <p><strong>Step 2: Potentials</strong></p>
             <p>Set <Latex>{\`$V_D = 0V$\`}</Latex>. Use the computed branch currents to calculate the voltage drops across each resistor: <Latex>{\`$V_X - V_Y = R I$\`}</Latex>.</p>
          </div>
        )
      },`;

const insertIndex = content.indexOf('{', content.indexOf('id: "serie1-ex6"'));
const finalContent = content.slice(0, insertIndex) + additionalExercises + content.slice(insertIndex);

fs.writeFileSync('src/data/course-exercises.tsx', finalContent);
console.log('inserted remaining exercises');
