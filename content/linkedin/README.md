# LinkedIn data drop

Place the official LinkedIn export files in this directory, then run `npm run content:import`.

Accepted CSV names: `Profile.csv`, `Positions.csv`, `Education.csv`, `Skills.csv`, `Certifications.csv`, `Projects.csv`, `Honors.csv`, `Publications.csv`, `Courses.csv`, and `Volunteering.csv`. A profile “Save to PDF” file may also be stored here as source evidence; structured CSV data takes precedence.

The importer never scrapes LinkedIn. It writes a normalized report to `content/generated/linkedin.json`, lists missing files, and can be run repeatedly without duplicating records.
