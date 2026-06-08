import re

with open('src/data/course-exercises.tsx', 'r') as f:
    content = f.read()

# I will find the `];\n\n  {\n    id: "serie1",` and fix it.
content = content.replace("];\n\n  {\n    id: \"serie1\"", "  },\n  {\n    id: \"serie1\"")

# Then find where serie1 ends, which is currently `  },\nexport const architectureExercises`
# Wait, it ends with `    ]\n  },` according to my script?
# My python script `add_serie1.py` had `  },` at the end of the `serie_1` string.
# Wait! Let me check the exact ending!
content = content.replace("    ]\n  },\nexport const architectureExercises", "    ]\n  }\n];\n\nexport const architectureExercises")

with open('src/data/course-exercises.tsx', 'w') as f:
    f.write(content)

